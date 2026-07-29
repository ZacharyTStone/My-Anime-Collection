import User from "../models/User.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { v4 as uuidv4 } from "uuid";
import { randomInt } from "crypto";
import { Request, Response } from "express";
import { DEFAULT_PLAYLIST_IDS } from "../utils/constants.js";

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

  if (DEFAULT_PLAYLIST_IDS.includes(playlist.id)) {
    throw new BadRequestError("You cannot delete " + playlist.title);
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await Anime.deleteMany(
        {
          createdBy: req.user!.userId,
          playlistID: playlist._id,
        },
        { session }
      );

      await playlist.deleteOne({ session });
    });
  } finally {
    await session.endSession();
  }

  res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
