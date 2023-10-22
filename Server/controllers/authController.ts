import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/misc.js";
import { SEED_ANIMES } from "../utils/seed_animes.js";
import { generateRandomNumber } from "../utils/misc.js";
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
      email = `DemoUser${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}@demo.com`;
    } else {
      throw new BadRequestError("Email already in use");
    }
  }

  const user = await User.create({ name, email, password, isDemo, theme });

  if (isDemo) {
    SEED_ANIMES.forEach(async (animeData) => {
      await Anime.create({
        createdBy: user._id,
        creationDate: animeData.creationDate,
        id: animeData.id,
        title: animeData.title,
        japanese_title: animeData.japanese_title,
        rating: animeData.rating,
        format: animeData.format,
        episodeCount: animeData.episodeCount,
        synopsis: animeData.synopsis,
        coverImage: animeData.coverImage,
        youtubeVideoId: animeData.youtubeVideoId,
        playlistID: animeData.playlistID,
        isDemoAnime: animeData.isDemoAnime,
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
