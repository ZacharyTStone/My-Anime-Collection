import { useState, useEffect, useCallback, useMemo } from "react";
import { FormRow, FormRowSelect } from "./UI";
import { useAnimeStore } from "../stores/animeStore";
import { usePlaylistStore } from "../stores/playlistStore";
import { useShallow } from "zustand/react/shallow";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
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
    clearFilters,
  } = useAnimeStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      search: s.search,
      sort: s.sort,
      sortOptions: s.sortOptions,
      handleChange: s.handleChange,
      clearFilters: s.clearFilters,
    }))
  );

  const {
    handlePlaylistChange,
    getPlaylists,
    currentPlaylist,
    userPlaylists,
    loadingFetchPlaylists,
  } = usePlaylistStore(
    useShallow((s) => ({
      handlePlaylistChange: s.handlePlaylistChange,
      getPlaylists: s.getPlaylists,
      currentPlaylist: s.currentPlaylist,
      userPlaylists: s.userPlaylists,
      loadingFetchPlaylists: s.loadingFetchPlaylists,
    }))
  );
  
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
    getPlaylists(); // eslint-disable-next-line react-hooks/exhaustive-deps
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
      handlePlaylistChange({ value: e.target.value });
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
                title: playlist.title,
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
    </Wrapper>
  );
};



const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
    padding: 16px;
    overflow: visible;
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
