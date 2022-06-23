import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Anime from "./Anime";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";
import { NavLink } from "react-router-dom";

const AnimesContainer = () => {
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
  } = useAppContext();
  useEffect(() => {
    getAnimes();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchStared, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (animes.length === 0) {
    return (
      <Wrapper>
        <h2>
          Couldn't find any anime. Click
          <NavLink to="/add-anime" className="btn btn-block btn-hipster">
            Here to add an anime
          </NavLink>
        </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalAnimes} anime{animes.length > 1 && "s"} found
      </h5>
      <div className="animes">
        {animes.map((anime) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
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
export default AnimesContainer;
