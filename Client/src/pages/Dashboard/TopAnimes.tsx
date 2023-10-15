import { useTranslation } from "react-i18next";
import { FetchedAnimesContainer } from "../../Components";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import { SkeletonLoadingBlock } from "../../Components/UI/SkeletonLoadingBlock";

const MyAnimes = () => {
  const { t } = useTranslation();

  const {
    getPlaylists,
    currentPlaylist,
    userPlaylists,
    isLoading,
    handlePlaylistChange,
    loadingFetchPlaylists,
  } = useAppContext();

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleLocalPlaylistChange = (e: any) => {
    if (isLoading) return;

    handlePlaylistChange({ name: e.target.name, value: e.target.value });
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
            <select
              name="playlist"
              value={currentPlaylist.id}
              disabled={isLoading}
              onChange={handleLocalPlaylistChange}
              className="form-select"
            >
              {loadingFetchPlaylists ? (
                <option disabled={true} value="">
                  Loading...
                </option>
              ) : (
                userPlaylists.map((playlist: any, index: number) => {
                  return (
                    <option key={index} value={playlist.id}>
                      {playlist.title}
                    </option>
                  );
                })
              )}
            </select>
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

export default MyAnimes;
