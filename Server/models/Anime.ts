import mongoose, { Document, Schema, Types } from "mongoose";

// Define the Anime schema
const AnimeSchema = new Schema<AnimeDocument>(
  {
    created_by: {
      type: Types.ObjectId as any,
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
    is_demo_anime: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Define the Anime document interface
export interface AnimeDocument extends Document {
  created_by: any;
  // to do switch back to just Date
  creationDate?: Date | string;
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
  is_demo_anime: boolean;
}

// Create a TTL index on the is_demo_anime field with a expireAfterSeconds option (in this case, 30 days)
AnimeSchema.index(
  { creationDate: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
    partialFilterExpression: { is_demo_anime: true },
  }
);

// Create and export the Anime model
const Anime = mongoose.model("Anime", AnimeSchema);
export default Anime;
