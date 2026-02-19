import Anime from "../models/Anime.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { getAnimeRecommendations } from "../utils/groq.js";

/** Escape regex special characters to prevent ReDoS attacks */
const escapeRegex = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SORT_OPTIONS = {
  latest: { creationDate: -1 },
  oldest: { creationDate: 1 },
  rating: { rating: -1, popularity: -1 },
  episodeCount: { episodeCount: -1 },
  format: { format: -1 },
  "a-z": { title: 1 },
  "z-a": { title: -1 },
  "date added": { createdAt: -1 },
} as const;

// REST routes are defined in AnimeRoutes.js

const createAnime = async (req: Request, res: Response) => {
  const existingAnime = await Anime.findOne({
    title: req.body.title,
    createdBy: req.user!.userId,
    playlistID: req.body.playlistID,
  });

  if (existingAnime) {
    throw new BadRequestError(`You have already added that anime to your list`);
  }

  const animeData = {
    id: req.body.id,
    title: req.body.title,
    japanese_title: req.body.japanese_title,
    rating: req.body.rating,
    format: req.body.format,
    episodeCount: req.body.episodeCount,
    synopsis: req.body.synopsis,
    coverImage: req.body.coverImage,
    youtubeVideoId: req.body.youtubeVideoId,
    playlistID: req.body.playlistID,
    creationDate: req.body.creationDate,
    createdBy: req.user!.userId,
  };

  const anime = await Anime.create(animeData);
  res.status(StatusCodes.CREATED).json({ anime });
};

interface QueryObject {
  createdBy: string;
  playlistID: string;
  title?: { $regex: string; $options: string };
}

const getAnimes = async (req: Request, res: Response) => {
  const sort = req.query.sort as string | undefined;
  const search = req.query.search as string | undefined;
  const currentPlaylistID = req.query.currentPlaylistID as string;

  let queryObject: QueryObject = {
    createdBy: req.user!.userId,
    playlistID: currentPlaylistID,
  };

  if (search) {
    queryObject.title = { $regex: escapeRegex(search), $options: "i" };
  }

  let result = Anime.find(queryObject);

  // Apply sorting based on the provided option
  if (sort && sort in SORT_OPTIONS) {
    result = result.sort(
      SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]
    );
  }

  // Setup pagination
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const animes = await result;
  const totalAnimes = await Anime.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAnimes / limit);

  res.status(StatusCodes.OK).json({ animes, totalAnimes, numOfPages });
};

const deleteAnime = async (req: Request, res: Response) => {
  const { id: animeId } = req.params;

  const anime = await Anime.findOne({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`No Anime with id :${animeId}`);
  }

  checkPermissions(req.user!, anime.createdBy.toString()); // Convert createdBy to string

  await anime.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Anime removed" });
};

const getRecommendations = async (req: Request, res: Response) => {
  const { title, synopsis } = req.body;

  const recommendations = await getAnimeRecommendations(
    title,
    synopsis || ""
  );

  res.status(StatusCodes.OK).json({ recommendations });
};

export { createAnime, deleteAnime, getAnimes, getRecommendations };
