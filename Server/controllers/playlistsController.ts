import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlist.js";
import { v4 as uuidv4 } from "uuid";

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ created_by: req.user.userId });
    console.log("Playlists:", playlists);
    res.status(StatusCodes.OK).json({ playlists });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    let newPlaylistID = generateUniqueID();
    const randomTitle = `Playlist ${Math.floor(Math.random() * 1000)}`;

    const playlist = new Playlist({
      title: randomTitle,
      id: newPlaylistID,
      created_by: req.user.userId,
      demo_user_playlist: user.is_demo_user,
    });

    await playlist.save();
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
    const playlist = await findPlaylistByIdAndUser(
      req.params.id,
      req.user.userId
    );
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
    const playlist = await findPlaylistByIdAndUser(
      req.params.id,
      req.user.userId
    );
    validateDeletion(playlist);

    const animes = await Anime.find({
      createdBy: req.user.userId,
      playlistID: req.params.id,
    });

    await Promise.all(
      animes.map(async (anime) => {
        if (anime.playlistID.includes(playlist.id)) {
          await anime.remove();
        }
      })
    );

    await playlist.remove();
    res.status(StatusCodes.OK).json({ message: "Playlist deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const generateUniqueID = () => {
  let newPlaylistID = uuidv4();
  let playlistExists = Playlist.findOne({ id: newPlaylistID });

  while (playlistExists) {
    newPlaylistID = uuidv4();
    playlistExists = Playlist.findOne({ id: newPlaylistID });
  }

  return newPlaylistID;
};

const findPlaylistByIdAndUser = async (id, userId) => {
  const playlist = await Playlist.findOne({ id, created_by: userId });

  if (!playlist) {
    throw new BadRequestError("Playlist not found");
  }

  return playlist;
};

const validateDeletion = (playlist) => {
  if (["0", "1", "2"].includes(playlist.id)) {
    throw new BadRequestError(`You cannot delete ${playlist.title}`);
  }
};

export { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };
