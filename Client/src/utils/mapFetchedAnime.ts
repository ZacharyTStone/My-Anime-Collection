import DOMPurify from "dompurify";
import { ExpectedFetchedAnimeResponse, SavedAnime } from "./types";

/**
 * Maps a Kitsu API response into the normalized shape used throughout the app.
 * Used both when saving an anime and when rendering fetched results.
 */
export function mapFetchedAnime(
  anime: ExpectedFetchedAnimeResponse
): SavedAnime {
  const attrs = anime.attributes;
  return {
    _id: anime.id || "",
    title:
      attrs?.titles?.en ||
      attrs?.titles?.en_jp ||
      attrs?.canonicalTitle ||
      "Title N/A",
    rating: attrs?.averageRating || "N/A",
    episodeCount: attrs?.episodeCount ?? null,
    format: attrs?.subtype || "N/A",
    creationDate: attrs?.startDate || "N/A",
    synopsis: attrs?.synopsis
      ? DOMPurify.sanitize(attrs.synopsis)
      : "No synopsis available",
    coverImage:
      attrs?.posterImage?.medium || attrs?.posterImage?.small || "",
    youtubeVideoId: attrs?.youtubeVideoId || "N/A",
    japanese_title:
      attrs?.titles?.ja_jp ||
      attrs?.titles?.en_jp ||
      attrs?.canonicalTitle ||
      "Title N/A",
    fetchedAnime: anime,
  };
}
