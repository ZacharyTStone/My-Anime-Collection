import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { useQueries } from "@tanstack/react-query";
import { SavedAnime } from "../utils/types";
import { useAnimeSelector, usePlaylistSelector, useSettingsSelector } from "../stores/hooks";
import { useAnimesQuery, useCollectionQuery, type CollectionAnime } from "../queries/animes";
import { animeDetailsQueryOptions } from "../queries/kitsu";
import { matchesServices } from "../utils/streamingServices";
import PageBtnContainer from "./PageBtnContainer";
import { SkeletonLoadingBlock } from "./UI";
import Anime from "./UI/AnimeCard";
import { Button } from "@/Components/UI/button";

const PageLoader = () => (
  <section className="mt-8">
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      <SkeletonLoadingBlock height={300} width="100%" borderRadius={8} />
      <SkeletonLoadingBlock height={300} width="100%" borderRadius={8} />
      <SkeletonLoadingBlock height={300} width="100%" borderRadius={8} />
    </div>
  </section>
);

/** Client-side sort mirroring the server's sort options, for streaming mode. */
const sortCollection = (animes: CollectionAnime[], sort: string): CollectionAnime[] => {
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

const MyAnimesContainer = () => {
  const { t } = useTranslation();
  const {
    page,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
    streamingOnly,
  } = useAnimeSelector((s) => ({
    page: s.page,
    search: s.search,
    searchStatus: s.searchStatus,
    searchType: s.searchType,
    searchStared: s.searchStared,
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

  const { data, isPending } = useAnimesQuery(
    currentPlaylist.id,
    { page, search, searchStatus, searchType, searchStared, sort },
    !streamingFilterActive
  );

  // Streaming mode: filter the whole playlist client-side by streaming links
  const collectionQuery = useCollectionQuery(streamingFilterActive);

  const playlistAnimes = useMemo(
    () =>
      (collectionQuery.data ?? []).filter(
        (a) => a.playlistID === currentPlaylist.id
      ),
    [collectionQuery.data, currentPlaylist.id]
  );

  const kitsuIds = useMemo(
    () => [
      ...new Set(
        playlistAnimes
          .map((a) => a.id)
          .filter((id): id is string => Boolean(id))
      ),
    ],
    [playlistAnimes]
  );

  const detailResults = useQueries({
    queries: kitsuIds.map((id) => ({
      ...animeDetailsQueryOptions(id),
      enabled: streamingFilterActive,
    })),
  });

  const streamingAnimes = useMemo(() => {
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
  }, [streamingFilterActive, detailResults, kitsuIds, playlistAnimes, search, sort, streamingServices]);

  const streamingPending =
    collectionQuery.isPending || detailResults.some((r) => r.isPending);

  if (streamingFilterActive) {
    if (streamingPending) return <PageLoader />;
    const animes = streamingAnimes ?? [];
    return (
      <section className="mt-8">
        <h5 className="mb-6 font-bold">
          {t("my_animes_container.streaming_found", { count: animes.length })}
        </h5>
        {animes.length === 0 ? (
          <div className="rounded-lg border bg-card p-10 text-center shadow-sm">
            <p className="text-lg font-medium">
              {t("my_animes_container.streaming_empty")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">
            {animes.map((anime: SavedAnime) => (
              <Anime key={anime._id} {...anime} type="delete" />
            ))}
          </div>
        )}
      </section>
    );
  }

  const animes = data?.animes ?? [];
  const totalAnimes = data?.totalAnimes ?? 0;
  const numOfPages = data?.numOfPages ?? 1;

  const noAnimesInPlaylist = animes.length === 0 && search?.length === 0;

  if (isPending) return <PageLoader />;

  if (noAnimesInPlaylist) {
    return (
      <section className="mt-8 rounded-lg border bg-card p-10 text-center shadow-sm">
        <p className="text-lg font-medium">
          {t("my_animes_container.no_anime_message1")}
        </p>
        <Button asChild variant="outline" className="mt-4">
          <NavLink to="/add-anime">
            {t("my_animes_container.no_anime_message2")}
          </NavLink>
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h5 className="mb-6 font-bold">
        {totalAnimes} anime{animes.length > 1 && "s"} found in playlist
      </h5>
      {numOfPages > 1 && <PageBtnContainer numOfPages={numOfPages} />}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">
        {animes?.map((anime: SavedAnime) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
    </section>
  );
};

export default MyAnimesContainer;
