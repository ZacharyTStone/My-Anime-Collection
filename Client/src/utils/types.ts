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
    episodeCount?: number;
    format?: string;
    rating?: number;
    creationDate?: string;
    type?: string;
  };
  id?: string;
  type?: string;
}

export interface SavedAnime {
  _id?: string;
  title?: string;
  image?: string;
  synopsis?: string;
  rating?: number;
  startDate?: string;
  episodeCount?: number;
  format?: string;
  subtype?: string;
  youtubeVideoId?: string;
  creationDate?: string;
  type?: string;
  coverImage?: string;
  japanese_title?: string;
  description?: string;
  youtube?: string;
}
