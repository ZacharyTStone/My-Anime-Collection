import mongoose, { Document, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface PlaylistDocument extends Document {
  title: string;
  id: string;
  created_by: string;
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
  },

  { timestamps: true }
);

const Playlist = mongoose.model<PlaylistDocument>("Playlist", PlaylistSchema);
export default Playlist;
