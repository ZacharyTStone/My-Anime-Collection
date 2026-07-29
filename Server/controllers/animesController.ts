import mongoose from "mongoose";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { getAnimeRecommendations } from "../utils/groq.js";
import { getPlaylistObjectId, getPlaylistIdMaps } from "../utils/playlistHelpers.js";
import type { GetAnimesQuery } from "../utils/schemas.js";
import type { PlaylistDocument } from "../models/Playlists.js";

/** Escape regex special characters to prevent ReDoS attacks */
const escapeRegex = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
  const playlistObjectId = await getPlaylistObjectId(req.body.playlistID, req.user!.userId);

  const existingAnime = await Anime.findOne({
    title: req.body.title,
    createdBy: req.user!.userId,
    playlistID: playlistObjectId,
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
    playlistID: playlistObjectId,
    creationDate: req.body.creationDate,
    createdBy: req.user!.userId,
  };

  const anime = await Anime.create(animeData);
  const populated = await Anime.findById(anime._id)
    .populate({ path: "playlistID", select: "id" })
    .lean();

  res.status(StatusCodes.CREATED).json({
    anime: populated
      ? {
          ...populated,
          playlistID: (populated.playlistID as unknown as PlaylistDocument).id,
        }
      : anime,
  });
};

interface QueryObject {
  createdBy: string;
  playlistID?: mongoose.Types.ObjectId;
  title?: { $regex: string; $options: string };
}

const getAnimes = async (req: Request, res: Response<unknown, { query: GetAnimesQuery }>) => {
  const { currentPlaylistID, sort, search, page, limit } = res.locals.query;

  const { publicToObjectId, objectIdToPublic } = await getPlaylistIdMaps(req.user!.userId);

  let queryObject: QueryObject = {
    createdBy: req.user!.userId,
  };

  if (currentPlaylistID !== "all") {
    const playlistObjectId = publicToObjectId.get(currentPlaylistID);
    if (!playlistObjectId) {
      // Unknown playlist id — keep the same empty-result behaviour as a string lookup.
      res.status(StatusCodes.OK).json({ animes: [], totalAnimes: 0, numOfPages: 0 });
      return;
    }
    queryObject.playlistID = playlistObjectId;
  }

  if (search) {
    queryObject.title = { $regex: escapeRegex(search), $options: "i" };
  }

  let result = Anime.find(queryObject);

  // Apply sorting based on the provided option
  if (sort) {
    result = result.sort(SORT_OPTIONS[sort]);
  }

  // Setup pagination
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const populated = await result.populate({ path: "playlistID", select: "id" }).lean();
  const totalAnimes = await Anime.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAnimes / limit);

  const animes = populated.map((anime) => ({
    ...anime,
    playlistID: objectIdToPublic.get(
      (anime.playlistID as unknown as PlaylistDocument)._id.toString()
    ) as string,
  }));

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

const getAnimeStats = async (req: Request, res: Response) => {
  const createdBy = new mongoose.Types.ObjectId(req.user!.userId);

  const [totals] = await Anime.aggregate<{
    total: number;
    totalEpisodes: number;
  }>([
    { $match: { createdBy } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        totalEpisodes: { $sum: { $ifNull: ["$episodeCount", 0] } },
      },
    },
  ]);

  const playlistGroups = await Anime.aggregate<{
    _id: mongoose.Types.ObjectId;
    count: number;
  }>([{ $match: { createdBy } }, { $group: { _id: "$playlistID", count: { $sum: 1 } } }]);

  const userPlaylists = await Playlist.find({ userID: createdBy }).select("id").lean();
  const objectIdToPublic = new Map<string, string>();
  userPlaylists.forEach((playlist) => {
    objectIdToPublic.set((playlist._id as mongoose.Types.ObjectId).toString(), playlist.id);
  });

  const playlistCounts = playlistGroups.reduce<Record<string, number>>((acc, { _id, count }) => {
    const publicId = objectIdToPublic.get(_id.toString());
    if (publicId) {
      acc[publicId] = count;
    }
    return acc;
  }, {});

  const topRatedAnime = await Anime.findOne({ createdBy })
    .sort({ rating: -1 })
    .select("title rating")
    .lean();

  const recentlyAddedAnime = await Anime.findOne({ createdBy })
    .sort({ createdAt: -1 })
    .select("title createdAt")
    .lean();

  res.status(StatusCodes.OK).json({
    total: totals?.total ?? 0,
    totalEpisodes: totals?.totalEpisodes ?? 0,
    playlistCounts,
    topRated: topRatedAnime
      ? { title: topRatedAnime.title, rating: topRatedAnime.rating ?? null }
      : null,
    recentlyAdded: recentlyAddedAnime
      ? {
          title: recentlyAddedAnime.title,
          createdAt: recentlyAddedAnime.createdAt ?? null,
        }
      : null,
  });
};

const getRecommendations = async (req: Request, res: Response) => {
  const { title, synopsis } = req.body;

  const recommendations = await getAnimeRecommendations(title, synopsis || "");

  res.status(StatusCodes.OK).json({ recommendations });
};

export { createAnime, deleteAnime, getAnimes, getAnimeStats, getRecommendations };
