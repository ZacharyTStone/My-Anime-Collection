import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/constants.js";
import {
  SEED_ANIMES,
  DEFAULT_PLAYLISTS_EN,
  DEFAULT_PLAYLISTS_JP,
} from "../utils/constants.js";
import { generateRandomNumber } from "../utils/misc.js";
import sanitize from "mongo-sanitize";

// REST routes are defined in authRoutes.js
const validateInputs = (inputObject: Record<string, unknown>) => {
  const missingValues = Object.entries(inputObject)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  if (missingValues.length > 0) {
    throw new BadRequestError(
      `Please provide all values: ${missingValues.join(", ")}`
    );
  }
};

const login = async (req, res) => {
  const { email, password } = sanitize(req.body);

  validateInputs({ email, password });

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
  const { email, name, theme } = sanitize(req.body);

  const errorMessage = "Please provide all values";

  if (!email || !name || !theme) {
    throw new BadRequestError(errorMessage);
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.theme = theme;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const register = async (req, res) => {
  const { isDemo } = sanitize(req.body);
  const { name, email, password } = isDemo ? DEMO_USER : sanitize(req.body);
  const { theme } = sanitize(req.body);
  const { language } = sanitize(req.body);

  if (!isDemo) {
    validateInputs({ name, email, password });
  }

  let userEmail = email;

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    if (isDemo) {
      userEmail = `DemoUser${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}@demo.com`;
    } else {
      throw new BadRequestError("Email already in use");
    }
  }

  // create user
  const user = await User.create({
    name,
    email: userEmail,
    password,
    isDemo,
    theme,
  });

  let DEFAULT_PLAYLISTS =
    language === "jp" ? DEFAULT_PLAYLISTS_JP : DEFAULT_PLAYLISTS_EN;

  // create base playlists
  for (const playlist of DEFAULT_PLAYLISTS) {
    playlist.userID = user._id;
    playlist.isDemoUserPlaylist = isDemo;
  }

  DEFAULT_PLAYLISTS.forEach(async (playlist) => {
    await Playlist.create(playlist);
  });

  if (isDemo) {
    const animePromises = SEED_ANIMES.map(async (animeData) => {
      try {
        await Anime.create({
          createdBy: user._id,
          ...animeData,
        });
      } catch (error) {
        console.error(`Error creating anime: ${error.message}`);
      }
    });

    await Promise.all(animePromises);
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

const deleteAssociatedRecords = async (model: any, userId: string) => {
  const records = await model.find({ createdBy: userId });

  const deletePromises = records.map(async (record: any) => {
    try {
      await record.remove();
    } catch (error) {
      console.error(`Error deleting ${model.modelName}: ${error.message}`);
    }
  });

  await Promise.all(deletePromises);
};

const deleteUser = async (req, res) => {
  // Delete user
  const user = await User.findOne({ _id: req.user.userId });
  await user.remove();
  res.status(StatusCodes.OK).json({ message: "User deleted" });

  // Delete all associated animes
  await deleteAssociatedRecords(Anime, req.user.userId);

  // Delete all associated playlists
  await deleteAssociatedRecords(Playlist, req.user.userId);
};

export { register, login, updateUser, deleteUser };
