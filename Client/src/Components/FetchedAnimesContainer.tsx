import { useEffect, useRef } from "react";
import { Anime } from "../Components";
import { useAnimeSelector } from "../stores/hooks";
import { useMobile } from "../utils/hooks";
import { ExpectedFetchedAnimeResponse } from "../utils/types";
import { SkeletonLoadingBlock } from "./UI";
import { Button } from "@/Components/UI/button";
import { mapFetchedAnime } from "../utils/mapFetchedAnime";

const LoadingUI = ({ onMobile }: { onMobile: boolean }) => (
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
  filter,
  pagination,
  sort,
}: FetchedAnimesContainerProps) => {
  const onTrendingPage = baseURL.includes("trending");
  const page = useRef(1);

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
    page.current = 1;

    if (!!searchText || onTrendingPage) {
      fetchAnimes({
        page: page.current,
        baseURL,
        filter,
        searchText,
        pagination,
        sort,
      });
    }
  }, [searchText, sort, baseURL, fetchAnimes]);

  useEffect(() => {
    return () => {
      resetFetchedAnimes();
    };
  }, []);

  const handlePageClick = (increment: number) => {
    page.current += increment;

    fetchAnimes({
      baseURL,
      searchText,
      filter,
      pagination,
      sort,
      page: page.current,
    });
  };

  const onMobile = useMobile();

  if (loadingFetchAnimes) {
    return <LoadingUI onMobile={onMobile} />;
  }

  return (
    <section className="mt-16">
      {fetchedAnimes?.length > 0 ? (
        <div>
          {pagination && (
            <div className="mb-8 flex items-center justify-between">
              <Button
                onClick={() => handlePageClick(-1)}
                disabled={page.current === 1}
              >
                Previous
              </Button>
              <div className="text-center">
                <h3>Page {page.current} of {numOfFetchedAnimesPages}</h3>
              </div>
              <Button
                onClick={() => handlePageClick(1)}
                disabled={page.current === numOfFetchedAnimesPages}
              >
                Next
              </Button>
            </div>
          )}
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
          {!onTrendingPage && (
            <div className="mt-8 mb-4 flex justify-center items-center">
              <h5>We found {totalFetchedAnimes} animes</h5>
            </div>
          )}
        </div>
      ) : (
        <div>{searchText && !loadingFetchAnimes && <h2>No animes found.</h2>}</div>
      )}
    </section>
  );
};

export default FetchedAnimesContainer;
