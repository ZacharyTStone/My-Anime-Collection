import { useEffect, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Anime } from "../../Components";
import { FormRowSelect, PlaylistSelector, SkeletonLoadingBlock } from "../../Components/UI";
import { useAnimeSelector } from "../../stores/hooks";
import { useMobile } from "../../utils/hooks";
import { cn } from "../../utils/cn";
import { mapFetchedAnime } from "../../utils/mapFetchedAnime";
import { ExpectedFetchedAnimeResponse, SelectOption } from "../../utils/types";

const KITSU_ANIME_URL = "https://kitsu.io/api/edge/anime";

type Season = "winter" | "spring" | "summer" | "fall";

const getSeasonForMonth = (month: number): Season => {
  if (month <= 1 || month === 11) return "winter";
  if (month <= 4) return "spring";
  if (month <= 7) return "summer";
  return "fall";
};

const now = new Date();
const CURRENT_YEAR = now.getFullYear();
const CURRENT_SEASON = getSeasonForMonth(now.getMonth());

const YEAR_OPTIONS: SelectOption[] = Array.from(
  { length: CURRENT_YEAR - 2000 + 1 },
  (_, index) => {
    const year = String(CURRENT_YEAR - index);
    return { title: year, value: year };
  }
);

const SeasonalAnimes = () => {
  const { t } = useTranslation();
  const [season, setSeason] = useState<Season>(CURRENT_SEASON);
  const [year, setYear] = useState<string>(String(CURRENT_YEAR));
  const [page, setPage] = useState(1);

  const {
    fetchAnimes,
    fetchedAnimes,
    totalFetchedAnimes,
    numOfFetchedAnimesPages,
    resetFetchedAnimes,
    loadingFetchAnimes,
  } = useAnimeSelector((s) => ({
    fetchAnimes: s.fetchAnimes,
    fetchedAnimes: s.fetchedAnimes,
    totalFetchedAnimes: s.totalFetchedAnimes,
    numOfFetchedAnimesPages: s.numOfFetchedAnimesPages,
    resetFetchedAnimes: s.resetFetchedAnimes,
    loadingFetchAnimes: s.loadingFetchAnimes,
  }));

  useEffect(() => {
    fetchAnimes({
      page,
      baseURL: KITSU_ANIME_URL,
      filter: true,
      searchText: "",
      pagination: true,
      sort: "-userCount",
      extraParams: {
        "filter[season]": season,
        "filter[seasonYear]": year,
      },
    });
  }, [season, year, page, fetchAnimes]);

  useEffect(() => {
    return () => {
      resetFetchedAnimes();
    };
  }, [resetFetchedAnimes]);

  const SEASON_OPTIONS: SelectOption[] = [
    { title: t("seasonal.winter"), value: "winter" },
    { title: t("seasonal.spring"), value: "spring" },
    { title: t("seasonal.summer"), value: "summer" },
    { title: t("seasonal.fall"), value: "fall" },
  ];

  const handleSeasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value as Season);
    setPage(1);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    setPage(1);
  };

  const onMobile = useMobile();

  const paginationBtnClasses = cn(
    "py-2 px-4 m-2 rounded-lg font-medium text-sm cursor-pointer transition-colors",
    "bg-[var(--primary-500)] text-white border-none",
    "hover:bg-[var(--primary-600)]",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  return (
    <main className="content full-page">
      <h1 className="text-center">
        {t("seasonal.title")}
      </h1>

      <div className="flex flex-wrap justify-center items-center mx-auto">
        <form
          className="mb-0"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid gap-y-4 lg:grid-cols-3 lg:items-center lg:gap-x-4">
            <FormRowSelect
              disabled={false}
              name="season"
              value={season}
              labelText={t("seasonal.season")}
              handleChange={handleSeasonChange}
              list={SEASON_OPTIONS}
            />
            <FormRowSelect
              disabled={false}
              name="year"
              value={year}
              labelText={t("seasonal.year")}
              handleChange={handleYearChange}
              list={YEAR_OPTIONS}
            />
            <PlaylistSelector />
          </div>
        </form>
      </div>

      {loadingFetchAnimes ? (
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <SkeletonLoadingBlock height={50} width={"100%"} borderRadius={8} />
          </div>
          <div className="flex flex-row flex-wrap justify-evenly items-center text-[var(--textColor)]">
            {[...Array(onMobile ? 6 : 3)].map((_, index) => (
              <SkeletonLoadingBlock
                key={index}
                height={onMobile ? 300 : 600}
                width={300}
                borderRadius={8}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-16">
          {fetchedAnimes?.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={paginationBtnClasses}
                >
                  Previous
                </button>
                <div className="text-center">
                  <h3>Page {page} of {numOfFetchedAnimesPages}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(numOfFetchedAnimesPages, p + 1))}
                  disabled={page === numOfFetchedAnimesPages}
                  className={paginationBtnClasses}
                >
                  Next
                </button>
              </div>
              <div className="flex flex-row flex-wrap justify-evenly items-center text-[var(--textColor)]">
                {fetchedAnimes.map((anime: ExpectedFetchedAnimeResponse) => {
                  const mapped = mapFetchedAnime(anime);
                  return (
                    <Anime
                      key={anime.id}
                      {...mapped}
                      fetchedAnime={anime}
                      type="add"
                    />
                  );
                })}
              </div>
              <div className="mt-8 mb-4 flex justify-center items-center">
                <h5>We found {totalFetchedAnimes} animes</h5>
              </div>
            </div>
          ) : (
            <div>
              <h2>No animes found.</h2>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default SeasonalAnimes;
