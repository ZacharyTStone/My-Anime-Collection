import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useTranslation } from "react-i18next";
import { Alert, SkeletonLoadingBlock } from "./UI";
import { Anime } from "./UI";
import styled from "styled-components";
import { SavedAnime } from "../utils/types";

const MyAnimesContainer = () => {
  const { t } = useTranslation();
  const { getAnimes, animes, isLoading, totalAnimes, numOfPages, showAlert } =
    useAppContext();

  useEffect(() => {
    getAnimes();
  }, [getAnimes]);

  if (isLoading) {
    return (
      <Wrapper>
        <SkeletonLoadingBlock height={200} width="100%" borderRadius={8} />
      </Wrapper>
    );
  }

  if (animes.length === 0) {
    return (
      <Wrapper>
        <div className="alert alert-info">{t("my_animes.no_animes")}</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalAnimes} {t("my_animes.anime")}
        {totalAnimes === 1 ? "" : "s"} {t("my_animes.found")}
      </h5>
      {numOfPages > 1 && <PageBtnContainer />}
      <AnimeContainer>
        {animes?.map((anime: SavedAnime) => {
          return (
            <Anime
              key={anime._id}
              {...anime}
              fetchedAnime={{
                id: anime._id,
                type: "anime",
                attributes: {
                  titles: { en: anime.title },
                  averageRating: anime.rating,
                  episodeCount: anime.episodeCount,
                  subtype: anime.format,
                  startDate: anime.creationDate,
                  synopsis: anime.synopsis,
                  posterImage: { medium: anime.coverImage },
                  youtubeVideoId: anime.youtubeVideoId,
                },
              }}
              actionType="delete"
            />
          );
        })}
      </AnimeContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h5 {
    font-weight: 700;
    span {
      margin-left: 0.25rem;
    }
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: 1px;
  }

  p {
    margin: 0;
    text-transform: capitalize;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 0.5rem;
    margin-bottom: 1rem;
    span {
      height: 2px;
      background: var(--grey-300);
    }
  }
`;

const AnimeContainer = styled.div`
  margin-top: 2rem;
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

const PageBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export default MyAnimesContainer;
