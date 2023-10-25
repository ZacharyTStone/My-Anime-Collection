// Import the necessary libraries
import mongoose, { Document, Schema } from "mongoose";

// Define the Playlist schema
export interface PlaylistDocument extends Document {
  title: string;
  id: string;
  created_by: string;
  demo_user_playlist: boolean;
}

const PlaylistSchema = new Schema<PlaylistDocument>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    id: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    demo_user_playlist: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create a TTL index on the createdAt field for demo user playlists with a expireAfterSeconds option (in this case, 30 days)
PlaylistSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
    partialFilterExpression: { demo_user_playlist: true },
  }
);

// Create and export the Playlist model
const Playlist = mongoose.model<PlaylistDocument>("Playlist", PlaylistSchema);
export default Playlist;
