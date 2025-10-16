/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        UPDATE_USER: "/auth/updateUser",
        DELETE_USER: "/auth/deleteUser",
    },

    // Anime endpoints
    ANIME: {
        BASE: "/animes",
        BY_ID: (id: string) => `/animes/${id}`,
    },

    // Playlist endpoints
    PLAYLIST: {
        BASE: "/playlists",
        BY_ID: (id: string) => `/playlists/${id}`,
    },
} as const;

/**
 * External API endpoints
 */
export const EXTERNAL_API_ENDPOINTS = {
    KITSU: {
        BASE: "https://kitsu.io/api/edge",
        ANIME: "https://kitsu.io/api/edge/anime",
        TRENDING: "https://kitsu.io/api/edge/trending/anime",
    },
} as const;

/**
 * API response status codes
 */
export const API_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Request timeout values (in milliseconds)
 */
export const TIMEOUTS = {
    DEFAULT: 10000,
    UPLOAD: 30000,
    DOWNLOAD: 60000,
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
} as const;
