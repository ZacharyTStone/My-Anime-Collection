import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormRow, FormRowSelect, SkeletonLoadingBlock } from "../../Components/UI";
import { FetchedAnimesContainer } from "../../Components";
import { usePlaylistStore } from "../../stores/playlistStore";
import { useShallow } from "zustand/react/shallow";
import { debounce } from "../../utils/debounce";
import { cn } from "../../utils/cn";

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
  } = usePlaylistStore(
    useShallow((s) => ({
      getPlaylists: s.getPlaylists,
      currentPlaylist: s.currentPlaylist,
      userPlaylists: s.userPlaylists,
      handlePlaylistChange: s.handlePlaylistChange,
      loadingFetchPlaylists: s.loadingFetchPlaylists,
    }))
  );

  const debouncedRequest = useMemo(
    () => debounce((value: string) => setSearchText(value), 500),
    []
  );

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
    <section className="rounded-default w-full bg-white px-8 pt-12 pb-16 shadow-md">
      <main className="content full-page">
        <form
          className="w-full p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3>{t("add_anime.title")}</h3>
          <div className="grid gap-y-4 lg:grid-cols-2 lg:items-center lg:gap-x-4 xl:grid-cols-3">
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
            <div>
              <label
                htmlFor="playlist"
                className="block text-sm mb-2 font-medium tracking-wide text-grey-700"
              >
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
                  className={cn(
                    "w-full px-3 py-2.5 rounded-default bg-white border border-grey-300",
                    "text-grey-900 text-[0.95rem] min-h-[42px] appearance-none transition-all",
                    "focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-500/12"
                  )}
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
          filter={true}
          pagination={true}
          sort={sort}
        />
      </main>
    </section>
  );
};

export default AddAnime;
