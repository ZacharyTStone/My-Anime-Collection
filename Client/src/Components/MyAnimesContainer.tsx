import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { useAnimeStore, Anime as IAnime } from "../stores/animeStore";
import { usePlaylistStore } from "../stores/playlistStore";
import { useShallow } from "zustand/react/shallow";
import PageBtnContainer from "./PageBtnContainer";
import { SkeletonLoadingBlock } from "./UI";
import Anime from "./UI/AnimeCard";

const MyAnimesContainer = () => {
  const { t } = useTranslation();
  const isFirstLoad = useRef(true);
  const {
    getAnimes,
    animes,
    isLoading,
    page,
    totalAnimes,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
    numOfPages,
  } = useAnimeStore(
    useShallow((s) => ({
      getAnimes: s.getAnimes,
      animes: s.animes,
      isLoading: s.isLoading,
      page: s.page,
      totalAnimes: s.totalAnimes,
      search: s.search,
      searchStatus: s.searchStatus,
      searchType: s.searchType,
      searchStared: s.searchStared,
      sort: s.sort,
      numOfPages: s.numOfPages,
    }))
  );

  const currentPlaylist = usePlaylistStore((s) => s.currentPlaylist);

  useEffect(() => {
    if (currentPlaylist.id) {
      getAnimes(currentPlaylist.id).then(() => {
        isFirstLoad.current = false;
      });
    }
  }, [page, search, searchStatus, searchStared, searchType, sort, currentPlaylist, getAnimes]);

  const noAnimesInPlaylist = animes.length === 0 && search?.length === 0;

  const PageLoader = () => {
    return (
      <section className="mt-16 p-10">
        <div className="flex justify-center items-center gap-2.5">
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
        </div>
      </section>
    );
  };

  if (isLoading) return <PageLoader />;

  if (noAnimesInPlaylist && !isLoading) {
    return (
      <section className="mt-16 p-10">
        <h5 className="text-center">
          {t("my_animes_container.no_anime_message1")}
          <NavLink to="/add-anime" className="btn btn-block btn-outline">
            {t("my_animes_container.no_anime_message2")}
          </NavLink>
        </h5>
      </section>
    );
  }

  return (
    <section className="mt-16 p-10">
      <h5 className="font-bold">
        {totalAnimes} anime{animes.length > 1 && "s"} found in playlist
      </h5>
      {numOfPages > 1 && <PageBtnContainer />}
      <div className="grid grid-cols-1 gap-y-8 lg:flex lg:flex-row lg:flex-wrap lg:justify-evenly lg:items-center" style={{ color: "var(--textColor)" }}>
        {animes?.map((anime: IAnime) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
    </section>
  );
};

export default MyAnimesContainer;
