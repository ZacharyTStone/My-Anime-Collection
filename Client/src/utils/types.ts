// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
  theme?: string;
  language?: string;
}

// Anime related types
export interface SavedAnime {
  _id: string;
  title: string;
  rating: number;
  episodeCount: number;
  format: string;
  creationDate: string;
  synopsis: string;
  coverImage: string;
  type: string;
  japanese_title: string;
  youtubeVideoId: string;
  __v: number;
}

export interface FetchedAnimeAttributes {
  titles: {
    en?: string;
    en_jp?: string;
    ja_jp?: string;
  };
  averageRating?: number;
  episodeCount?: number;
  subtype?: string;
  startDate?: string;
  synopsis?: string;
  posterImage?: {
    medium?: string;
    small?: string;
  };
  youtubeVideoId?: string;
}

export interface ExpectedFetchedAnimeResponse {
  id: string;
  type: string;
  attributes: FetchedAnimeAttributes;
}

// Playlist related types
export interface Playlist {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Legacy interface for backward compatibility
export interface IPlaylist extends Playlist {}

// Form related types
export interface FormValues {
  id: string;
  name: string;
  email: string;
  password: string;
  existingUser: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

// Loading state types
export interface LoadingData {
  anime_id: string;
}

// Alert types
export interface AlertState {
  showAlert: boolean;
  alertText: string;
  alertType: string;
}

// Search and filter types
export interface SearchFilters {
  search: string;
  searchStatus: string;
  searchStared: string;
  searchType: string;
  sort: string;
}

// Component prop types
export interface AnimeCardProps {
  _id: string;
  title: string;
  rating: number | string;
  episodeCount: number | undefined;
  format: string;
  creationDate: string;
  synopsis: string;
  coverImage: string | undefined;
  type: string;
  japanese_title: string;
  youtubeVideoId: string | undefined;
  __v: number;
  fetchedAnime: ExpectedFetchedAnimeResponse;
  actionType?: "add" | "delete";
  className?: string;
}

export interface SearchContainerProps {
  className?: string;
}

export interface FetchedAnimesContainerProps {
  searchText: string;
  baseURL: string;
  filter: string;
  pagination: string;
  sort: string;
}

// Legacy interface for backward compatibility
export interface IAnime extends AnimeCardProps {}

// Utility types
export type SortOption = {
  value: string;
  title: string;
};

export type Theme = "light" | "dark";
export type Language = "en" | "jp";

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Constants
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
