import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/misc.js";

// REST routes are defined in authRoutes.js

const register = async (req, res) => {
  let { name, email, password, isDemo } = req.body.isDemo
    ? DEMO_USER
    : req.body;

  const { theme } = req.body;

  if (!isDemo && (!name || !email || !password)) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    if (isDemo) {
      email = email + Math.floor(Math.random() * 100000);
    } else {
      throw new BadRequestError("Email already in use");
    }
  }

  const user = await User.create({ name, email, password, isDemo, theme });

  // if demo user seed the user with example user data
  const example_user = await User.findOne({
    email: process.env.SEED_USER_EMAIL,
  });

  if (example_user) {
    const example_user_playlists = example_user.playlists;

    // update the demo user with the example user's playlists
    user.playlists = [];

    example_user_playlists.forEach(async (playlist) => {
      user.playlists.push(playlist);
    });

    // find all animes associated with example user
    const example_user_animes = await Anime.find({
      createdBy: example_user._id,
    });

    example_user_animes.forEach(async (anime) => {
      await Anime.create({
        createdBy: user._id,
        creationDate: anime.creationDate,
        id: anime.id,
        title: anime.title,
        japanese_title: anime.japanese_title,
        rating: anime.rating,
        format: anime.format,
        episodeCount: anime.episodeCount,
        synopsis: anime.synopsis,
        coverImage: anime.coverImage,
        youtubeVideoId: anime.youtubeVideoId,
        playlistID: anime.playlistID,
        isDemoAnime: true,
      });
    });
  }

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      isDemo: user.isDemo,
      name: user.name,
      theme: user.theme,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { email, name, theme } = req.body;

  if (!email || !name || !theme) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.theme = theme;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const deleteUser = async (req, res) => {
  // Delete user
  const user = await User.findOne({ _id: req.user.userId });
  await user.remove();
  res.status(StatusCodes.OK).json({ message: "User deleted" });

  // Delete all associated animes
  const animes = await Anime.find({ createdBy: req.user.userId });
  animes.forEach((anime) => {
    anime.remove();
  });
};

export { register, login, updateUser, deleteUser };
