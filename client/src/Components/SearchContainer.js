import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

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
    console.log(currentPlaylist, "currentPlaylist in useEffect");
    getPlaylists();
  }, []);
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleLocalPlaylistChange = (e) => {
    if (isLoading) return;

    handlePlaylistChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
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
            name="sort"
            value={sort}
            labelText={t("search_container.sort")}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <FormRowSelect
            name="currentPlaylist"
            value={currentPlaylist.title}
            labelText={t("search_container.playlist")}
            handleChange={handleLocalPlaylistChange}
            list={userPlaylists}
          />
          <button
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {t("search_container.clear_filters")}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
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
