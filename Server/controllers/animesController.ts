import Anime from "../models/Anime.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import {
  buildAnimeQuery,
  getPaginationParams,
  applySorting,
  applyPagination,
  calculatePaginationMeta
} from "../utils/queryBuilder.js";
import { sendSuccess, sendCreated, sendNoContent, sendPaginatedSuccess } from "../utils/responseHelpers.js";

// noSQL sanitization
import sanitize from "mongo-sanitize";

// REST routes are defined in AnimeRoutes.js

const createAnime = async (req: Request, res: Response): Promise<void> => {
  // Transform Kitsu API data if it's in the nested format
  let animeData = req.body;

  // Check if this is Kitsu API format (has attributes and id at root level)
  if (req.body.attributes && req.body.id) {
    const attributes = req.body.attributes;
    animeData = {
      id: parseInt(req.body.id),
      title: attributes.titles?.en ||
        attributes.titles?.en_jp ||
        "Title N/A",
      japanese_title: attributes.titles?.ja_jp ||
        attributes.titles?.en_jp ||
        "Title N/A",
      rating: attributes.averageRating ? parseFloat(attributes.averageRating) : undefined,
      format: attributes.subtype || undefined,
      episodeCount: attributes.episodeCount || null,
      synopsis: attributes.synopsis || undefined,
      coverImage: attributes.posterImage?.small || undefined,
      youtubeVideoId: attributes.youtubeVideoId || undefined,
      playlistID: req.body.playlistID,
      creationDate: attributes.startDate || undefined,
      isDemoAnime: false
    };
  }

  const existingAnime = await Anime.findOne({
    title: sanitize(animeData.title),
    createdBy: sanitize(req.user!.userId),
    playlistID: sanitize(animeData.playlistID),
  });

  if (existingAnime) {
    throw new NotFoundError(`You have already added that anime to your list`);
  }

  animeData.createdBy = sanitize(req.user!.userId);

  const anime = await Anime.create(animeData);
  sendCreated(res, { anime }, "Anime created successfully");
};

const getAnimes = async (req: Request, res: Response): Promise<void> => {
  const { sort } = sanitize(req.query);

  // Build query using utility function
  const queryObject = buildAnimeQuery(req);

  // Get pagination parameters
  const { page, limit, skip } = getPaginationParams(req);

  // Build and execute query
  let result = Anime.find(queryObject);
  result = applySorting(result, sort);
  result = applyPagination(result, skip, limit);

  const animes = await result;
  const totalAnimes = await Anime.countDocuments(queryObject);
  const { numOfPages } = calculatePaginationMeta(totalAnimes, limit);

  sendPaginatedSuccess(res, { animes }, {
    page,
    limit,
    total: totalAnimes,
    pages: numOfPages,
  });
};

const deleteAnime = async (req: Request, res: Response): Promise<void> => {
  const { id: animeId } = req.params;

  const anime = await Anime.findOne({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`No Anime with id :${animeId}`);
  }

  checkPermissions(req.user!, anime?.createdBy.toString()); // Convert createdBy to string

  await anime.deleteOne();

  sendNoContent(res, "Anime removed successfully");
};

export { createAnime, deleteAnime, getAnimes };
