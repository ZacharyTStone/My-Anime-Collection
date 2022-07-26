import Anime from "../models/Anime.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

// REST routes in AnimeRoutes.js

const createAnime = async (req, res) => {
  const oldAnime = await Anime.findOne({
    title: req.body.title,
    createdBy: req.user.userId,
    playlistID: req.body.playlistID,
  });

  if (oldAnime) {
    throw new NotFoundError(`You have already added that anime to your list`);
  }

  req.body.createdBy = req.user.userId;

  const anime = await Anime.create(req.body);
  res.status(StatusCodes.CREATED).json({ anime });
};
const getAnimes = async (req, res) => {
  const { sort, search, currentPlaylistID } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
    playlistID: currentPlaylistID,
  };
  // add stuff based on condition

  if (search) {
    //i: To match both lower case and upper case pattern in the string.
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Anime.find(queryObject);

  if (sort === "latest") {
    result = result.sort({ creationDate: -1 });
  } else if (sort === "oldest") {
    result = result.sort({ creationDate: 1 });
  } else if (sort === "rating") {
    // sort by popularity and then by rating
    result = result.sort({ rating: -1, popularity: -1 });
  } else if (sort === "episodeCount") {
    result = result.sort({ episodeCount: -1 });
  } else if (sort === "format") {
    result = result.sort({ format: -1 });
  } else if (sort === "a-z") {
    result = result.sort({ title: 1 });
  } else if (sort === "z-a") {
    result = result.sort({ title: -1 });
  } else if (sort === "date added") {
    result = result.sort({ createdAt: -1 });
  }

  // setup pagination
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

  checkPermissions(req.user, anime.createdBy);

  await anime.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Anime removed" });
};

export { createAnime, deleteAnime, getAnimes };
