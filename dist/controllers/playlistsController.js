"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlaylist = exports.updatePlaylist = exports.createPlaylist = exports.getPlaylists = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const http_status_codes_1 = require("http-status-codes");
const index_js_1 = require("../errors/index.js");
const Anime_js_1 = __importDefault(require("../models/Anime.js"));
// REST routes are defined in playlistRoutes.js
const getPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_js_1.default.findOne({ _id: req.user.userId });
    const playlists = user.playlists;
    res.status(http_status_codes_1.StatusCodes.OK).json({ playlists });
});
exports.getPlaylists = getPlaylists;
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_js_1.default.findOne({ _id: req.user.userId });
    const randomPlaylistID = Math.floor(Math.random() * 1000000);
    const randomTitle = Math.floor(Math.random() * 1000);
    const playlist = {
        title: `Playlist ${randomTitle}`,
        id: randomPlaylistID,
    };
    user.playlists.push(playlist);
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ playlist });
});
exports.createPlaylist = createPlaylist;
const updatePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_js_1.default.findOne({ _id: req.user.userId });
    const playlist = user.playlists.find((playlist) => playlist.id === req.params.id);
    if (!playlist) {
        throw new index_js_1.BadRequestError("Playlist not found");
    }
    playlist.title = req.body.title;
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ playlist });
});
exports.updatePlaylist = updatePlaylist;
const deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_js_1.default.findOne({ _id: req.user.userId });
    if (user.playlists.length === 1) {
        throw new index_js_1.BadRequestError("You cannot delete the default playlist");
    }
    const playlist = user.playlists.find((playlist) => playlist.id === req.params.id);
    if (!playlist) {
        throw new index_js_1.BadRequestError("Playlist not found");
    }
    if (playlist.id === "0") {
        throw new index_js_1.BadRequestError("You cannot delete the default playlist");
    }
    // Delete all user's animes in the playlist
    const animes = yield Anime_js_1.default.find({
        createdBy: req.user.userId,
        playlistID: req.params.id,
    });
    animes.forEach((anime) => {
        if (anime.playlistID.includes(playlist.id)) {
            anime.remove();
        }
    });
    // Remove playlist
    user.playlists = user.playlists.filter((playlist) => playlist.id !== req.params.id);
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Playlist deleted" });
});
exports.deletePlaylist = deletePlaylist;
