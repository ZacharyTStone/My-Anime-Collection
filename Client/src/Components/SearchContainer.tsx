import { useState, useCallback, useMemo, type ChangeEvent, type MouseEvent, type FormEvent } from "react";
import { FormRow, FormRowSelect, PlaylistSelector } from "./UI";
import { Button } from "@/Components/UI/button";
import { useAnimeSelector, usePlaylistSelector } from "../stores/hooks";
import type { FilterField } from "../stores/animeStore";
import { useAnimesQuery } from "../queries/animes";
import { usePlaylistsQuery } from "../queries/playlists";

import { useTranslation } from "react-i18next";
import { debounce } from "../utils/debounce";

interface SearchContainerProps {
  className?: string;
}

const DEBOUNCE_DELAY = 300;

const SearchContainer = ({ className }: SearchContainerProps) => {
  const { t } = useTranslation();
  const {
    page,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
    sortOptions,
    handleChange,
    clearValues,
  } = useAnimeSelector((s) => ({
    page: s.page,
    search: s.search,
    searchStatus: s.searchStatus,
    searchType: s.searchType,
    searchStared: s.searchStared,
    sort: s.sort,
    sortOptions: s.sortOptions,
    handleChange: s.handleChange,
    clearValues: s.clearValues,
  }));

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));

  const { isFetching: isFetchingAnimes } = useAnimesQuery(currentPlaylist.id, {
    page,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
  });
  const { isFetching: isFetchingPlaylists } = usePlaylistsQuery();

  const [localSearch, setLocalSearch] = useState(search ?? "");

  const isFormDisabled = isFetchingAnimes || isFetchingPlaylists;

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChange({ name: e.target.name as FilterField, value: e.target.value });
    },
    [handleChange]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      handleChange({ name: "sort", value });
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
      <form
        className="w-full rounded-lg border bg-card p-6 shadow-sm"
        onSubmit={handleFormSubmit}
      >
        <h4 className="mb-4">{t("search_container.title")}</h4>
        <div className="grid gap-y-2 lg:grid-cols-2 lg:items-end lg:gap-x-4 xl:grid-cols-4">
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
            handleChange={handleSortChange}
            list={sortOptions}
          />

          <PlaylistSelector disabled={isFormDisabled} />

          <Button
            type="button"
            variant="destructive"
            className="mb-4 w-full self-end"
            onClick={handleResetFilters}
            disabled={isFormDisabled}
          >
            {t("search_container.clear_filters")}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchContainer;
