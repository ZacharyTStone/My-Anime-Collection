import { useTranslation } from "react-i18next";
import AnimeContainer from "../../Components/AnimeContainer";
import { useState } from "react";

const MyAnimes = () => {
  const { t } = useTranslation();
  const [filterURL, setFilterURL] = useState(
    "https://kitsu.io/api/edge/trending/anime"
  );

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
