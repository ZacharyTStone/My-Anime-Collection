import { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ExpectedFetchedAnimeResponse } from "../utils/types";
import { useAppContext } from "./../context/appContext";
import PageBtnContainer from "./PageBtnContainer";
import { SkeletonLoadingBlock } from "./UI";
import Anime from "./UI/Anime";

// Types and Interfaces
interface IAnime {
  _id: string;
  title: string;
  rating: number;
  episodeCount: number;
  format: string;
  creationDate: string;
  synopsis: string;
  coverImage: string;
  type: string;
  japanese_title: string;
  youtubeVideoId: string;
  fetchedAnime: ExpectedFetchedAnimeResponse;
  __v: number;
}

interface MyAnimesContainerProps {
  className?: string;
}

const SKELETON_COUNT = 3;
const SKELETON_HEIGHT = 300;
const SKELETON_BORDER_RADIUS = 8;

const MyAnimesContainer: React.FC<MyAnimesContainerProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const {
    getAnimes,
    animes,
    isLoading,
    page,
    totalAnimes,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
    numOfPages,
    currentPlaylist,
  } = useAppContext();

  // Memoized values
  const hasNoAnimes = useMemo(
    () => animes.length === 0 && !search?.length,
    [animes.length, search?.length]
  );

  const shouldShowPagination = useMemo(() => numOfPages > 1, [numOfPages]);

  const animeCountText = useMemo(
    () =>
      `${totalAnimes} anime${animes.length > 1 ? "s" : ""} found in playlist`,
    [totalAnimes, animes.length]
  );

  // Callbacks
  const handleInitialLoad = useCallback(async () => {
    await getAnimes();
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [getAnimes, isFirstLoad]);

  // Effects
  useEffect(() => {
    handleInitialLoad();
  }, [
    page,
    search,
    searchStatus,
    searchStared,
    searchType,
    sort,
    currentPlaylist,
    handleInitialLoad,
  ]);

  // Render methods
  const renderSkeletonLoader = () => (
    <AnimeSection>
      <LoadingContainer>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SkeletonLoadingBlock
            key={index}
            height={SKELETON_HEIGHT}
            width="100%"
            borderRadius={SKELETON_BORDER_RADIUS}
          />
        ))}
      </LoadingContainer>
    </AnimeSection>
  );

  const renderEmptyState = () => (
    <AnimeSection>
      <EmptyAnimeContainer>
        <p>{t("my_animes_container.no_anime_message1")}</p>
        <NavLink to="/add-anime" className="btn btn-primary">
          {t("my_animes_container.no_anime_message2")}
        </NavLink>
      </EmptyAnimeContainer>
    </AnimeSection>
  );

  // Main render logic
  if (isLoading) {
    return renderSkeletonLoader();
  }

  if (hasNoAnimes && !isLoading) {
    return renderEmptyState();
  }

  return (
    <AnimeSection className={className}>
      <AnimeCountText>{animeCountText}</AnimeCountText>
      {shouldShowPagination && <PageBtnContainer />}
      <AnimeContainer>
        {animes?.map((anime: IAnime) => (
          <Anime key={anime._id} {...anime} type="delete" />
        ))}
      </AnimeContainer>
    </AnimeSection>
  );
};

// Styled Components
const AnimeSection = styled.section`
  margin-top: 4rem;
  padding: 40px;

  h2 {
    text-transform: none;
  }
`;

const AnimeCountText = styled.h5`
  font-weight: 500;
  font-size: 1rem;
  color: var(--grey-700);
  background-color: transparent;
  padding: 0.5rem 0;
  margin-bottom: 1.75rem;
  position: relative;
  cursor: default;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: var(--primary-500);
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const EmptyAnimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  margin: 4rem auto;
  max-width: 600px;
  padding: 3.5rem 2.5rem;
  text-align: center;
  background-color: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--grey-200);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      var(--primary-300),
      var(--primary-500)
    );
  }

  p {
    font-size: 1.25rem;
    color: var(--grey-700);
    margin: 0;
    font-weight: 500;
    line-height: 1.6;
  }

  .btn {
    min-width: 220px;
    margin-top: 0.75rem;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
  }
`;

const AnimeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  color: var(--textColor);

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

export default MyAnimesContainer;
