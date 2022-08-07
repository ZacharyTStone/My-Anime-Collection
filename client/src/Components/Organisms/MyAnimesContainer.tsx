import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "../Atoms/Loading";
import Anime from "../Molecules/Anime";
import styled from "styled-components";
import PageBtnContainer from "../Molecules/PageBtnContainer";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAnimesContainer = () => {
  const { t } = useTranslation();
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
    getAnimes();
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
    return <Loading center />;
  }

  if (animes.length === 0) {
    return (
      <Wrapper>
        <h2>
          {t("my_animes_container.no_anime_message1")}
          <NavLink to="/add-anime" className="btn btn-block btn-hipster">
            {t("my_animes_container.no_anime_message2")}
          </NavLink>
        </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalAnimes} anime{animes.length > 1 && "s"} found in playlist
      </h5>
      <div className="pageBtnContainer">
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
      <div className="animes">
        {animes.map((anime: any) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
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

  .pageBtnContainer {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
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
