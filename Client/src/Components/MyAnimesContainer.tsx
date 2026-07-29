import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { SavedAnime } from "../utils/types";
import { useAnimeSelector, usePlaylistSelector } from "../hooks/storeSelectors";
import { useAnimesQuery } from "../queries/animes";
import { useStreamingCollection } from "../hooks/useStreamingCollection";
import PageBtnContainer from "./PageBtnContainer";
import SkeletonLoadingBlock from "./SkeletonLoadingBlock";
import Anime from "./AnimeCard";
import { Button } from "@/components/ui/button";

const PageLoader = () => (
  <section className="mt-8">
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      <SkeletonLoadingBlock height={300} width="100%" borderRadius={8} />
      <SkeletonLoadingBlock height={300} width="100%" borderRadius={8} />
      <SkeletonLoadingBlock height={300} width="100%" borderRadius={8} />
    </div>
  </section>
);

const MyAnimesContainer = () => {
  const { t } = useTranslation();
  const { page, search, searchStatus, searchType, searchStared, sort } = useAnimeSelector((s) => ({
    page: s.page,
    search: s.search,
    searchStatus: s.searchStatus,
    searchType: s.searchType,
    searchStared: s.searchStared,
    sort: s.sort,
  }));

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));

  // Streaming mode: whole collection filtered client-side by streaming links
  const streaming = useStreamingCollection();

  // Server-paginated mode
  const { data, isPending } = useAnimesQuery(
    currentPlaylist.id,
    { page, search, searchStatus, searchType, searchStared, sort },
    !streaming.streamingFilterActive
  );

  if (streaming.streamingFilterActive) {
    if (streaming.isPending) return <PageLoader />;
    const animes = streaming.animes ?? [];
    return (
      <section className="mt-8">
        <h5 className="mb-6 font-bold">
          {t("my_animes_container.streaming_found", { count: animes.length })}
        </h5>
        {animes.length === 0 ? (
          <div className="rounded-lg border bg-card p-10 text-center shadow-sm">
            <p className="text-lg font-medium">{t("my_animes_container.streaming_empty")}</p>
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
        <p className="text-lg font-medium">{t("my_animes_container.no_anime_message1")}</p>
        <Button asChild variant="outline" className="mt-4">
          <NavLink to="/add-anime">{t("my_animes_container.no_anime_message2")}</NavLink>
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h5 className="mb-6 font-bold">{t("my_animes_container.found", { count: totalAnimes })}</h5>
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
