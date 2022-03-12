import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Anime from "./Anime";
import Loading from "./Loading";

const AnimeContainer = ({ searchText }) => {
  const [page, setPage] = useState(1);

  const [fetchedAnimes, setFetchedAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes(1);
  }, [searchText]);

  const fetchAnimes = (pageNumber) => {
    const APIURL =
      "https://kitsu.io/api/edge/anime?filter[text]=" +
      searchText +
      "&page[limit]=10&page[offset]=" +
      (pageNumber - 1) * 10;
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(APIURL + searchText);
        setFetchedAnimes(data.data);
      });
  };

  return (
    <Wrapper>
      <div className="buttons">
        <Button
          onClick={() => {
            setPage(page - 1);
            setFetchedAnimes([]);
            fetchAnimes(page - 1);
          }}
          color="primary"
          variant="contained"
          disabled={page === 1}
          sx={{
            m: 2,
            display: { xs: "flex", md: "flex" },
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setPage(page + 1);
            setFetchedAnimes([]);
            fetchAnimes(page + 1);
          }}
          color="primary"
          disabled={fetchedAnimes.length === 0}
          variant="contained"
          sx={{
            m: 2,
            display: { xs: "flex", md: "flex" },
          }}
        >
          Next
        </Button>
      </div>
      <div className="animes">
        {fetchedAnimes.map((anime) => {
          return <Anime key={anime.id} anime={anime} type="add" />;
        })}

        <Button
          onClick={() => {
            setPage(page + 1);
            setFetchedAnimes([]);
            fetchAnimes(page + 1);
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
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  .hidden {
    display: none;
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
