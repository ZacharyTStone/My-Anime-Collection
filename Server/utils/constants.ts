import { v4 as uuidv4 } from "uuid";
import { PLAYLIST_TYPE } from "./types.js";

interface DEMO_USER_TYPE {
  name: string;
  is_demo_user: boolean;
  email: string;
  password: string;
}

export const DEMO_USER: DEMO_USER_TYPE = {
  name: "Demo",
  is_demo_user: true,
  email: `DemoUser${Date.now()}-${uuidv4()}@demo.com`,
  password: uuidv4(),
};

// Default playlist IDs. The client depends on these exact string values
// (Client/src/utils/constants.ts DEFAULT_PLAYLIST_IDS) — do not change them.
export const PLAYLIST_ID_CURRENTLY_WATCHING = "0";
export const PLAYLIST_ID_WANT_TO_WATCH = "1";
export const PLAYLIST_ID_ALL_TIME_FAVORITES = "2";

export const DEFAULT_PLAYLIST_IDS: readonly string[] = [
  PLAYLIST_ID_CURRENTLY_WATCHING,
  PLAYLIST_ID_WANT_TO_WATCH,
  PLAYLIST_ID_ALL_TIME_FAVORITES,
];

export const DEFAULT_PLAYLISTS_EN: PLAYLIST_TYPE[] = [
  {
    title: "Currently Watching",
    id: PLAYLIST_ID_CURRENTLY_WATCHING,
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "Want to Watch",
    id: PLAYLIST_ID_WANT_TO_WATCH,
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "My All Time Favorites ❤️",
    id: PLAYLIST_ID_ALL_TIME_FAVORITES,
    userID: "",
    isDemoUserPlaylist: false,
  },
];

export const DEFAULT_PLAYLISTS_JP: PLAYLIST_TYPE[] = [
  {
    title: "現在視聴中",
    id: PLAYLIST_ID_CURRENTLY_WATCHING,
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "見たい",
    id: PLAYLIST_ID_WANT_TO_WATCH,
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "永遠のお気に入り ❤️",
    id: PLAYLIST_ID_ALL_TIME_FAVORITES,
    userID: "",
    isDemoUserPlaylist: false,
  },
];
