import * as React from "react";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Anime } from "../Components";
import { useAppContext } from "../context/appContext";
import { useMobile } from "../utils/hooks";
import { ExpectedFetchedAnimeResponse } from "../utils/types";
import { SkeletonLoadingBlock } from "./UI";
import DOMPurify from "dompurify";

interface AnimeContainerProps {
  searchText: string;
  baseURL: string;
  filter: string;
  pagination: string;
  sort: string;
}

const AnimeContainer: React.FC<AnimeContainerProps> = ({
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
  } = useAppContext();

  useEffect(() => {
    // Reset page to 1 whenever searchText or sort changes
    page.current = 1;

    // Fetch animes when searchText is present or on trending page
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
    // Cleanup fetchedAnimes on component unmount
    return () => {
      resetFetchedAnimes();
    };
  }, []);

  const handlePageClick = (increment: number) => {
    // Increment or decrement the page based on the button clicked
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
    <Container>
      <ButtonContainer>
        <SkeletonLoadingBlock height={50} width={"100%"} borderRadius={8} />
      </ButtonContainer>
      <AnimesGrid>
        {[...Array(onMobile ? 6 : 3)].map((_, index) => (
          <SkeletonLoadingBlock
            key={index}
            height={onMobile ? 300 : 600}
            width={300}
            borderRadius={8}
          />
        ))}
      </AnimesGrid>
    </Container>
  );

  if (loadingFetchAnimes) {
    return <LoadingUI />;
  }

  return (
    <Container>
      {fetchedAnimes?.length > 0 ? (
        <div>
          {pagination === "true" && (
            <ButtonContainer>
              <Button
                onClick={() => handlePageClick(-1)}
                color="primary"
                variant="contained"
                disabled={page.current === 1}
                sx={{ m: 2, display: { xs: "flex", md: "flex" } }}
              >
                Previous
              </Button>
              <TopInfo>
                <h3>We found {totalFetchedAnimes} animes </h3>
              </TopInfo>
              <Button
                onClick={() => handlePageClick(1)}
                color="primary"
                disabled={page.current === numOfFetchedAnimesPages}
                variant="contained"
                sx={{ m: 2, display: { xs: "flex", md: "flex" } }}
              >
                Next
              </Button>
            </ButtonContainer>
          )}
          <AnimesGrid>
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

            {pagination === "true" && fetchedAnimes?.length === 0 && (
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
          </AnimesGrid>
          {!onTrendingPage && (
            <PageInfo>
              <h5>
                Page {page.current} of {numOfFetchedAnimesPages}
              </h5>
            </PageInfo>
          )}
        </div>
      ) : (
        <div>{searchText && !isLoading && <h2>No animes found.</h2>}</div>
      )}
    </Container>
  );
};

const Container = styled.section`
  margin-top: 4rem;

  h2 {
    text-transform: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TopInfo = styled.div`
  text-align: center;
`;

const AnimesGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  color: var(--textColor);
`;

const PageInfo = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

 
`;


export default AnimeContainer;
