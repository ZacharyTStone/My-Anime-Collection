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
  const existingAnime = await Anime.findOne({
    title: sanitize(req.body.title),
    createdBy: sanitize(req.user!.userId),
    playlistID: sanitize(req.body.playlistID),
  });

  if (existingAnime) {
    throw new NotFoundError(`You have already added that anime to your list`);
  }

  req.body.createdBy = sanitize(req.user!.userId);

  const anime = await Anime.create(req.body);
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
