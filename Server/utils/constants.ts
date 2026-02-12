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

export const DEFAULT_PLAYLISTS_EN: PLAYLIST_TYPE[] = [
  {
    title: "Currently Watching",
    id: "0",
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "Want to Watch",
    id: "1",
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "My All Time Favorites ❤️",
    id: "2",
    userID: "",
    isDemoUserPlaylist: false,
  },
];

export const DEFAULT_PLAYLISTS_JP: PLAYLIST_TYPE[] = [
  {
    title: "現在視聴中",
    id: "0",
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "見たい",
    id: "1",
    userID: "",
    isDemoUserPlaylist: false,
  },
  {
    title: "永遠のお気に入り ❤️",
    id: "2",
    userID: "",
    isDemoUserPlaylist: false,
  },
];
