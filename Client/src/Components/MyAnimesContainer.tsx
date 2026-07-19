import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { SavedAnime } from "../utils/types";
import { useAnimeSelector, usePlaylistSelector } from "../stores/hooks";
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

const MyAnimesContainer = () => {
  const { t } = useTranslation();
  const isFirstLoad = useRef(true);
  const {
    getAnimes,
    animes,
    loadingMyAnimes,
    page,
    totalAnimes,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
    numOfPages,
  } = useAnimeSelector((s) => ({
    getAnimes: s.getAnimes,
    animes: s.animes,
    loadingMyAnimes: s.loadingMyAnimes,
    page: s.page,
    totalAnimes: s.totalAnimes,
    search: s.search,
    searchStatus: s.searchStatus,
    searchType: s.searchType,
    searchStared: s.searchStared,
    sort: s.sort,
    numOfPages: s.numOfPages,
  }));

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));

  useEffect(() => {
    if (currentPlaylist.id) {
      getAnimes(currentPlaylist.id).then(() => {
        isFirstLoad.current = false;
      });
    }
  }, [page, search, searchStatus, searchStared, searchType, sort, currentPlaylist, getAnimes]);

  const noAnimesInPlaylist = animes.length === 0 && search?.length === 0;

  if (loadingMyAnimes) return <PageLoader />;

  if (noAnimesInPlaylist && !loadingMyAnimes) {
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
      {numOfPages > 1 && <PageBtnContainer />}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">
        {animes?.map((anime: SavedAnime) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
    </section>
  );
};

export default MyAnimesContainer;
