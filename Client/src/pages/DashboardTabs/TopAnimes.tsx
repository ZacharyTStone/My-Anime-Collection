import { useTranslation } from "react-i18next";
import { FetchedAnimesContainer } from "../../Components";
import { PlaylistSelector } from "../../Components/UI";

const TopAnimes = () => {
  const { t } = useTranslation();

  return (
    <main className="content full-page">
      <h1 className="text-center">
        {t("top_animes.title")}
      </h1>

      <div className="flex flex-wrap justify-center items-center mx-auto">
        <form className="mb-0">
          <PlaylistSelector />
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
