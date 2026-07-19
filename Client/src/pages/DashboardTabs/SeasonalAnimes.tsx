import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Anime } from "../../Components";
import { FormRowSelect, PlaylistSelector, SkeletonLoadingBlock } from "../../Components/UI";
import { useMobile } from "../../utils/hooks";
import { mapFetchedAnime } from "../../utils/mapFetchedAnime";
import { ExpectedFetchedAnimeResponse, SelectOption } from "../../utils/types";
import { Button } from "@/Components/UI/button";
import { useKitsuAnimesQuery } from "../../queries/kitsu";

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

  const { data, isPending } = useKitsuAnimesQuery({
    baseURL: KITSU_ANIME_URL,
    page,
    searchText: "",
    sort: "-userCount",
    extraParams: {
      "filter[season]": season,
      "filter[seasonYear]": year,
    },
  });

  const fetchedAnimes = data?.animes ?? [];
  const totalFetchedAnimes = data?.totalAnimes ?? 0;
  const numOfFetchedAnimesPages = data?.numOfPages ?? 1;

  const SEASON_OPTIONS: SelectOption[] = [
    { title: t("seasonal.winter"), value: "winter" },
    { title: t("seasonal.spring"), value: "spring" },
    { title: t("seasonal.summer"), value: "summer" },
    { title: t("seasonal.fall"), value: "fall" },
  ];

  const handleSeasonChange = (value: string) => {
    setSeason(value as Season);
    setPage(1);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setPage(1);
  };

  const onMobile = useMobile();

  return (
    <main className="full-page">
      <h1 className="mb-8 text-center">
        {t("seasonal.title")}
      </h1>

      <div className="mx-auto flex flex-wrap items-center justify-center">
        <form
          className="mb-0 w-full max-w-[720px]"
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

      {isPending ? (
        <section className="mt-8">
          <SkeletonLoadingBlock height={48} width="100%" borderRadius={8} className="mb-8" />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">
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
        <section className="mt-8">
          {fetchedAnimes?.length > 0 ? (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="text-center">
                  <h3>Page {page} of {numOfFetchedAnimesPages}</h3>
                </div>
                <Button
                  onClick={() => setPage((p) => Math.min(numOfFetchedAnimesPages, p + 1))}
                  disabled={page === numOfFetchedAnimesPages}
                >
                  Next
                </Button>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">
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
