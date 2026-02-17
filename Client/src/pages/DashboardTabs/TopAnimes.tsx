import { useTranslation } from "react-i18next";
import { FetchedAnimesContainer } from "../../Components";

import { usePlaylistStore } from "../../stores/playlistStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { SkeletonLoadingBlock } from "../../Components/UI";
import { IPlaylist } from "../../utils/types";
import { cn } from "../../utils/cn";

const TopAnimes = () => {
  const { t } = useTranslation();

  const {
    getPlaylists,
    currentPlaylist,
    userPlaylists,
    handlePlaylistChange,
    loadingFetchPlaylists,
  } = usePlaylistStore(
    useShallow((s) => ({
      getPlaylists: s.getPlaylists,
      currentPlaylist: s.currentPlaylist,
      userPlaylists: s.userPlaylists,
      handlePlaylistChange: s.handlePlaylistChange,
      loadingFetchPlaylists: s.loadingFetchPlaylists,
    }))
  );

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  const handleLocalPlaylistChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    handlePlaylistChange({ value: e.target.value });
  };

  return (
    <main className="content full-page">
      <h1
        style={{
          textAlign: "center",
        }}
      >
        {t("top_animes.title")}
      </h1>

      <div className="flex flex-wrap justify-center items-center mx-auto">
        <form className="mb-0">
          <label
            htmlFor="playlist"
            className="block text-sm mb-2 font-medium tracking-wide text-grey-700"
          >
            {t("search_container.playlist")}
          </label>
          {loadingFetchPlaylists ? (
            <SkeletonLoadingBlock height={40} width={200} borderRadius={6} />
          ) : (
            <select
              name="playlist"
              value={currentPlaylist.id}
              onChange={handleLocalPlaylistChange}
              className={cn(
                "w-full px-3 py-2.5 rounded-default bg-white border border-grey-300",
                "text-grey-900 text-[0.95rem] min-h-[42px] appearance-none transition-all",
                "focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-500/12"
              )}
            >
              {userPlaylists.map((playlist: IPlaylist, index: number) => {
                return (
                  <option key={index} value={playlist.id}>
                    {playlist.title}
                  </option>
                );
              })}
            </select>
          )}
        </form>
      </div>
      <FetchedAnimesContainer
        searchText={""}
        baseURL={"https://kitsu.io/api/edge/trending/anime"}
        filter={false}
        pagination={false}
        sort={""}
      />
    </main>
  );
};

export default TopAnimes;
