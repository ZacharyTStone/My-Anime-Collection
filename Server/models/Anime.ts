import mongoose, { Document, Schema } from "mongoose";

// Define the Anime schema
const AnimeSchema = new Schema<AnimeDocument>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
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
      required: false,
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
      default: null,
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
  createdBy: mongoose.Types.ObjectId;
  // to do switch back to just Date
  creationDate?: Date | string;
  id: number;
  title: string;
  japanese_title?: string;
  rating?: number;
  format?: string;
  episodeCount?: number | null;
  synopsis?: string;
  coverImage?: string;
  youtubeVideoId?: string;
  playlistID: string;
  isDemoAnime: boolean;
}

// Index for query performance on playlist lookups
AnimeSchema.index({ playlistID: 1, createdBy: 1 });

// Create a TTL index on the demo field with a expireAfterSeconds option (in this case, 30 days)
AnimeSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
    partialFilterExpression: { isDemoAnime: true },
  }
);

// Create and export the Anime model
const Anime = mongoose.model<AnimeDocument>("Anime", AnimeSchema);
export default Anime;
