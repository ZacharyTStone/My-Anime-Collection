import { SortOption } from "./types";

// Sort options for anime filtering
export const SORT_OPTIONS: SortOption[] = [
  { value: "latest", title: "Latest" },
  { value: "oldest", title: "Oldest" },
  { value: "a-z", title: "A-Z" },
  { value: "z-a", title: "Z-A" },
  { value: "rating", title: "Rating" },
  { value: "episodeCount", title: "Episode Count" },
  { value: "format", title: "Format" },
  { value: "date added", title: "Date Added" },
];

// Viewport breakpoints
export const SMALL_MOBILE = 320;
export const MEDIUM_MOBILE = 375;
export const LARGE_MOBILE = 425;
export const TABLET = 768;
export const DESKTOP = 1024;
export const LARGE_DESKTOP = 1440;
export const EXTRA_LARGE_DESKTOP = 2560;

export const VIEWPORTS = {
  SMALL_MOBILE,
  MEDIUM_MOBILE,
  LARGE_MOBILE,
  TABLET,
  DESKTOP,
  LARGE_DESKTOP,
  EXTRA_LARGE_DESKTOP,
};

// Default playlist IDs
export const DEFAULT_PLAYLIST_IDS = ["0", "1", "2"];

// Testimonials
export interface TESTIMONIALS_TYPE {
  nameKey: string;
  img: string;
  textKey: string;
}

export const TESTIMONIALS: TESTIMONIALS_TYPE[] = [
  {
    nameKey: "vegeta",
    img: "/src/assets/images/testimonials/vegeta.webp",
    textKey: "landing.testimonials.vegeta.description",
  },
  {
    nameKey: "pikachu",
    img: "/src/assets/images/testimonials/pikachu.webp",
    textKey: "landing.testimonials.pikachu.description",
  },
  {
    nameKey: "shinji",
    img: "/src/assets/images/testimonials/shinji.webp",
    textKey: "landing.testimonials.shinji.description",
  },
  {
    nameKey: "pegasus",
    img: "/src/assets/images/testimonials/pegasus.webp",
    textKey: "landing.testimonials.pegasus.description",
  },
  {
    nameKey: "kaneki",
    img: "/src/assets/images/testimonials/kaneki.jpeg",
    textKey: "landing.testimonials.kaneki.description",
  },
  {
    nameKey: "light",
    img: "/src/assets/images/testimonials/light.jpeg",
    textKey: "landing.testimonials.light.description",
  },
  {
    nameKey: "erwin",
    img: "/src/assets/images/testimonials/erwin.jpeg",
    textKey: "landing.testimonials.erwin.description",
  },
];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    UPDATE_USER: "/auth/updateUser",
    DELETE_USER: "/auth/deleteUser",
  },
  ANIMES: {
    BASE: "/animes",
    BY_ID: (id: string) => `/animes/${id}`,
  },
  PLAYLISTS: {
    BASE: "/playlists",
    BY_ID: (id: string) => `/playlists/${id}`,
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
} as const;

// Default values
export const DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  SORT: "latest",
  LANGUAGE: "en",
  THEME: "light",
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error occurred. Please try again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error occurred. Please try again later.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ANIME_CREATED: "Anime successfully added to your collection!",
  ANIME_DELETED: "Anime successfully removed from your collection!",
  PLAYLIST_CREATED: "Playlist successfully created!",
  PLAYLIST_UPDATED: "Playlist successfully updated!",
  PLAYLIST_DELETED: "Playlist successfully deleted!",
  USER_UPDATED: "User profile successfully updated!",
  USER_DELETED: "User account successfully deleted!",
} as const;
