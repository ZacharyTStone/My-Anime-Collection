import { useTranslation } from "react-i18next";
import { FetchedAnimesContainer } from "../../Components";
import { PlaylistSelector } from "../../Components/UI";

const TopAnimes = () => {
  const { t } = useTranslation();

  return (
    <main className="full-page">
      <h1 className="mb-8 text-center">
        {t("top_animes.title")}
      </h1>

      <div className="mx-auto flex flex-wrap items-center justify-center">
        <form className="mb-0 w-full max-w-[280px]">
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
