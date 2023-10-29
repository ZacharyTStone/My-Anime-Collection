import { useState, useEffect } from "react";
import { FormRow, FormRowSelect } from "./UI";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import TwitterShare from "./UI/TwitterShare";
// @ts-ignore
import { debounce } from "lodash";
import { SkeletonLoadingBlock } from "./UI/SkeletonLoadingBlock";

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
    loadingFetchPlaylists,
  } = useAppContext();

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleSearch = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleLocalPlaylistChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (isLoading) return;
    e.preventDefault();
    handlePlaylistChange({ name: e.target.name, value: e.target.value });
  };

  const handleResetFilters = (e: any) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  const [localSearch, setLocalSearch] = useState(search ?? "");
  // Use debounce on handleSearch function
  const debouncedHandleSearch = debounce(handleSearch, 300); // 300ms debounce delay

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
            value={localSearch}
            labelText={t("search_container.search")}
            handleChange={(e) => {
              setLocalSearch(e.target.value);
              debouncedHandleSearch(e);
            }}
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
              {t("search_container.current_playlist")}
            </label>
            {loadingFetchPlaylists ? (
              <SkeletonLoadingBlock height={40} width={240} borderRadius={6} />
            ) : (
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
            )}
          </form>

          <ClearFiltersButton
            className="btn btn-block btn-outline"
            disabled={isLoading}
            onClick={handleResetFilters}
          >
            {t("search_container.clear_filters")}
          </ClearFiltersButton>

          <TwitterShare />
        </div>
      </form>
    </Wrapper>
  );
};

const ClearFiltersButton = styled.button`
  align-self: end;
  margin-top: 1rem;
  background-color: var(--primary-400);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  :hover {
    background-color: var(--primary-500);
  }

  @media (min-width: 992px) {
    margin-top: 0;
  }
`;

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
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

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default SearchContainer;
