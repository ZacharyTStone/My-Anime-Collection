import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";

import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

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

const googleClient = new OAuth2Client();

/** Fit a Google display name into the model's 3–20 char constraint. */
const normalizeGoogleName = (name: string | undefined, email: string): string => {
  const emailPrefix = email.split("@")[0] ?? "";
  let candidate = (name ?? "").trim().slice(0, 20);
  if (candidate.length < 3) candidate = emailPrefix.slice(0, 20);
  if (candidate.length < 3) candidate = `${candidate}User`.slice(0, 20);
  return candidate;
};

const googleLogin = async (req: Request, res: Response) => {
  const { credential, theme, language } = req.body;

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new BadRequestError("Google sign-in is not configured on this server");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  if (!payload?.email || !payload.email_verified) {
    throw new UnAuthenticatedError("Google account email could not be verified");
  }

  const email = payload.email.toLowerCase();
  const googleId = payload.sub;

  let user = await User.findOne({ email });

  if (user) {
    // Link the Google account on first SSO use of an existing email
    if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }
  } else {
    const created = await createUserWithPlaylists({
      name: normalizeGoogleName(payload.name, email),
      email,
      googleId,
      isDemo: false,
      theme: theme ?? "light",
      language: language ?? "en",
    });
    user = created.user;
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

export { register, login, googleLogin, updateUser, deleteUser };
