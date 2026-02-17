import * as React from "react";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { Anime } from "../Components";
import { useAnimeStore } from "../stores/animeStore";
import { useShallow } from "zustand/react/shallow";
import { useMobile } from "../utils/hooks";
import { ExpectedFetchedAnimeResponse } from "../utils/types";
import { SkeletonLoadingBlock } from "./UI";
import DOMPurify from "dompurify";

interface FetchedAnimesContainerProps {
  searchText: string;
  baseURL: string;
  filter: boolean;
  pagination: boolean;
  sort: string;
}

const FetchedAnimesContainer: React.FC<FetchedAnimesContainerProps> = ({
  searchText,
  baseURL,
  filter,
  pagination,
  sort,
}) => {
  const onTrendingPage = baseURL.includes("trending");
  const page = useRef(1);

  const {
    fetchAnimes,
    isLoading,
    fetchedAnimes,
    totalFetchedAnimes,
    numOfFetchedAnimesPages,
    resetFetchedAnimes,
    loadingFetchAnimes,
  } = useAnimeStore(
    useShallow((s) => ({
      fetchAnimes: s.fetchAnimes,
      isLoading: s.isLoading,
      fetchedAnimes: s.fetchedAnimes,
      totalFetchedAnimes: s.totalFetchedAnimes,
      numOfFetchedAnimesPages: s.numOfFetchedAnimesPages,
      resetFetchedAnimes: s.resetFetchedAnimes,
      loadingFetchAnimes: s.loadingFetchAnimes,
    }))
  );

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
  }, [searchText, sort]);

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

  const LoadingUI = () => (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <SkeletonLoadingBlock height={50} width={"100%"} borderRadius={8} />
      </div>
      <div className="flex flex-row flex-wrap justify-evenly items-center" style={{ color: "var(--textColor)" }}>
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

  if (loadingFetchAnimes) {
    return <LoadingUI />;
  }

  return (
    <section className="mt-16">
      {fetchedAnimes?.length > 0 ? (
        <div>
          {pagination && (
            <div className="flex justify-between items-center mb-8">
              <Button
                onClick={() => handlePageClick(-1)}
                color="primary"
                variant="contained"
                disabled={page.current === 1}
                sx={{ m: 2, display: { xs: "flex", md: "flex" } }}
              >
                Previous
              </Button>
              <div className="text-center">
                <h3>Page {page.current} of {numOfFetchedAnimesPages}</h3>
              </div>
              <Button
                onClick={() => handlePageClick(1)}
                color="primary"
                disabled={page.current === numOfFetchedAnimesPages}
                variant="contained"
                sx={{ m: 2, display: { xs: "flex", md: "flex" } }}
              >
                Next
              </Button>
            </div>
          )}
          <div className="flex flex-row flex-wrap justify-evenly items-center" style={{ color: "var(--textColor)" }}>
            {fetchedAnimes.map((anime: ExpectedFetchedAnimeResponse) => (
              <Anime
                key={anime.id}
                fetchedAnime={anime}
                type="add"
                _id={anime.id}
                title={
                  anime?.attributes?.titles?.en ||
                  anime?.attributes?.titles?.en_jp ||
                  "Title N/A"
                }
                rating={anime?.attributes?.averageRating || "N/A"}
                episodeCount={anime?.attributes?.episodeCount}
                format={anime?.attributes?.subtype || "N/A"}
                creationDate={anime?.attributes?.startDate || "N/A"}
                synopsis={
                  anime?.attributes?.synopsis
                    ? DOMPurify.sanitize(anime?.attributes?.synopsis)
                    : "No synopsis available"
                }
                coverImage={
                  anime?.attributes?.posterImage?.medium ||
                  anime?.attributes?.posterImage?.small
                }
                japanese_title={
                  anime?.attributes?.titles?.ja_jp ||
                  anime?.attributes?.titles?.en ||
                  "Title N/A"
                }
                youtubeVideoId={anime?.attributes?.youtubeVideoId}
              />
            ))}

            {pagination && fetchedAnimes?.length === 0 && (
              <Button
                onClick={() => handlePageClick(1)}
                color="primary"
                disabled={fetchedAnimes.length === 0}
                className={
                  fetchedAnimes.length === 0
                    ? "hidden"
                    : "btn btn-block btn-load-more"
                }
              >
                Load next page
              </Button>
            )}
          </div>
          {!onTrendingPage && (
            <div className="mt-8 mb-4 flex justify-center items-center">
              <h5>We found {totalFetchedAnimes} animes</h5>
            </div>
          )}
        </div>
      ) : (
        <div>{searchText && !isLoading && <h2>No animes found.</h2>}</div>
      )}
    </section>
  );
};

export default FetchedAnimesContainer;
