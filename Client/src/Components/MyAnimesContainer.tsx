import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ExpectedFetchedAnimeResponse } from "../utils/types";
import { useAppContext } from "./../context/appContext";
import PageBtnContainer from "./PageBtnContainer";
import { SkeletonLoadingBlock } from "./UI";
import Anime from "./UI/Anime";

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

const MyAnimesContainer = () => {
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

  useEffect(() => {
    getAnimes().then(() => {
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
    });
  }, [
    page,
    search,
    searchStatus,
    searchStared,
    searchType,
    sort,
    currentPlaylist,
  ]);

  const noAnimesInPlaylist = animes.length === 0 && search?.length === 0;

  const PageLoader = () => {
    return (
      <StyledWrapper>
        <LoadingContainer>
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
        </LoadingContainer>
      </StyledWrapper>
    );
  };

  if (isLoading) return <PageLoader />;

  if (noAnimesInPlaylist && !isLoading) {
    return (
      <StyledWrapper>
        <NoAnimeMessage>
          {t("my_animes_container.no_anime_message1")}
          <NavLink to="/add-anime" className="btn btn-block btn-outline">
            {t("my_animes_container.no_anime_message2")}
          </NavLink>
        </NoAnimeMessage>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <h5>
        {totalAnimes} anime{animes.length > 1 && "s"} found in playlist
      </h5>
      {numOfPages > 1 && <PageBtnContainer />}
      <AnimeContainer>
        {animes?.map((anime: IAnime) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </AnimeContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  margin-top: 4rem;
  padding: 40px;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NoAnimeMessage = styled.h5`
  text-align: center;
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
    align-items: center;
  }
`;

export default MyAnimesContainer;
