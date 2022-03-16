import AnimeContainer from "../../Components/AnimeContainer";
import { useState } from "react";

const MyAnimes = () => {
  const [filterURL, setFilterURL] = useState(
    "https://kitsu.io/api/edge/trending/anime"
  );

  return (
    <>
      <main className="content full-page" datatype="">
        <h1>Top Anime</h1>
        <AnimeContainer
          searchText={null}
          baseURL={filterURL}
          filter={"false"}
          pagination={"false"}
        />
      </main>
    </>
  );
};

export default MyAnimes;
