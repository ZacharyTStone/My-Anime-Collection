import { useEffect, useRef } from "react";
import { useAppContext } from "../context/appContext";
import { useMobile } from "../utils/hooks";
import { SkeletonLoadingBlock, Anime } from "./UI";
import { FetchedAnimesContainerProps } from "../utils/types";
import DOMPurify from "dompurify";
import styled from "styled-components";
import { Button } from "@mui/material";

const AnimeContainer: React.FC<FetchedAnimesContainerProps> = ({
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

  const onMobile = useMobile();

  // Effects
  useEffect(() => {
    // Reset page to 1 whenever searchText or sort changes
    page.current = 1;

    // Fetch animes when searchText is present or on trending page
    if (!!searchText || onTrendingPage) {
      fetchAnimes({
        page: page.current,
        baseURL,
        filter,
        searchText,
        pagination: pagination === "true",
        sort,
      });
    }
  }, [
    searchText,
    sort,
    onTrendingPage,
    fetchAnimes,
    baseURL,
    filter,
    pagination,
  ]);

  useEffect(() => {
    // Cleanup fetchedAnimes on component unmount
    return () => {
      resetFetchedAnimes();
    };
  }, [resetFetchedAnimes]);

  // Callbacks
  const handlePageClick = (increment: number) => {
    // Increment or decrement the page based on the button clicked
    page.current += increment;

    fetchAnimes({
      baseURL,
      searchText,
      filter,
      pagination: pagination === "true",
      sort,
      page: page.current,
    });
  };

  // Loading UI component
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
      <ButtonContainer>
        <Button
          onClick={() => handlePageClick(-1)}
          disabled={page.current === 1}
          variant="contained"
          color="primary"
        >
          Previous Page
        </Button>
        <span>Page {page.current}</span>
        <Button
          onClick={() => handlePageClick(1)}
          disabled={fetchedAnimes.length === 0}
          variant="contained"
          color="primary"
        >
          Next Page
        </Button>
      </ButtonContainer>

      <AnimesGrid>
        {fetchedAnimes.map((anime) => (
          <Anime
            key={anime.id}
            fetchedAnime={anime}
            actionType="add"
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
            type="anime"
            __v={0}
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  span {
    font-weight: 600;
    color: var(--textColor);
  }
`;

const AnimesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export default AnimeContainer;
