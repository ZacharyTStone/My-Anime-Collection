import mongoose, { Document, Schema, Types } from "mongoose";

// Define the Playlist interface
interface Playlist {
  title: string;
  id: string;
  userID: Types.ObjectId;
  isDemoUserPlaylist: boolean;
}

// Create a schema for the playlist
const playlistSchema = new Schema<Playlist>({
  title: String,
  id: String,
  userID: {
    type: Types.ObjectId as any,
    ref: "User",
    required: [true, "Please provide user"],
  },
  isDemoUserPlaylist: Boolean,
});

// Create a document interface for the user
export interface PlaylisDocument extends Document {
  title: string;
  id: string;
  userID: Types.ObjectId;
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
const Playlist = mongoose.model<PlaylisDocument>("Playlist", playlistSchema);
export default Playlist;
