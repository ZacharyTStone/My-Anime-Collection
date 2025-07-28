import Anime from "../models/Anime.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import sanitize from "mongo-sanitize";

// Types
interface QueryObject {
  createdBy: string;
  playlistID: string;
  title?: { $regex: string; $options: string };
}

interface SortOptions {
  [key: string]: Record<string, 1 | -1>;
}

// Constants
const SORT_OPTIONS: SortOptions = {
  latest: { creationDate: -1 },
  oldest: { creationDate: 1 },
  rating: { rating: -1, popularity: -1 },
  episodeCount: { episodeCount: -1 },
  format: { format: -1 },
  "a-z": { title: 1 },
  "z-a": { title: -1 },
  "date added": { createdAt: -1 },
} as const;

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

/**
 * Create a new anime entry
 */
const createAnime = async (req: Request, res: Response) => {
  const { title, playlistID } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    throw new BadRequestError("User authentication required");
  }

  const existingAnime = await Anime.findOne({
    title: sanitize(title),
    createdBy: sanitize(userId),
    playlistID: sanitize(playlistID),
  });

  if (existingAnime) {
    throw new BadRequestError("You have already added that anime to your list");
  }

  const animeData = {
    ...req.body,
    createdBy: sanitize(userId),
  };

  const anime = await Anime.create(animeData);
  res.status(StatusCodes.CREATED).json({ anime });
};

/**
 * Get animes with filtering, sorting, and pagination
 */
const getAnimes = async (req: Request, res: Response) => {
  const { sort, search, currentPlaylistID } = sanitize(req.query);
  const userId = req.user?.userId;

  if (!userId) {
    throw new BadRequestError("User authentication required");
  }

  if (!currentPlaylistID) {
    throw new BadRequestError("Playlist ID is required");
  }

  const queryObject: QueryObject = {
    createdBy: sanitize(userId),
    playlistID: currentPlaylistID,
  };

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Anime.find(queryObject);

  // Apply sorting
  if (sort && sort in SORT_OPTIONS) {
    result = result.sort(SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]);
  }

  // Setup pagination
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const [animes, totalAnimes] = await Promise.all([
    result.exec(),
    Anime.countDocuments(queryObject),
  ]);

  const numOfPages = Math.ceil(totalAnimes / limit);

  res.status(StatusCodes.OK).json({
    animes,
    totalAnimes,
    numOfPages,
    currentPage: page,
    limit,
  });
};

/**
 * Delete an anime entry
 */
const deleteAnime = async (req: Request, res: Response) => {
  const { id: animeId } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    throw new BadRequestError("User authentication required");
  }

  if (!animeId) {
    throw new BadRequestError("Anime ID is required");
  }

  const anime = await Anime.findOne({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`No anime found with id: ${animeId}`);
  }

  checkPermissions(req.user, anime.createdBy.toString());

  await anime.deleteOne();

  res.status(StatusCodes.OK).json({
    msg: "Anime successfully removed",
    deletedAnimeId: animeId,
  });
};

export { createAnime, deleteAnime, getAnimes };
