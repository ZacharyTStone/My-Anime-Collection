import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Job from "./Job";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";

const AnimeContainer = ({ searchText }) => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
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
          return (
            <div>
              <h1>{anime.attributes.titles.en}</h1>
              <img src={anime.attributes.posterImage.small} alt="" />
            </div>
          );
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
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    color: var(--textColor);
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default AnimeContainer;
