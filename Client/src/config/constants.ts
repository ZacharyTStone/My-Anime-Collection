/**
 * Application constants and configuration
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
    BASE_URL: "/api/v1",
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
} as const;

/**
 * External API Configuration
 */
export const EXTERNAL_API_CONFIG = {
    KITSU: {
        BASE_URL: "https://kitsu.io/api/edge",
        ANIME_URL: "https://kitsu.io/api/edge/anime",
        TRENDING_URL: "https://kitsu.io/api/edge/trending/anime",
        TIMEOUT: 15000,
    },
} as const;

/**
 * Pagination Configuration
 */
export const PAGINATION_CONFIG = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
    ANIME_LIMIT: 18,
} as const;

/**
 * Debounce Configuration
 */
export const DEBOUNCE_CONFIG = {
    SEARCH_DELAY: 300,
    INPUT_DELAY: 500,
    API_DELAY: 1000,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
    TOKEN: "token",
    USER: "user",
    THEME: "theme",
    LANGUAGE: "language",
    PLAYLIST: "currentPlaylist",
} as const;

/**
 * Theme Configuration
 */
export const THEME_CONFIG = {
    DEFAULT: "light",
    OPTIONS: ["light", "dark"] as const,
} as const;

/**
 * Language Configuration
 */
export const LANGUAGE_CONFIG = {
    DEFAULT: "en",
    OPTIONS: [
        { code: "en", name: "English", nativeName: "English" },
        { code: "jp", name: "Japanese", nativeName: "日本語" },
    ] as const,
} as const;

/**
 * Sort Options
 */
export const SORT_OPTIONS = [
    { title: "Latest", value: "latest" },
    { title: "Oldest", value: "oldest" },
    { title: "A - Z", value: "a-z" },
    { title: "Z - A", value: "z-a" },
    { title: "Rating", value: "rating" },
    { title: "Format", value: "format" },
    { title: "Date added", value: "date added" },
] as const;

/**
 * Default Playlist IDs
 */
export const DEFAULT_PLAYLIST_IDS = ["0", "1", "2"] as const;

/**
 * Animation Configuration
 */
export const ANIMATION_CONFIG = {
    DURATION: {
        FAST: 150,
        NORMAL: 300,
        SLOW: 500,
    },
    EASING: {
        EASE: "ease",
        EASE_IN: "ease-in",
        EASE_OUT: "ease-out",
        EASE_IN_OUT: "ease-in-out",
    },
} as const;

/**
 * Breakpoint Configuration
 */
export const BREAKPOINTS = {
    SMALL_MOBILE: 320,
    MEDIUM_MOBILE: 375,
    LARGE_MOBILE: 425,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE_DESKTOP: 1440,
    EXTRA_LARGE_DESKTOP: 2560,
} as const;

/**
 * Viewport Configuration
 */
export const VIEWPORTS = {
    SMALL_MOBILE: BREAKPOINTS.SMALL_MOBILE,
    MEDIUM_MOBILE: BREAKPOINTS.MEDIUM_MOBILE,
    LARGE_MOBILE: BREAKPOINTS.LARGE_MOBILE,
    TABLET: BREAKPOINTS.TABLET,
    DESKTOP: BREAKPOINTS.DESKTOP,
    LARGE_DESKTOP: BREAKPOINTS.LARGE_DESKTOP,
    EXTRA_LARGE_DESKTOP: BREAKPOINTS.EXTRA_LARGE_DESKTOP,
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    VALIDATION_ERROR: "Please check your input and try again.",
    SERVER_ERROR: "Server error. Please try again later.",
    UNKNOWN_ERROR: "An unknown error occurred.",
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
    ANIME_ADDED: "Anime added successfully!",
    ANIME_DELETED: "Anime deleted successfully!",
    PLAYLIST_CREATED: "Playlist created successfully!",
    PLAYLIST_UPDATED: "Playlist updated successfully!",
    PLAYLIST_DELETED: "Playlist deleted successfully!",
    USER_UPDATED: "User updated successfully!",
    LOGIN_SUCCESS: "Login successful!",
    REGISTER_SUCCESS: "Registration successful!",
} as const;

/**
 * Loading Messages
 */
export const LOADING_MESSAGES = {
    LOADING_ANIMES: "Loading animes...",
    LOADING_PLAYLISTS: "Loading playlists...",
    SAVING_ANIME: "Saving anime...",
    DELETING_ANIME: "Deleting anime...",
    CREATING_PLAYLIST: "Creating playlist...",
    UPDATING_USER: "Updating user...",
} as const;

/**
 * Form Validation
 */
export const VALIDATION_RULES = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 20,
} as const;

/**
 * Component Sizes
 */
export const COMPONENT_SIZES = {
    BUTTON: {
        SMALL: "small",
        MEDIUM: "medium",
        LARGE: "large",
    },
    INPUT: {
        SMALL: "small",
        MEDIUM: "medium",
        LARGE: "large",
    },
    CARD: {
        SMALL: "small",
        MEDIUM: "medium",
        LARGE: "large",
    },
} as const;

/**
 * Icon Sizes
 */
export const ICON_SIZES = {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
    EXTRA_LARGE: 48,
} as const;
