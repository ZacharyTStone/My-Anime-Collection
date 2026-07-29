import type { CollectionAnime } from "./fetchAllAnimes";

/**
 * Client-side sort used by streaming-filter mode, where the whole
 * collection is fetched unsorted and sorted locally.
 * Mirrors Server getAnimes SORT_OPTIONS (animesController) — keep in sync.
 */
export const sortCollection = (animes: CollectionAnime[], sort: string): CollectionAnime[] => {
  const sorted = [...animes];
  switch (sort) {
    case "oldest":
      return sorted.sort((a, b) => (a.creationDate ?? "").localeCompare(b.creationDate ?? ""));
    case "a-z":
      return sorted.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
    case "z-a":
      return sorted.sort((a, b) => (b.title ?? "").localeCompare(a.title ?? ""));
    case "rating":
      return sorted.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
    case "format":
      return sorted.sort((a, b) => (a.format ?? "").localeCompare(b.format ?? ""));
    case "date added":
      return sorted.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    case "latest":
    default:
      return sorted.sort((a, b) => (b.creationDate ?? "").localeCompare(a.creationDate ?? ""));
  }
};
