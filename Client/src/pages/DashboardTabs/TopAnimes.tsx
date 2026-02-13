import { useTranslation } from "react-i18next";
import { FetchedAnimesContainer } from "../../Components";

import { usePlaylistStore } from "../../stores/playlistStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { SkeletonLoadingBlock } from "../../Components/UI";
import { Alert } from "../../Components/UI";
import { IPlaylist } from "../../utils/types";

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
    <>
      <main className="content full-page" datatype="">

        <h1
          style={{
            textAlign: "center",
          }}
        >
          {t("top_animes.title")}
        </h1>

        <div
          style={{
            display: "flex",

            margin: "0 auto",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* playlist */}

          <form className="form-row">
            <label htmlFor="playlist" className="form-label">
              {t("search_container.playlist")}
            </label>
            {loadingFetchPlaylists ? (
              <SkeletonLoadingBlock height={40} width={200} borderRadius={6} />
            ) : (
              <select
                name="playlist"
                value={currentPlaylist.id}
                disabled={false}
                onChange={handleLocalPlaylistChange}
                className="form-select"
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
          filter={"false"}
          pagination={"false"}
          sort={"false"}
        />
      </main>
    </>
  );
};

export default TopAnimes;
