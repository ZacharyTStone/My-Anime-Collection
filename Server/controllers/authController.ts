import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";

import { Request, Response } from "express";

interface AppError extends Error {
  code?: number;
}
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/constants.js";
import {
  generateDemoEmail,
  createUserWithPlaylists,
} from "../utils/authHelpers.js";


// REST routes are defined in authRoutes.js

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined as unknown as string;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req: Request, res: Response) => {
  const { email, name, theme } = req.body;

  const user = await User.findOne({ _id: req.user!.userId });

  if (!user) {
    throw new UnAuthenticatedError("User not found");
  }

  user.email = email;
  user.name = name;
  user.theme = theme;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const register = async (req: Request, res: Response) => {
  const { isDemo } = req.body;
  const { name, email, password } = isDemo ? DEMO_USER : req.body;
  const { theme } = req.body;
  const { language } = req.body;

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
  } catch (error: unknown) {
    if (error instanceof Error && (error as AppError).code === 11000 && isDemo) {
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
  model: { deleteMany: (filter: Record<string, string>) => Promise<unknown> },
  userId: string
) => {
  await model.deleteMany({ createdBy: userId });
};

const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user!.userId });

  if (!user) {
    throw new UnAuthenticatedError("User not found");
  }

  await deleteAssociatedRecords(Anime, req.user!.userId);
  await deleteAssociatedRecords(Playlist, req.user!.userId);
  await user.deleteOne();

  res.status(StatusCodes.OK).json({ message: "User deleted" });
};

export { register, login, updateUser, deleteUser };
