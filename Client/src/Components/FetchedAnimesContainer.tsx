import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Anime } from "../Components";
import { useMobile } from "../utils/hooks";
import { ExpectedFetchedAnimeResponse } from "../utils/types";
import { SkeletonLoadingBlock } from "./UI";
import { Button } from "@/Components/UI/button";
import { useKitsuAnimesQuery } from "../queries/kitsu";
import { mapFetchedAnime } from "../utils/mapFetchedAnime";

const LoadingUI = ({ onMobile }: { onMobile: boolean }) => (
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
);

interface FetchedAnimesContainerProps {
  searchText: string;
  baseURL: string;
  filter: boolean;
  pagination: boolean;
  sort: string;
}

const FetchedAnimesContainer = ({
  searchText,
  baseURL,
  pagination,
  sort,
}: FetchedAnimesContainerProps) => {
  const { t } = useTranslation();
  const onTrendingPage = baseURL.includes("trending");
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState(searchText + sort + baseURL);

  // Reset to page 1 whenever the search criteria change
  if (lastQuery !== searchText + sort + baseURL) {
    setLastQuery(searchText + sort + baseURL);
    setPage(1);
  }

  const enabled = Boolean(searchText) || onTrendingPage;

  const { data, isPending } = useKitsuAnimesQuery({
    baseURL,
    page,
    searchText,
    sort,
    enabled,
  });

  const onMobile = useMobile();

  if (enabled && isPending) {
    return <LoadingUI onMobile={onMobile} />;
  }

  const fetchedAnimes = data?.animes ?? [];
  const totalFetchedAnimes = data?.totalAnimes ?? 0;
  const numOfFetchedAnimesPages = data?.numOfPages ?? 1;

  return (
    <section className="mt-8">
      {fetchedAnimes?.length > 0 ? (
        <div>
          {pagination && (
            <div className="mb-8 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                {t("common.previous")}
              </Button>
              <p className="text-sm font-medium text-muted-foreground">
                {t("common.page_of", { page, total: numOfFetchedAnimesPages })}
              </p>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(numOfFetchedAnimesPages, p + 1))}
                disabled={page === numOfFetchedAnimesPages}
              >
                {t("common.next")}
              </Button>
            </div>
          )}
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
          {!onTrendingPage && (
            <div className="mt-8 mb-4 flex justify-center items-center">
              <p className="text-sm text-muted-foreground">
                {t("common.results_found", { count: totalFetchedAnimes })}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {searchText && !isPending && (
            <div className="rounded-xl border border-border/70 bg-card p-10 text-center shadow-sm">
              <p className="text-lg font-medium">{t("common.no_results")}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default FetchedAnimesContainer;
