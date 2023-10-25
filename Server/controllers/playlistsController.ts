import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlist.js";
import { v4 as uuidv4 } from "uuid"; // Import uuid library for unique ID generation

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ created_by: req.user.userId });

    console.log("wow", playlists);
    res.status(StatusCodes.OK).json({ playlists });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const createPlaylist = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  try {
    let newPlaylistID = uuidv4(); // Use uuid library for unique ID generation

    let playlistExists = await Playlist.findOne({ id: newPlaylistID });

    // If the ID already exists, generate a new one
    while (playlistExists) {
      newPlaylistID = uuidv4();
      playlistExists = await Playlist.findOne({ id: newPlaylistID });
      if (!playlistExists) {
        break;
      }
    }

    const randomTitle = `Playlist ${Math.floor(Math.random() * 1000)}`;

    const playlist = {
      title: randomTitle,
      id: newPlaylistID,
      created_by: req.user.userId,
      demo_user_playlist: user.is_demo_user,
    };

    const newPlaylist = new Playlist(playlist);
    await newPlaylist.save();

    res.status(StatusCodes.CREATED).json({ playlist });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      id: req.params.id,
      created_by: req.user.userId,
    });

    if (!playlist) {
      throw new BadRequestError("Playlist not found");
    }

    playlist.title = req.body.title;
    await playlist.save();

    res.status(StatusCodes.OK).json({ playlist });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      id: req.params.id,
      created_by: req.user.userId,
    });

    if (!playlist) {
      throw new BadRequestError("Playlist not found");
    }

    if (["0", "1", "2"].includes(playlist.id)) {
      throw new BadRequestError(`You cannot delete ${playlist.title}`);
    }

    const animes = await Anime.find({
      createdBy: req.user.userId,
      playlistID: req.params.id,
    });

    animes.forEach(async (anime) => {
      if (anime.playlistID.includes(playlist.id)) {
        await anime.remove();
      }
    });

    await playlist.remove();

    res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
