import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Anime } from "../Molecules";
import { useAppContext } from "../../context/appContext";
import Loading from "../Atoms/Loading";

interface anime {
  attributes: {
    titles: {
      en: string;
      en_jp: string;
      ja_jp: string;
    };
    posterImage: {
      medium: string;
      small: string;
    };
    synopsis: string;
    coverImage: string;
    averageRating: number;
    subtype: string;
    startDate: string;
    youtubeVideoId: string;
    episodeCount: number;
    format: string;
    rating: number;
    creationDate: string;
    type: string;
  };
  id: string;
  type: string;
}

interface animeProps {
  anime: anime;
  _id: string;
  title: string;
  rating: number;
  episodeCount: number;
  format: string;
  creationDate: string;
  synopsis: string;
  coverImage: string;
  description: string;
  youtube: string;
  type: string;
  japanese_title: string;
  youtubeVideoId: string;
}

const AnimeContainer = ({
  searchText,
  baseURL,
  filter,
  pagination,
  sort,
}: {
  searchText: string;
  baseURL: string;
  filter: string;
  pagination: string;
  sort: string;
}) => {
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
        {fetchedAnimes?.length > 0 ? (
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
                {fetchedAnimes.map((anime: anime) => {
                  return (
                    <Anime
                      key={anime.id}
                      anime={anime}
                      type="add"
                      _id={""}
                      title={""}
                      rating={0}
                      episodeCount={0}
                      format={""}
                      creationDate={""}
                      synopsis={""}
                      coverImage={""}
                      description={""}
                      youtube={""}
                      japanese_title={""}
                      youtubeVideoId={""}
                    />
                  );
                })}
                {pagination === "true" && fetchedAnimes?.length === 0 && (
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
            {(searchText && !isLoading) && (
            <h2>No animes found.</h2>
            )}
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
