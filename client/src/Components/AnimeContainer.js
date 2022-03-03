import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Anime from "./Anime.js";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";
import AnimeCard from "./AnimeCard";

const AnimeContainer = ({ searchText }) => {
  const {
    animes,
    isLoading,
    page,
    totalAnimes,
    search,
    searchStared,
    sort,
    numOfPages,
  } = useAppContext();

  const APIURL = "https://kitsu.io/api/edge/anime?filter[text]=";
  const [fetchedAnimes, setFetchedAnimes] = useState([]);

  useEffect(() => {
    fetch(APIURL + searchText)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(APIURL + searchText);
        setFetchedAnimes(data.data);
      });
  }, [searchText]);

  return (
    <Wrapper>
      <div className="animes">
        {fetchedAnimes.map((anime) => {
          return <AnimeCard key={anime.id} anime={anime} />;
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
  // old
  .animes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2rem;
  }

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

export default AnimeContainer;
