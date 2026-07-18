import { apiClient } from "./api";
import type { SavedAnime } from "./types";

export interface CollectionAnime extends SavedAnime {
  playlistID?: string;
  createdAt?: string;
}

// The backend caps `limit` at 100 (see getAnimes in animesController),
// so we page through each playlist until all pages are fetched.
const PAGE_LIMIT = 100;

/**
 * Fetches every saved anime in the user's collection, across all playlists.
 * GET /animes is scoped to a single playlist (currentPlaylistID), so we
 * fetch the user's playlists first and then page through each one.
 */
export const fetchAllAnimes = async (): Promise<CollectionAnime[]> => {
  const { data: playlistsData } = await apiClient.get("/playlists");
  const playlists: { id: string }[] = playlistsData.playlists ?? [];

  const all: CollectionAnime[] = [];

  for (const playlist of playlists) {
    let page = 1;
    for (;;) {
      const { data } = await apiClient.get("/animes", {
        params: {
          currentPlaylistID: playlist.id,
          page,
          limit: PAGE_LIMIT,
        },
      });
      all.push(...((data.animes ?? []) as CollectionAnime[]));
      if (page >= (data.numOfPages ?? 1)) break;
      page += 1;
    }
  }

  return all;
};
