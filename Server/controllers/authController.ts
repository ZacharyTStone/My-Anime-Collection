import User from "../models/User.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { DEMO_USER } from "../utils/constants.js";
import sanitize from "mongo-sanitize";
import {
  generateDemoEmail,
  createUserWithPlaylists,
} from "../utils/authHelpers.js";

// Types
interface UserInput {
  name?: string;
  email?: string;
  password?: string;
  theme?: string;
  language?: string;
}

interface DemoUserRequest {
  isDemo: boolean;
  theme?: string;
  language?: string;
}

// Constants
const MAX_RETRIES = 3;

/**
 * Validate required input fields
 */
const validateInputs = (inputObject: Record<string, unknown>): void => {
  const missingValues = Object.entries(inputObject)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  if (missingValues.length > 0) {
    throw new BadRequestError(
      `Please provide all required values: ${missingValues.join(", ")}`
    );
  }
};

/**
 * Handle demo user creation with retry logic
 */
const createDemoUserWithRetry = async (
  name: string,
  password: string,
  isDemo: boolean,
  theme?: string,
  language?: string
) => {
  let userEmail = generateDemoEmail();
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    const userAlreadyExists = await User.findOne({ email: userEmail });
    if (!userAlreadyExists) break;

    userEmail = generateDemoEmail();
    retryCount++;
  }

  if (retryCount === MAX_RETRIES) {
    throw new BadRequestError("Failed to create demo user. Please try again.");
  }

  return createUserWithPlaylists({
    name,
    email: userEmail,
    password,
    isDemo,
    theme,
    language,
  });
};

/**
 * Register a new user or create demo user
 */
const register = async (req: Request, res: Response) => {
  const { isDemo, theme, language } = sanitize(req.body) as DemoUserRequest;

  let userData: UserInput;

  if (isDemo) {
    userData = DEMO_USER;
  } else {
    const { name, email, password } = sanitize(req.body);
    userData = { name, email, password };
    validateInputs(userData as Record<string, unknown>);
  }

  const { name, email, password } = userData;

  try {
    const { user, token } = await createDemoUserWithRetry(
      name!,
      password!,
      isDemo,
      theme,
      language
    );

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
  } catch (error: any) {
    if (error.code === 11000 && isDemo) {
      // Retry with a new email for demo users
      const { user, token } = await createDemoUserWithRetry(
        name!,
        password!,
        isDemo,
        theme,
        language
      );

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

/**
 * Authenticate existing user
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = sanitize(req.body);

  validateInputs({ email, password });

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      isDemo: user.isDemo,
      name: user.name,
      theme: user.theme,
      language: user.language,
    },
    token,
  });
};

/**
 * Update user profile
 */
const updateUser = async (req: Request, res: Response) => {
  const { name, email, lastName, location } = sanitize(req.body);
  const userId = req.user?.userId;

  if (!userId) {
    throw new BadRequestError("User authentication required");
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      isDemo: user.isDemo,
      name: user.name,
      theme: user.theme,
      language: user.language,
    },
    token,
  });
};

/**
 * Get current user profile
 */
const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new BadRequestError("User authentication required");
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      isDemo: user.isDemo,
      name: user.name,
      theme: user.theme,
      language: user.language,
    },
  });
};

/**
 * Delete user account and associated data
 */
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new BadRequestError("User authentication required");
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  // Delete associated data
  await Promise.all([
    Anime.deleteMany({ createdBy: userId }),
    Playlist.deleteMany({ userId }),
    User.deleteOne({ _id: userId }),
  ]);

  res.status(StatusCodes.OK).json({
    msg: "User account and associated data successfully deleted",
  });
};

export { register, login, updateUser, getCurrentUser, deleteUser };
