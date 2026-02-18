export interface ExpectedFetchedAnimeResponse {
  attributes?: {
    titles?: {
      en?: string;
      en_jp?: string;
      ja_jp?: string;
    };
    canonicalTitle?: string;
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

export interface IPlaylist {
  id: string;
  title: string;
}

export interface SavedAnime {
  _id?: string;
  title?: string;
  synopsis?: string;
  rating?: number | string;
  episodeCount?: number | null;
  format?: string;
  youtubeVideoId?: string;
  creationDate?: string;
  coverImage?: string;
  japanese_title?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
  theme?: "light" | "dark";
}

export type SiteLanguage = "en" | "jp";

export interface AiRecommendation {
  title: string;
  japanese_title: string;
  reason: string;
  reason_jp: string;
}

export interface SelectOption {
  title: string;
  value: string;
}
