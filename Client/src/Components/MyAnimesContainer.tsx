import { useAppContext } from "./../context/appContext";
import { useEffect, useState } from "react";
import Anime from "./Anime";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SkeletonLoadingBlock } from "./UI/SkeletonLoadingBlock";

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

  if (isLoading) {
    return (
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
          <SkeletonLoadingBlock height={300} width={"100%"} borderRadius={8} />
        </div>
      </Wrapper>
    );
  }

  if (animes.length === 0 && search?.length === 0 && !isLoading) {
    return (
      <Wrapper>
        <h5>
          {t("my_animes_container.no_anime_message1")}
          <NavLink to="/add-anime" className="btn btn-block btn-outline">
            {t("my_animes_container.no_anime_message2")}
          </NavLink>
        </h5>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalAnimes} anime{animes.length > 1 && "s"} found in playlist
      </h5>
      {numOfPages > 1 && <PageBtnContainer />}
      <div className="animes">
        {animes?.map((anime: any) => {
          console.log("anime", anime);
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  padding: 40px;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .animes {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    color: var(--textColor);
  }
  height: 100%;

  @media (min-width: 992px) {
    .animes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
    }
  }
`;
export default MyAnimesContainer;
