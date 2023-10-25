import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlist.js";

// REST routes are defined in playlistRoutes.js

const getPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ playlists });
};

const createPlaylist = async (req, res) => {
  let newPlaylistID = Math.floor(Math.random() * 1000000).toString();

  const playlistExists = await Playlist.findOne({ id: newPlaylistID });

  if (playlistExists) {
    newPlaylistID = Math.floor(Math.random() * 1000000).toString();
  }

  const randomTitle = Math.floor(Math.random() * 1000);

  const playlist = {
    title: `Playlist ${randomTitle}`,
    id: `${newPlaylistID}`,
    created_by: req.user.userId,
  };

  // create new playlist
  const newPlaylist = new Playlist(playlist);

  await newPlaylist.save();

  res.status(StatusCodes.CREATED).json({ playlist });
};

const updatePlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({
    id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  playlist.title = req.body.title;

  await playlist.save();
};

const deletePlaylist = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const playlist = await Playlist.findOne({
    id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  if (playlist.id === "0" || playlist.id === "1" || playlist.id === "2") {
    throw new BadRequestError("You cannot delete " + playlist.title);
  }

  // Delete all user's animes in the playlist
  const animes = await Anime.find({
    createdBy: req.user.userId,
    playlistID: req.params.id,
  });

  animes.forEach((anime) => {
    if (anime.playlistID.includes(playlist.id)) {
      anime.remove();
    }
  });

  // Remove playlist
  //@ts-ignore
  playlist.remove();

  res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
