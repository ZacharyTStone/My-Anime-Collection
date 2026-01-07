import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormRow, FormRowSelect, SkeletonLoadingBlock } from "../../Components/UI";
import { FetchedAnimesContainer } from "../../Components";
import { usePlaylistContext } from "../../context/PlaylistContext";
import { debounce } from "../../utils/debounce";

const SORT_OPTIONS = [
  {
    title: "popularity",
    value: "",
  },
  {
    title: "average rating",
    value: "-averageRating",
  },
  {
    title: "release date (newest first)",
    value: "-startDate",
  },
  {
    title: "release date (oldest first)",
    value: "startDate",
  },
  {
    title: "media type",
    value: "subtype",
  },
];

const AddAnime: React.FC = () => {
  const { t } = useTranslation();
  const [textInput, setTextInput] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const {
    getPlaylists,
    currentPlaylist,
    userPlaylists,
    handlePlaylistChange,
    loadingFetchPlaylists,
  } = usePlaylistContext();
  
  const debouncedRequest = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const apiValue = value.replace(/\s/g, "+");
    setTextInput(value);
    debouncedRequest(apiValue);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleLocalPlaylistChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handlePlaylistChange({ value: e.target.value });
  };

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  return (
    <Wrapper>
      <main className="content full-page">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3>{t("add_anime.title")}</h3>
          <div className="form-center">
            <FormRow
              type="text"
              name="title"
              labelText={t("add_anime.search")}
              value={textInput}
              handleChange={handleTextInput}
            />
            <FormRowSelect
              disabled={false}
              name="sort"
              value={sort}
              labelText={t("add_anime.sort")}
              handleChange={handleSort}
              list={SORT_OPTIONS}
            />
            <div className="form-row">
              <label htmlFor="playlist" className="form-label">
                {t("search_container.playlist")}
              </label>
              {loadingFetchPlaylists ? (
                <SkeletonLoadingBlock
                  height={40}
                  width={240}
                  borderRadius={6}
                />
              ) : (
                <select
                  name="playlist"
                  value={currentPlaylist.id}
                  onChange={handleLocalPlaylistChange}
                  className="form-select"
                >
                  {userPlaylists?.map((playlist, index) => (
                    <option
                      key={`${playlist.id}-${index}`}
                      value={playlist.id}
                    >
                      {playlist.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </form>
        <FetchedAnimesContainer
          searchText={searchText}
          baseURL="https://kitsu.io/api/edge/anime"
          filter={"true"}
          pagination={"true"}
          sort={sort}
        />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);

  .form-checkbox {
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-right: 0.5rem;
  }

  .form-checkbox-input {
    margin-right: 40px;
    width: 1.5rem;
    height: 1.5rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 16px;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 20px;
    }
  }
`;

export default AddAnime;
