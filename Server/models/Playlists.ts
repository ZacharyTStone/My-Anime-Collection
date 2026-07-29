import mongoose, { Document, Schema } from "mongoose";

const playlistSchema = new Schema<PlaylistDocument>({
  title: String,
  // publicId exposed to the client; stable per-user ("0"/"1"/"2" for defaults,
  // UUID for custom playlists). The Mongo _id is the canonical foreign key.
  id: {
    type: String,
    required: [true, "Please provide playlist public id"],
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  isDemoUserPlaylist: Boolean,
});

export interface PlaylistDocument extends Document {
  title: string;
  id: string;
  userID: mongoose.Types.ObjectId;
  isDemoUserPlaylist: boolean;
}
// Create a TTL index on the demo field with a expireAfterSeconds option (in this case, 30 days)

// A user can only have one playlist with a given public id.
playlistSchema.index({ id: 1, userID: 1 }, { unique: true });

playlistSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
    partialFilterExpression: { isDemoUserPlaylist: true },
  }
);

// Create and export the User model
const Playlist = mongoose.model<PlaylistDocument>("Playlist", playlistSchema);
export default Playlist;
