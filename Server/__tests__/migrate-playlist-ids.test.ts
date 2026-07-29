import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { registerAndGetAuth } from "./helpers.js";
import { runMigration } from "../../scripts/migrate-playlist-ids.js";

describe("playlist id migration script", () => {
  it("dry-run leaves documents unchanged and full run converts string playlist ids", async () => {
    const { userId } = await registerAndGetAuth();
    const defaultPlaylist = await Playlist.findOne({
      id: "0",
      userID: userId,
    }).lean();
    const defaultPlaylistId = defaultPlaylist!._id as mongoose.Types.ObjectId;

    const db = mongoose.connection.db!;
    await db.collection("animes").insertMany([
      { createdBy: userId, id: 9001, title: "Legacy Anime 1", playlistID: "0" },
      { createdBy: userId, id: 9002, title: "Legacy Anime 2", playlistID: "0" },
    ]);

    const dryRun = await runMigration({
      mongoUrl: process.env.MONGO_URL!,
      dryRun: true,
      disconnect: false,
    });
    expect(dryRun.migrated).toBe(2);
    expect(dryRun.orphaned).toBe(0);

    const afterDryRun = await db
      .collection("animes")
      .find({ title: { $in: ["Legacy Anime 1", "Legacy Anime 2"] } })
      .toArray();
    expect(afterDryRun.every((doc) => typeof doc.playlistID === "string")).toBe(true);

    const fullRun = await runMigration({
      mongoUrl: process.env.MONGO_URL!,
      dryRun: false,
      disconnect: false,
    });
    expect(fullRun.migrated).toBe(2);

    const migrated = await Anime.find({
      createdBy: userId,
      title: { $in: ["Legacy Anime 1", "Legacy Anime 2"] },
    }).lean();
    expect(migrated).toHaveLength(2);
    migrated.forEach((anime) => {
      expect(anime.playlistID).toEqual(defaultPlaylistId);
    });
  });
});
