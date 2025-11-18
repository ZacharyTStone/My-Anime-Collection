/**
 * External API response interfaces
 */
export interface ExpectedFetchedAnimeResponse {
  attributes?: {
    titles?: {
      en?: string;
      en_jp?: string;
      ja_jp?: string;
    };
    posterImage?: {
      medium: string;
      small: string;
    };
    synopsis?: string;
    coverImage?: string;
    averageRating?: number;
    subtype?: string;
    startDate?: string;
    youtubeVideoId?: string;
    episodeCount?: number | null;
    format?: string;
    rating?: number;
    creationDate?: string;
    type?: string;
  };
  id?: string;
  type?: string;
}

/**
 * Playlist interface
 */
export interface IPlaylist {
  id: string;
  title: string;
  userID?: string;
  isDemoUserPlaylist?: boolean;
}

/**
 * Saved anime interface
 */
export interface SavedAnime {
  _id?: string;
  title?: string;
  image?: string;
  synopsis?: string;
  rating?: number | string;
  startDate?: string;
  episodeCount?: number | null;
  format?: string;
  subtype?: string;
  youtubeVideoId?: string;
  creationDate?: string;
  type?: string;
  coverImage?: string;
  japanese_title?: string;
  playlistID?: string;
  createdBy?: string;
}

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  theme?: "light" | "dark";
  language?: "en" | "jp";
  isDemo?: boolean;
}

/**
 * API response interfaces
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * Context action types
 */
export interface ContextAction {
  type: string;
  payload?: any;
}

/**
 * Loading state interface
 */
export interface LoadingState {
  isLoading: boolean;
  loadingData?: {
    anime_id?: string;
    [key: string]: any;
  };
}

/**
 * Form field interface
 */
export interface FormField {
  name: string;
  value: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Search parameters interface
 */
export interface SearchParams {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  stared?: string;
}

/**
 * Pagination interface
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * Error interface
 */
export interface AppError {
  message: string;
  code?: string | number;
  details?: any;
}

/**
 * Theme interface
 */
export interface Theme {
  name: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    [key: string]: string;
  };
}

/**
 * Language interface
 */
export interface Language {
  code: "en" | "jp";
  name: string;
  nativeName: string;
}

/**
 * Component props interfaces
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface InputProps extends BaseComponentProps {
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectProps extends BaseComponentProps {
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
