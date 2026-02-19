import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { v4 as uuidv4 } from "uuid";
import { randomInt } from "crypto";
import { Request, Response } from "express";

// REST routes are defined in playlistRoutes.js

const getPlaylists = async (req: Request, res: Response) => {
  // find all playlists with the userID of req.user!.userId
  const playlists = await Playlist.find({ userID: req.user!.userId });

  res.status(StatusCodes.OK).json({ playlists });
};

const createPlaylist = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user!.userId });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const newPlaylistID = uuidv4();
  const randomTitle = randomInt(1000);

  const playlist = {
    title: `Playlist ${randomTitle}`,
    id: `${newPlaylistID}`,
    userID: req.user!.userId,
    isDemoUserPlaylist: user.isDemo,
  };

  await Playlist.create(playlist);

  res.status(StatusCodes.CREATED).json({ playlist });
};

const updatePlaylist = async (req: Request, res: Response) => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    userID: req.user!.userId,
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  playlist.title = req.body.title;

  await playlist.save();
  res.status(StatusCodes.OK).json({ playlist });
};

const deletePlaylist = async (req: Request, res: Response) => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    userID: req.user!.userId,
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  if (playlist.id === "0" || playlist.id === "1" || playlist.id === "2") {
    throw new BadRequestError("You cannot delete " + playlist.title);
  }

  await Anime.deleteMany({
    createdBy: req.user!.userId,
    playlistID: req.params.id,
  });

  await playlist.deleteOne();

  res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
