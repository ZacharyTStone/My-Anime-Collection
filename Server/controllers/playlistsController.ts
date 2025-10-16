import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { v4 as uuidv4 } from "uuid";
import sanitize from "mongo-sanitize";
import { Request, Response } from "express";
import { sendSuccess, sendCreated, sendNoContent } from "../utils/responseHelpers.js";

// REST routes are defined in playlistRoutes.js

const getPlaylists = async (req: Request, res: Response): Promise<void> => {
  // find all playlists with the userID of req.user.userId
  const playlists = await Playlist.find({ userID: req.user!.userId });

  sendSuccess(res, { playlists }, "Playlists retrieved successfully");
};

const createPlaylist = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ _id: req.user!.userId });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const newPlaylistID = uuidv4();
  const randomTitle = Math.floor(Math.random() * 1000);

  const playlist = {
    title: `Playlist ${randomTitle}`,
    id: `${newPlaylistID}`,
    userID: sanitize(req.user!.userId),
    isDemoUserPlaylist: user.isDemo,
  };

  const createdPlaylist = await Playlist.create(playlist);

  sendCreated(res, { playlist: createdPlaylist }, "Playlist created successfully");
};

const updatePlaylist = async (req: Request, res: Response): Promise<void> => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    userID: sanitize(req.user!.userId),
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  playlist.title = sanitize(req.body.title);

  await playlist.save();
  sendSuccess(res, { playlist }, "Playlist updated successfully");
};

const deletePlaylist = async (req: Request, res: Response): Promise<void> => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    userID: sanitize(req.user!.userId),
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  if (playlist.id === "0" || playlist.id === "1" || playlist.id === "2") {
    throw new BadRequestError("You cannot delete " + playlist.title);
  }

  // Delete all user's animes in the playlist
  const animes = await Anime.find({
    createdBy: sanitize(req.user!.userId),
    playlistID: sanitize(req.params.id),
  });

  // Use deleteMany for better performance
  if (animes.length > 0) {
    await Anime.deleteMany({
      createdBy: sanitize(req.user!.userId),
      playlistID: sanitize(req.params.id),
    });
  }

  // Remove playlist
  await playlist.deleteOne();

  sendNoContent(res, "Playlist deleted successfully");
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
