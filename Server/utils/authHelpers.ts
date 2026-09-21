import crypto from "crypto";
import User, { type UserDocument } from "../models/User.js";
import Playlist from "../models/Playlists.js";
import { DEFAULT_PLAYLISTS_EN, DEFAULT_PLAYLISTS_JP } from "./constants.js";

/** Generate a unique email for demo users. */
export const generateDemoEmail = (): string => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");
  return `DemoUser${timestamp}-${randomString}@demo.com`;
};

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  isDemo: boolean;
  // Mirror the model's union: widening this to `string` stops Mongoose's
  // create() overloads from resolving, which infers the result as `never`.
  language: UserDocument["language"];
}

/**
 * Create a user and populate their default playlists.
 * Returns the created user and JWT token.
 */
export const createUserWithPlaylists = async ({
  name,
  email,
  password,
  googleId,
  isDemo,
  language,
}: CreateUserParams) => {
  const user = await User.create({
    name,
    email,
    password,
    googleId,
    isDemo,
    language,
  });

  const basePlaylists = language === "jp" ? DEFAULT_PLAYLISTS_JP : DEFAULT_PLAYLISTS_EN;

  const playlists = basePlaylists.map((playlist) => ({
    ...playlist,
    userID: user._id,
    isDemoUserPlaylist: isDemo,
  }));

  await Playlist.insertMany(playlists);

  return { user, token: user.createJWT() };
};
