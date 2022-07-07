import { useTranslation } from "react-i18next";
import AnimeContainer from "../../Components/AnimeContainer";
import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import { FormRowSelect } from "../../Components";

const MyAnimes = () => {
  const { t } = useTranslation();
  const [filterURL, setFilterURL] = useState(
    "https://kitsu.io/api/edge/trending/anime"
  );

  const {
    showAlert,
    getPlaylists,
    currentPlaylist,
    userPlaylists,
    isLoading,
    handlePlaylistChange,
  } = useAppContext();

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleLocalPlaylistChange = (e) => {
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
          <FormRowSelect
            name="currentPlaylist"
            value={currentPlaylist.title}
            labelText={t("search_container.playlist")}
            handleChange={handleLocalPlaylistChange}
            list={userPlaylists}
          />
        </div>
        <AnimeContainer
          category={"all"}
          searchText={null}
          baseURL={filterURL}
          filter={"false"}
          pagination={"false"}
          sort={"false"}
        />
      </main>
    </>
  );
};

export default MyAnimes;
