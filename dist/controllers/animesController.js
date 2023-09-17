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
exports.getAnimes = exports.deleteAnime = exports.createAnime = void 0;
const Anime_js_1 = __importDefault(require("../models/Anime.js"));
const http_status_codes_1 = require("http-status-codes");
const index_js_1 = require("../errors/index.js");
const checkPermissions_1 = __importDefault(require("../utils/checkPermissions"));
// REST routes are defined in AnimeRoutes.js
const createAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAnime = yield Anime_js_1.default.findOne({
        title: req.body.title,
        createdBy: req.user.userId,
        playlistID: req.body.playlistID,
    });
    if (existingAnime) {
        throw new index_js_1.NotFoundError(`You have already added that anime to your list`);
    }
    req.body.createdBy = req.user.userId;
    const anime = yield Anime_js_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ anime });
});
exports.createAnime = createAnime;
const getAnimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sort, search, currentPlaylistID } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
        playlistID: currentPlaylistID,
    };
    if (search) {
        // Add case-insensitive search for title
        queryObject.title = { $regex: search, $options: "i" };
    }
    let result = Anime_js_1.default.find(queryObject);
    // Apply sorting based on the provided option
    const sortOptions = {
        latest: { creationDate: -1 },
        oldest: { creationDate: 1 },
        rating: { rating: -1, popularity: -1 },
        episodeCount: { episodeCount: -1 },
        format: { format: -1 },
        "a-z": { title: 1 },
        "z-a": { title: -1 },
        "date added": { createdAt: -1 },
    };
    if (sortOptions.hasOwnProperty(sort)) {
        result = result.sort(sortOptions[sort]);
    }
    // Setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const animes = yield result;
    const totalAnimes = yield Anime_js_1.default.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalAnimes / limit);
    res.status(http_status_codes_1.StatusCodes.OK).json({ animes, totalAnimes, numOfPages });
});
exports.getAnimes = getAnimes;
const deleteAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: animeId } = req.params;
    const anime = yield Anime_js_1.default.findOne({ _id: animeId });
    if (!anime) {
        throw new index_js_1.NotFoundError(`No Anime with id :${animeId}`);
    }
    (0, checkPermissions_1.default)(req.user, anime.createdBy);
    yield anime.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Anime removed" });
});
exports.deleteAnime = deleteAnime;
