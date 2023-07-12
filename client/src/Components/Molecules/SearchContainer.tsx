import { useState, useEffect } from "react";
import { FormRow, FormRowSelect } from "../Atoms";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import TwitterShare from "../Atoms/TwitterShare";

const SearchContainer = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    search,
    sort,
    sortOptions,
    handleChange,
    handlePlaylistChange,
    clearFilters,
    getPlaylists,
    currentPlaylist,
    userPlaylists,
  } = useAppContext();

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleSearch = (e : 
     React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> 
    ) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleLocalPlaylistChange =  (e : 
    React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> 
   )  => {
    if (isLoading) return;
    e.preventDefault();
    handlePlaylistChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit =  (e : 
    any)  => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>{t("search_container.title")}</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            labelText={t("search_container.search")}
            handleChange={handleSearch}
          />
          {/* sort */}
          <FormRowSelect
            disabled={isLoading}
            name="sort"
            value={sort}
            labelText={t("search_container.sort")}
            handleChange={handleSearch}
            list={sortOptions}
          />

          {/* playlist */}
          <form className="">
            <label htmlFor="playlist" className="form-label">
              {t("search_container.playlist")}
            </label>
            <select
              name="playlist"
              value={currentPlaylist.id}
              onChange={handleLocalPlaylistChange}
              className="form-select"
            >
              {userPlaylists.map(
                (
                  playlist: {
                    id: string;
                    title: string;
                  },
                  index: number
                ) => {
                  return (
                    <option key={index} value={playlist.id}>
                      {playlist.title}
                    </option>
                  );
                }
              )}
            </select>
          </form>

          <button
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {t("search_container.clear_filters")}
          </button>

          <TwitterShare />
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;


    border-radius: 8px;


    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid var(--primary-50);
    box-shadow: 0 4px 16px 0 var(--primary-50);


  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 8px;
    padding: 8px;
    font-size: 16px;
    color: #333;
  }
  .form-input:focus,
  .form-select:focus,
  .btn-block:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
    background-color: var(--primary-400);
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .btn-block:hover {
    background-color: var(--primary-500)
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
