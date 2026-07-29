import mongoose from "mongoose";
import { pathToFileURL } from "url";

interface MigrationOptions {
  mongoUrl: string;
  dryRun: boolean;
  /**
   * When true (default), disconnect from MongoDB after running.
   * Tests can set this to false to keep the shared connection open.
   */
  disconnect?: boolean;
}

/**
 * Migrate legacy Anime.playlistID string values to ObjectId references.
 *
 * Operates directly on the MongoDB driver collections so it can handle
 * documents that pre-date the ObjectId schema change (e.g. "0", "1", "2",
 * or custom UUID strings) without triggering Mongoose cast errors.
 */
export const runMigration = async ({
  mongoUrl,
  dryRun,
  disconnect = true,
}: MigrationOptions): Promise<{ migrated: number; orphaned: number }> => {
  const wasConnected = mongoose.connection.readyState === 1;
  if (!wasConnected) {
    await mongoose.connect(mongoUrl);
  }
  const db = mongoose.connection.db!;

  const animesCollection = db.collection("animes");
  const playlistsCollection = db.collection("playlists");

  // Only documents whose playlistID is still stored as a string need work.
  const cursor = animesCollection.find({
    playlistID: { $type: "string" },
  });

  const operations: mongoose.mongo.AnyBulkWriteOperation<mongoose.AnyObject>[] = [];
  let orphaned = 0;

  for await (const anime of cursor) {
    const publicId = anime.playlistID as string;
    const createdBy = anime.createdBy;

    const playlist = await playlistsCollection.findOne({
      id: publicId,
      userID: createdBy,
    });

    if (!playlist) {
      console.warn(
        `[skip] Anime ${anime._id} references missing playlist "${publicId}" for user ${createdBy}`
      );
      orphaned += 1;
      continue;
    }

    if (dryRun) {
      console.log(
        `[dry-run] Anime ${anime._id}: "${publicId}" -> ${playlist._id}`
      );
    }

    operations.push({
      updateOne: {
        filter: { _id: anime._id },
        update: { $set: { playlistID: playlist._id } },
      },
    });
  }

  if (!dryRun && operations.length > 0) {
    const result = await animesCollection.bulkWrite(operations);
    console.log(`Migrated ${result.modifiedCount} anime documents.`);
  }

  const migrated = operations.length;

  if (dryRun) {
    console.log(
      `Dry run complete: ${migrated} anime documents would be migrated, ${orphaned} orphaned.`
    );
  } else {
    console.log(
      `Migration complete: ${migrated} migrated, ${orphaned} orphaned.`
    );
  }

  if (!wasConnected && disconnect) {
    await mongoose.disconnect();
  }
  return { migrated, orphaned };
};

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const url = args.find((arg) => !arg.startsWith("--")) || process.env.MONGO_URL;

  if (!url) {
    console.error(
      "Usage: npx tsx scripts/migrate-playlist-ids.ts [--dry-run] <MONGO_URL>\n" +
        "   or: MONGO_URL=<url> npx tsx scripts/migrate-playlist-ids.ts [--dry-run]"
    );
    process.exit(1);
  }

  await runMigration({ mongoUrl: url, dryRun });
  process.exit(0);
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
