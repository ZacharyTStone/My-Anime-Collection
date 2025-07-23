import { useState, useEffect, useCallback, useMemo } from "react";
import { FormRow, FormRowSelect } from "./UI";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import TwitterShare from "./UI/TwitterShare";
import { debounce } from "../utils/debounce";
import { SkeletonLoadingBlock } from "./UI";
import { useLoadingState } from "../utils/hooks";

// Types and Interfaces
interface SearchContainerProps {
  className?: string;
}

interface FormEvent {
  target: {
    name: string;
    value: string;
  };
  preventDefault?: () => void;
}

// Constants
const DEBOUNCE_DELAY = 300;

/**
 * SearchContainer component that handles search and filtering functionality
 */
const SearchContainer: React.FC<SearchContainerProps> = ({ className }) => {
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

  const [localSearch, setLocalSearch] = useState(search ?? "");

  // Loading states
  const { isLoading: isLoadingSearch, withLoading: withLoadingSearch } =
    useLoadingState(isLoading);
  const {
    isLoading: isLoadingPlaylistChange,
    withLoading: withLoadingPlaylistChange,
  } = useLoadingState(isLoading);

  // Effects
  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  // Memoized values
  const isFormDisabled = useMemo(
    () => isLoading || loadingFetchPlaylists,
    [isLoading, loadingFetchPlaylists]
  );

  // Callbacks
  const handleSearch = useCallback(
    withLoadingSearch((e: FormEvent) => {
      handleChange({ name: e.target.name, value: e.target.value });
    }),
    [withLoadingSearch, handleChange]
  );

  const handleLocalPlaylistChange = useCallback(
    withLoadingPlaylistChange((e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      handlePlaylistChange({ name: e.target.name, value: e.target.value });
    }),
    [withLoadingPlaylistChange, handlePlaylistChange]
  );

  const handleResetFilters = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLocalSearch("");
      clearFilters();
    },
    [clearFilters]
  );

  const handleLocalSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
      debouncedHandleSearch(e);
    },
    []
  );

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  // Debounced search handler
  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, DEBOUNCE_DELAY),
    [handleSearch]
  );

  // Render loading skeleton
  if (loadingFetchPlaylists) {
    return (
      <Wrapper className={className}>
        <SkeletonLoadingBlock height={200} width="100%" borderRadius={8} />
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <form className="form" onSubmit={handleFormSubmit}>
        <h4>{t("search_container.title")}</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            labelText={t("search_container.search")}
            handleChange={handleLocalSearchChange}
            disabled={isFormDisabled}
          />

          {/* Sort */}
          <FormRowSelect
            disabled={isFormDisabled}
            name="sort"
            value={sort}
            labelText={t("search_container.sort")}
            handleChange={handleSearch}
            list={sortOptions}
          />

          {/* Playlist */}
          <FormRowSelect
            disabled={isFormDisabled}
            name="playlist"
            value={currentPlaylist.id}
            labelText={t("search_container.playlist")}
            handleChange={handleLocalPlaylistChange}
            list={userPlaylists.map(
              (playlist: { id: string; title: string }) => ({
                value: playlist.id,
                label: playlist.title,
              })
            )}
          />

          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={handleResetFilters}
            disabled={isFormDisabled}
          >
            {t("search_container.clear_filters")}
          </button>
        </div>
      </form>

      <TwitterShare />
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
