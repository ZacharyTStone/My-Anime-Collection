import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useAnimeSelector, usePlaylistSelector, useSettingsSelector } from "./storeSelectors";
import { useCollectionQuery, type CollectionAnime } from "../queries/animes";
import { animeDetailsQueryOptions } from "../queries/kitsu";
import { matchesServices } from "../utils/streamingServices";
import { sortCollection } from "../utils/sortCollection";

export interface StreamingCollection {
  /** True when the streaming filter is on and services are selected. */
  streamingFilterActive: boolean;
  /** Filtered/sorted animes, or null while streaming mode is inactive. */
  animes: CollectionAnime[] | null;
  isPending: boolean;
}

/**
 * Streaming-filter mode: the server has no notion of streaming links, so
 * the whole collection is fetched, Kitsu detail queries (streaming links)
 * fan out per anime, and the list is filtered/sorted/searched client-side.
 */
export const useStreamingCollection = (): StreamingCollection => {
  const { search, sort, streamingOnly } = useAnimeSelector((s) => ({
    search: s.search,
    sort: s.sort,
    streamingOnly: s.streamingOnly,
  }));

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));

  const { streamingServices } = useSettingsSelector((s) => ({
    streamingServices: s.streamingServices,
  }));

  const streamingFilterActive = streamingOnly && streamingServices.length > 0;

  const collectionQuery = useCollectionQuery(streamingFilterActive);

  const playlistAnimes = useMemo(
    () => (collectionQuery.data ?? []).filter((a) => a.playlistID === currentPlaylist.id),
    [collectionQuery.data, currentPlaylist.id]
  );

  const kitsuIds = useMemo(
    () => [...new Set(playlistAnimes.map((a) => a.id).filter((id): id is string => Boolean(id)))],
    [playlistAnimes]
  );

  const detailResults = useQueries({
    queries: kitsuIds.map((id) => ({
      ...animeDetailsQueryOptions(id),
      enabled: streamingFilterActive,
    })),
  });

  const animes = useMemo(() => {
    if (!streamingFilterActive) return null;
    const allowedIds = new Set<string>();
    detailResults.forEach((result, index) => {
      if (result.data && matchesServices(result.data.streamingLinks, streamingServices)) {
        allowedIds.add(kitsuIds[index]);
      }
    });
    let list = playlistAnimes.filter((a) => a.id && allowedIds.has(a.id));
    if (search) {
      const needle = search.toLowerCase();
      list = list.filter((a) => a.title?.toLowerCase().includes(needle));
    }
    return sortCollection(list, sort);
  }, [
    streamingFilterActive,
    detailResults,
    kitsuIds,
    playlistAnimes,
    search,
    sort,
    streamingServices,
  ]);

  const isPending = collectionQuery.isPending || detailResults.some((r) => r.isPending);

  return { streamingFilterActive, animes, isPending };
};
