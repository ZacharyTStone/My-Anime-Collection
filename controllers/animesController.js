import Anime from "../models/Anime.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

// REST routes in AnimeRoutes.js

const createAnime = async (req, res) => {
  const oldAnime = await Anime.findOne({
    title: req.body.title,
    createdBy: req.user.userId,
  });
  console.log(oldAnime);

  if (oldAnime) {
    throw new NotFoundError(`You have already added that anime to your list`);
  }

  req.body.createdBy = req.user.userId;
  const anime = await Anime.create(req.body);
  res.status(StatusCodes.CREATED).json({ anime });
  console.log(anime);
};
const getAnimes = async (req, res) => {
  const { sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Anime.find(queryObject);

  if (sort === "latest") {
    result = result.sort({ creationDate: -1 });
  } else if (sort === "oldest") {
    result = result.sort({ creationDate: 1 });
  } else if (sort === "rating") {
    result = result.sort({ rating: -1 });
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
