import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/constants.js";
import sanitize from "mongo-sanitize";
import {
  generateDemoEmail,
  createUserWithPlaylists,
} from "../utils/authHelpers.js";


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

const login = async (req: Request, res: Response) => {
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

const updateUser = async (req: Request, res: Response) => {
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

const register = async (req: Request, res: Response) => {
  const { isDemo } = sanitize(req.body);
  const { name, email, password } = isDemo ? DEMO_USER : sanitize(req.body);
  const { theme } = sanitize(req.body);
  const { language } = sanitize(req.body);

  if (!isDemo) {
    validateInputs({ name, email, password });
  }

  let userEmail = email;
  let retryCount = 0;
  const MAX_RETRIES = 3;

  while (retryCount < MAX_RETRIES) {
    const userAlreadyExists = await User.findOne({ email: userEmail });
    if (!userAlreadyExists) break;
    if (!isDemo) throw new BadRequestError("Email already in use");
    userEmail = generateDemoEmail();
    retryCount++;
  }

  if (retryCount === MAX_RETRIES) {
    throw new BadRequestError("Failed to create demo user. Please try again.");
  }

  try {
    const { user, token } = await createUserWithPlaylists({
      name,
      email: userEmail,
      password,
      isDemo,
      theme,
      language,
    });

    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        isDemo: user.isDemo,
        name: user.name,
        theme: user.theme,
        language: user.language,
      },
      token,
    });
  } catch (error) {
    if (error.code === 11000 && isDemo) {
      const { user, token } = await createUserWithPlaylists({
        name,
        email: generateDemoEmail(),
        password,
        isDemo,
        theme,
        language,
      });

      res.status(StatusCodes.CREATED).json({
        user: {
          email: user.email,
          isDemo: user.isDemo,
          name: user.name,
          theme: user.theme,
          language: user.language,
        },
        token,
      });
    } else {
      throw error;
    }
  }
};

const deleteAssociatedRecords = async (
  model: Model<Document>,
  userId: string
) => {
  const records = await model.find({ createdBy: userId });

  const deletePromises = records.map(async (record: any) => {
    try {
      await record.deleteOne();
    } catch (error) {
      console.error(`Error deleting ${model.modelName} record`);
    }
  });

  await Promise.all(deletePromises);
};

const deleteUser = async (req: Request, res: Response) => {
  // Delete user
  const user = await User.findOne({ _id: req.user.userId });
  await user.deleteOne();
  res.status(StatusCodes.OK).json({ message: "User deleted" });

  // Delete all associated animes
  await deleteAssociatedRecords(Anime, req.user.userId);

  // Delete all associated playlists
  await deleteAssociatedRecords(Playlist, req.user.userId);
};

export { register, login, updateUser, deleteUser };
