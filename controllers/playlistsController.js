import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";

// REST routes set up in playlistRoutes.js

const getPlaylists = async (req, res) => {
  // get all playlists from the current user and return them

  const user = await User.findOne({ _id: req.user.userId });
  const playlists = user.playlists;
  res.status(StatusCodes.OK).json({ playlists });
};

const createPlaylist = async (req, res) => {
  // create a new playlist for the current user and return it

  const user = await User.findOne({ _id: req.user.userId });

  const randomPlaylistID = Math.floor(Math.random() * 1000000);

  const playlist = {
    title: req.body.title,
    id: randomPlaylistID,
  };

  user.playlists.push(playlist);
  await user.save();
  res.status(StatusCodes.CREATED).json({ playlist });
};

const updatePlaylist = async (req, res) => {
  console.log("update playlist in controler");
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user, "updatePlaylist user");

  const playlist = user.playlists.find(
    (playlist) => playlist.id === req.params.id
  );

  console.log(playlist, "updatePlaylist playlist");

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  playlist.title = req.body.title;

  await user.save();
  res.status(StatusCodes.OK).json({ playlist });
};

const deletePlaylist = async (req, res) => {
  // don't delete the playlist if it is the only one

  console.log("delete playlist in controler");

  const user = await User.findOne({ _id: req.user.userId });

  if (user.playlists.length === 1) {
    console.log("cannot delete the only playlist");
    throw new BadRequestError("You must have at least one playlist");
  }

  const playlist = user.playlists.find(
    (playlist) => playlist.id === req.params.id
  );

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  // delete all the animes in the playlist
  const animes = await Anime.find({ playlistId: req.params.id });
  await animes.forEach((anime) => {
    anime.remove();
  });

  user.playlists = user.playlists.filter(
    (playlist) => playlist.id !== req.params.id
  );

  await user.save();
  res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
