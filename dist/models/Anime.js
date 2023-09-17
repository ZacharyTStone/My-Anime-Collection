"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AnimeSchema = new mongoose_1.default.Schema({
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Anime", AnimeSchema);
