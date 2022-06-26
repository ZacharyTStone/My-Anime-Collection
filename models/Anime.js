import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  id: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  descipription: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
});

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
    playlists: {
      // nested objects
      type: { playlistSchema },
      required: false,
    },
    // ageRating: {
    //   type: String,
    //   required: false,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Anime", AnimeSchema);
