import crypto from "crypto";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { v4 as uuidv4 } from "uuid";
import sanitize from "mongo-sanitize";

// REST routes are defined in playlistRoutes.js

const getPlaylists = async (req, res) => {
  // find all playlists with the userID of req.user.userId
  const playlists = await Playlist.find({ userID: req.user.userId });

  res.status(StatusCodes.OK).json({ playlists });
};

const createPlaylist = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const newPlaylistID = uuidv4();

  const randomTitle = crypto.randomInt(1000);

  const playlist: Playlist = {
    title: `Playlist ${randomTitle}`,
    id: `${newPlaylistID}`,
    userID: sanitize(req.user.userId),
    isDemoUserPlaylist: user.isDemo,
  };

  await Playlist.create(playlist);

  res.status(StatusCodes.CREATED).json({ playlist });
};

const updatePlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    userID: sanitize(req.user.userId),
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  playlist.title = sanitize(req.body.title);

  await playlist.save();
  res.status(StatusCodes.OK).json({ playlist });
};

const deletePlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    userID: sanitize(req.user.userId),
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  if (playlist.id === "0" || playlist.id === "1" || playlist.id === "2") {
    throw new BadRequestError("You cannot delete " + playlist.title);
  }

  // Delete all user's animes in the playlist
  const animes = await Anime.find({
    createdBy: sanitize(req.user.userId),
    playlistID: sanitize(req.params.id),
  });

  for (const anime of animes) {
    if (anime.playlistID.includes(playlist.id)) {
      await anime.deleteOne();
    }
  }

  // Remove playlist
  await playlist.deleteOne();

  res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
