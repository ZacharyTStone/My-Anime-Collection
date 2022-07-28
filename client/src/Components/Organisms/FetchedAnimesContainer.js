import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Anime } from "../Molecules";
import { useAppContext } from "../../context/appContext";
import Loading from "../Atoms/Loading";

const AnimeContainer = ({ searchText, baseURL, filter, pagination, sort }) => {
  const page = useRef(1);

  const {
    fetchAnimes,
    isLoading,
    fetchedAnimes,
    totalFetchedAnimes,
    numOfFetchedAnimesPages,
  } = useAppContext();

  useEffect(() => {
    page.current = 1;

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
          <>
            <div>
              {pagination === "true" && (
                <div className="buttons">
                  <Button
                    onClick={() => {
                      page.current = page.current - 1;
                      console.log(page.current);

                      fetchAnimes({
                        baseURL,
                        searchText,
                        filter,
                        pagination,
                        sort,
                        page: page.current,
                      });
                    }}
                    color="primary"
                    variant="contained"
                    disabled={page.current === 1}
                    sx={{
                      m: 2,
                      display: { xs: "flex", md: "flex" },
                    }}
                  >
                    Previous
                  </Button>
                  <div className="top-info">
                    <h3>We found {totalFetchedAnimes} animes </h3>
                    <h5>
                      page {page.current} of {numOfFetchedAnimesPages}
                    </h5>
                  </div>
                  <Button
                    onClick={() => {
                      page.current = page.current + 1;

                      fetchAnimes({
                        baseURL,
                        searchText,
                        filter,
                        pagination,
                        sort,
                        page: page.current,
                      });
                    }}
                    color="primary"
                    disabled={page.current === numOfFetchedAnimesPages}
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
                      page.current = page.current + 1;

                      fetchAnimes(page.current + 1);
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
          </>
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
