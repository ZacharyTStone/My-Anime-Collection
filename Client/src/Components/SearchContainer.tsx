import { useState, useCallback, useMemo, type ChangeEvent, type MouseEvent, type FormEvent } from "react";
import { FormRow, FormRowSelect, PlaylistSelector } from "./UI";
import { useAnimeSelector, usePlaylistSelector } from "../stores/hooks";
import type { FilterField } from "../stores/animeStore";

import { useTranslation } from "react-i18next";
import { debounce } from "../utils/debounce";

interface SearchContainerProps {
  className?: string;
}

const DEBOUNCE_DELAY = 300;

const SearchContainer = ({ className }: SearchContainerProps) => {
  const { t } = useTranslation();
  const {
    loadingMyAnimes,
    search,
    sort,
    sortOptions,
    handleChange,
    clearValues,
  } = useAnimeSelector((s) => ({
    loadingMyAnimes: s.loadingMyAnimes,
    search: s.search,
    sort: s.sort,
    sortOptions: s.sortOptions,
    handleChange: s.handleChange,
    clearValues: s.clearValues,
  }));

  const { loadingFetchPlaylists } = usePlaylistSelector((s) => ({
    loadingFetchPlaylists: s.loadingFetchPlaylists,
  }));

  const [localSearch, setLocalSearch] = useState(search ?? "");

  const isFormDisabled = loadingMyAnimes || loadingFetchPlaylists;

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      handleChange({ name: e.target.name as FilterField, value: e.target.value });
    },
    [handleChange]
  );

  const handleResetFilters = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLocalSearch("");
    clearValues();
  };

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, DEBOUNCE_DELAY),
    [handleSearch]
  );

  const handleLocalSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedHandleSearch(e);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={className}>
      <form className="w-full p-4 overflow-visible" onSubmit={handleFormSubmit}>
        <h4>{t("search_container.title")}</h4>
        <div className="grid gap-y-4 lg:grid-cols-2 lg:items-center lg:gap-x-4 xl:grid-cols-3">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            labelText={t("search_container.search")}
            handleChange={handleLocalSearchChange}
            disabled={isFormDisabled}
          />

          <FormRowSelect
            disabled={isFormDisabled}
            name="sort"
            value={sort}
            labelText={t("search_container.sort")}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <PlaylistSelector disabled={isFormDisabled} />

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
    </section>
  );
};

export default SearchContainer;
