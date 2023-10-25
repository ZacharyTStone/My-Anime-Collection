import User from "../models/User.js";
import Anime from "../models/Anime.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/constants.js";
import { SEED_ANIMES } from "../utils/constants.js";
import { generateRandomNumber } from "../utils/misc.js";
import Playlist from "../models/Playlist.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  validateCredentials(email, password);

  const user = await getUserByEmail(email);

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
  validateUpdateFields(email, name, theme);

  const user = await getUserById(req.user.userId);

  updateUserFields(user, email, name, theme);

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const register = async (req, res) => {
  const { is_demo_user } = req.body;
  const { name, email, password } = is_demo_user ? DEMO_USER : req.body;
  const { theme } = req.body;
  validateRegistrationFields(is_demo_user, name, email, password);

  let userEmail = await handleExistingUser(email, is_demo_user);

  const user = await createUser(name, userEmail, password, is_demo_user, theme);

  const DEFAULT_PLAYLISTS = [
    { title: "Currently Watching", id: "0" },
    { title: "Want to Watch", id: "1" },
    { title: "My All Time Favorites ❤️", id: "2" },
  ];

  await createDefaultPlaylists(user, DEFAULT_PLAYLISTS);

  if (is_demo_user) {
    await createSeedAnimes(user);
  }

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      is_demo_user: user.is_demo_user,
      name: user.name,
      theme: user.theme,
    },
    token,
  });
};

const deleteUser = async (req, res) => {
  const user = await getUserById(req.user.userId);
  await user.remove();
  res.status(StatusCodes.OK).json({ message: "User deleted" });

  await deleteAssociatedAnimes(req.user.userId);
};

// Helper functions

const validateCredentials = (email, password) => {
  const errorMessage = "Please provide all values";
  if (!email || !password) {
    throw new BadRequestError(errorMessage);
  }
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  return user;
};

const validateUpdateFields = (email, name, theme) => {
  const errorMessage = "Please provide all values";
  if (!email || !name || !theme) {
    throw new BadRequestError(errorMessage);
  }
};

const getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

const updateUserFields = (user, email, name, theme) => {
  user.email = email;
  user.name = name;
  user.theme = theme;
  return user.save();
};

const validateRegistrationFields = (is_demo_user, name, email, password) => {
  const errorMessage = "Please provide all values";
  if (!is_demo_user && (!name || !email || !password)) {
    throw new BadRequestError(errorMessage);
  }
};

const handleExistingUser = async (email, is_demo_user) => {
  let userEmail = email;
  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    if (is_demo_user) {
      userEmail = `DemoUser${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}@demo.com`;
    } else {
      throw new BadRequestError("Email already in use");
    }
  }

  return userEmail;
};

const createUser = async (name, email, password, is_demo_user, theme) => {
  return await User.create({ name, email, password, is_demo_user, theme });
};

const createDefaultPlaylists = async (user, playlists) => {
  const playlistPromises = playlists.map(async (playlist) => {
    try {
      await Playlist.create({
        title: playlist.title,
        id: playlist.id,
        created_by: user._id,
        demo_user_playlist: user.is_demo_user,
      });
    } catch (error) {
      console.error(`Error creating playlist: ${error.message}`);
    }
  });

  return Promise.all(playlistPromises);
};

const createSeedAnimes = async (user) => {
  const animePromises = SEED_ANIMES.map(async (animeData) => {
    try {
      await Anime.create({ createdBy: user._id, ...animeData });
    } catch (error) {
      console.error(`Error creating anime: ${error.message}`);
    }
  });

  return Promise.all(animePromises);
};

const deleteAssociatedAnimes = async (userId) => {
  const animes = await Anime.find({ createdBy: userId });

  const animePromises = animes.map(async (anime) => {
    try {
      await anime.remove();
    } catch (error) {
      console.error(`Error deleting anime: ${error.message}`);
    }
  });

  return Promise.all(animePromises);
};

export { register, login, updateUser, deleteUser };
