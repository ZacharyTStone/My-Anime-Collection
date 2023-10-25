import Anime from "../models/Anime.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createAnime = async (req, res) => {
  const { title, playlistID } = req.body;

  const existingAnime = await Anime.findOne({
    title,
    createdBy: req.user.userId,
    playlistID,
  });

  if (existingAnime) {
    throw new NotFoundError(`You have already added that anime to your list`);
  }

  const anime = await Anime.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ anime });
};

interface QueryObject {
  createdBy: string;
  playlistID: string;
  title?: any;
}

const getAnimes = async (req, res) => {
  const { sort, search, currentPlaylistID, page, limit } = req.query;

  const queryObject: QueryObject = {
    createdBy: req.user.userId,
    playlistID: currentPlaylistID,
  };

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Anime.find(queryObject);

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

  const skip = (Number(page) || 1 - 1) * (Number(limit) || 10);
  result = result.skip(skip).limit(Number(limit) || 10);

  const animes = await result;
  const totalAnimes = await Anime.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAnimes / (Number(limit) || 10));

  res.status(StatusCodes.OK).json({ animes, totalAnimes, numOfPages });
};

const deleteAnime = async (req, res) => {
  const { id: animeId } = req.params;

  const anime = await Anime.findOne({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`No Anime with id :${animeId}`);
  }

  checkPermissions(req.user, anime?.createdBy.toString());

  await anime.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Anime removed" });
};

export { createAnime, deleteAnime, getAnimes };
