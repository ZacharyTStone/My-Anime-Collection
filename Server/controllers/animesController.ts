import Anime from "../models/Anime.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

// REST routes are defined in AnimeRoutes.js

const createAnime = async (req, res) => {
  const existingAnime = await Anime.findOne({
    title: req.body.title,
    created_by: req.user.userId,
    playlistID: req.body.playlistID,
  });

  if (existingAnime) {
    throw new NotFoundError(`You have already added that anime to your list`);
  }

  req.body.created_by = req.user.userId;

  const anime = await Anime.create(req.body);
  res.status(StatusCodes.CREATED).json({ anime });
};

interface QueryObject {
  created_by: string;
  playlistID: string;
  title?: any;
}

const getAnimes = async (req, res) => {
  const { sort, search, currentPlaylistID } = req.query;

  let queryObject: QueryObject = {
    created_by: req.user.userId,
    playlistID: currentPlaylistID,
  };

  if (search) {
    // Add case-insensitive search for title
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Anime.find(queryObject);

  // Apply sorting based on the provided option
  const SORT_OPTIONS = {
    latest: { creationDate: -1 },
    oldest: { creationDate: 1 },
    rating: { rating: -1, popularity: -1 },
    episodeCount: { episodeCount: -1 },
    format: { format: -1 },
    "a-z": { title: 1 },
    "z-a": { title: -1 },
    "date added": { createdAt: -1 },
  };

  if (SORT_OPTIONS.hasOwnProperty(sort)) {
    result = result.sort(SORT_OPTIONS[sort]);
  }

  // Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const animes = await result;
  const totalAnimes = await Anime.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAnimes / limit);

  res.status(StatusCodes.OK).json({ animes, totalAnimes, numOfPages });
};

const deleteAnime = async (req, res) => {
  const { id: animeId } = req.params;

  const anime = await Anime.findOne({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`No Anime with id :${animeId}`);
  }

  checkPermissions(req.user, anime?.created_by.toString()); // Convert created_by to string

  await anime.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Anime removed" });
};

export { createAnime, deleteAnime, getAnimes };
