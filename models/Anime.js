import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
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
      // nested objects
      type: String,
      required: true,
    },
    ageRating: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Anime", AnimeSchema);
