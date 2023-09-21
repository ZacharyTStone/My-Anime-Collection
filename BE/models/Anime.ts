import mongoose, { Document, Schema, Types } from "mongoose";

// Define the Anime schema
const AnimeSchema = new Schema<AnimeDocument>(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    creationDate: {
      type: Date,
      required: false,
    },
    id: {
      type: Number,
      required: [true, "Please provide id"],
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    japanese_title: {
      type: String,
      required: [false, "Please provide japanese title"],
    },
    rating: {
      type: Number,
      required: false,
    },
    format: {
      type: String,
      required: false,
    },
    episodeCount: {
      type: Number,
      required: false,
    },
    synopsis: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    youtubeVideoId: {
      type: String,
      required: false,
    },
    playlistID: {
      type: String,
      required: true,
    },
    isDemoAnime: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Define the Anime document interface
export interface AnimeDocument extends Document {
  createdBy: Types.ObjectId;
  creationDate?: Date;
  id: number;
  title: string;
  japanese_title?: string;
  rating?: number;
  format?: string;
  episodeCount?: number;
  synopsis?: string;
  coverImage?: string;
  youtubeVideoId?: string;
  playlistID: string;
  isDemoAnime: boolean;
}

// Create and export the Anime model
const Anime = mongoose.model<AnimeDocument>("Anime", AnimeSchema);
export default Anime;
