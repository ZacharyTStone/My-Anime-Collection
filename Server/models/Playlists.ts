import mongoose, { Document, Schema } from "mongoose";

interface Playlist {
  title: string;
  id: string;
  userID: mongoose.Types.ObjectId;
  isDemoUserPlaylist: boolean;
}

const playlistSchema = new Schema<Playlist>({
  title: String,
  id: String,
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
