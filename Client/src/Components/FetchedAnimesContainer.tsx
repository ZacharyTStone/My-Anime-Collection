import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Anime } from "../Components";
import { useAppContext } from "../context/appContext";
import { SkeletonLoadingBlock } from "./UI/SkeletonLoadingBlock";
import { useMobile } from "../utils/hooks";
import { ExpectedFetchedAnimeResponse } from "../utils/types";

import DOMPurify from "dompurify";

const AnimeContainer = ({
  searchText,
  baseURL,
  filter,
  pagination,
  sort,
}: {
  searchText: string;
  baseURL: string;
  filter: string;
  pagination: string;
  sort: string;
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
  } = useAppContext();

  useEffect(() => {
    page.current = 1;

    if (!!searchText || onTrendingPage) {
      fetchAnimes({
        page,
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

  const handlePrevousPageClick = (page: React.MutableRefObject<number>) => {
    page.current = page.current - 1;

    fetchAnimes({
      baseURL,
      searchText,
      filter,
      pagination,
      sort,
      page: page.current,
    });
  };

  const handleNextPageClick = (page: React.MutableRefObject<number>) => {
    page.current = page.current + 1;

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

  const LoadingUI = () => {
    return (
      <Wrapper>
        <div className="buttons">
          <SkeletonLoadingBlock height={50} width={"100%"} borderRadius={8} />
        </div>
        <div className="animes">
          <SkeletonLoadingBlock
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
          <SkeletonLoadingBlock
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
          <SkeletonLoadingBlock
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
          <SkeletonLoadingBlock
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
          <SkeletonLoadingBlock
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
          <SkeletonLoadingBlock
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
        </div>
      </Wrapper>
    );
  };

  if (loadingFetchAnimes) {
    return <LoadingUI />;
  }

  return (
    <>
      <Wrapper>
        {fetchedAnimes?.length > 0 ? (
          <>
            <div>
              {pagination === "true" && (
                <div className="buttons">
                  <Button
                    onClick={() => {
                      handlePrevousPageClick(page);
                    }}
                    color="primary"
                    variant="contained"
                    disabled={page.current === 1}
                    sx={{
                      m: 2,
                      display: { xs: "flex", md: "flex" },
                    }}
                  >
                    Previous
                  </Button>
                  <div className="top-info">
                    <h3>We found {totalFetchedAnimes} animes </h3>
                  </div>
                  <Button
                    onClick={() => {
                      handleNextPageClick(page);
                    }}
                    color="primary"
                    disabled={page.current === numOfFetchedAnimesPages}
                    variant="contained"
                    sx={{
                      m: 2,
                      display: { xs: "flex", md: "flex" },
                    }}
                  >
                    Next
                  </Button>
                </div>
              )}
              <div className="animes">
                {fetchedAnimes.map((anime: ExpectedFetchedAnimeResponse) => {
                  return (
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
                      episodeCount={
                        anime?.attributes?.episodeCount ?? undefined
                      }
                      format={anime?.attributes?.subtype || "N/A"}
                      creationDate={
                        anime?.attributes?.startDate
                          ? anime?.attributes?.startDate
                          : "N/A"
                      }
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
                  );
                })}

                {pagination === "true" && fetchedAnimes?.length === 0 && (
                  <Button
                    onClick={() => {
                      page.current = page.current + 1;

                      fetchAnimes(page.current + 1);
                    }}
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
                <div
                  style={{
                    marginTop: "32px",
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h5>
                    page {page.current} of {numOfFetchedAnimesPages}
                  </h5>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>{searchText && !isLoading && <h2>No animes found.</h2>}</div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  .hidden {
    display: none;
  }

  .top-info {
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }

  .animes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    color: var(--textColor);
  }

  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }

  .animes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export default AnimeContainer;
