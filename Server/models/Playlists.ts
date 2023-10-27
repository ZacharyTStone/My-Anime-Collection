import mongoose, { Document, Schema, Types } from "mongoose";

// Define the Playlist interface
interface Playlist {
  title: string;
  id: string;
  userID: Types.ObjectId;
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
});

// Create a document interface for the user
export interface PlaylisDocument extends Document {
  titile: string;
  id: string;
  userID: Types.ObjectId;
}

// Create and export the User model
const Playlist = mongoose.model<PlaylisDocument>("Playlist", playlistSchema);
export default Playlist;
