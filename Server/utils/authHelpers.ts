import User from "../models/User.js";
import Playlist from "../models/Playlists.js";
import { DEFAULT_PLAYLISTS_EN, DEFAULT_PLAYLISTS_JP } from "./constants.js";

/** Generate a unique email for demo users. */
export const generateDemoEmail = (): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `DemoUser${timestamp}-${randomString}@demo.com`;
};

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  isDemo: boolean;
  theme: string;
  language: string;
}

/**
 * Create a user and populate their default playlists.
 * Returns the created user and JWT token.
 */
export const createUserWithPlaylists = async ({
  name,
  email,
  password,
  isDemo,
  theme,
  language,
}: CreateUserParams) => {
  const user = await User.create({
    name,
    email,
    password,
    isDemo,
    theme,
    language,
  });

  const basePlaylists =
    language === "jp" ? DEFAULT_PLAYLISTS_JP : DEFAULT_PLAYLISTS_EN;

  const playlists = basePlaylists.map((playlist) => ({
    ...playlist,
    userID: user._id,
    isDemoUserPlaylist: isDemo,
  }));

  await Promise.all(playlists.map((p) => Playlist.create(p)));

  return { user, token: user.createJWT() };
};
