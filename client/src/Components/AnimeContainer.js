import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Anime from "./Anime";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";

const AnimeContainer = ({ searchText, baseURL, filter, pagination, sort }) => {
  const [page, setPage] = useState(1);

  const { fetchAnimes, isLoading, fetchedAnimes } = useAppContext();

  useEffect(() => {
    fetchAnimes({
      page,
      baseURL,
      filter,
      searchText,
      pagination,
      sort,
    });
  }, [searchText, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <Wrapper>
        {fetchedAnimes.length > 0 ? (
          <div>
            {pagination === "true" && (
              <div className="buttons">
                <Button
                  onClick={() => {
                    setPage(page - 1);

                    fetchAnimes({
                      baseURL,
                      searchText,
                      filter,
                      pagination,
                      sort,
                      page: page - 1,
                    });
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

                    fetchAnimes({
                      baseURL,
                      searchText,
                      filter,
                      pagination,
                      sort,
                      page: page + 1,
                    });
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
            )}
            <div className="animes">
              {fetchedAnimes.map((anime) => {
                return <Anime key={anime.id} anime={anime} type="add" />;
              })}
              {pagination === "true" && fetchedAnimes.length === 0 && (
                <Button
                  onClick={() => {
                    setPage(page + 1);

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
              )}
            </div>
          </div>
        ) : (
          <div className="no-animes">
            <h2>No animes found.</h2>
          </div>
        )}
      </Wrapper>
    </>
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    color: var(--textColor);
  }

  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }

  .animes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export default AnimeContainer;
