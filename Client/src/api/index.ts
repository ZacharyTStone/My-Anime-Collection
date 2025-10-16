/**
 * API Services Index
 * 
 * Centralized exports for all API services and utilities
 * 
 * @example
 * ```typescript
 * import { AnimeService, AuthService, PlaylistService } from '../api';
 * ```
 */

// Service exports
export { AnimeService } from './animeService';
export { AuthService } from './authService';
export { PlaylistService } from './playlistService';

// Utility exports
export { apiClient, createAxiosInstance, createAuthenticatedInstance } from './axiosInstance';
export { API_ENDPOINTS, EXTERNAL_API_ENDPOINTS, API_STATUS, TIMEOUTS, PAGINATION } from './endpoints';

// Type exports
export type {
    AnimeData,
    AnimeQueryParams,
    AnimeResponse,
    ExternalAnimeData,
    ExternalAnimeResponse,
} from './animeService';

export type {
    UserData,
    LoginCredentials,
    RegistrationData,
    AuthResponse,
    UpdateUserData,
} from './authService';

export type {
    PlaylistData,
    PlaylistResponse,
    CreatePlaylistData,
    UpdatePlaylistData,
} from './playlistService';

export type { ApiConfig } from './axiosInstance';
