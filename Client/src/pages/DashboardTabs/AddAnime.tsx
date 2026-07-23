import { useState, useMemo, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { FormRow, FormRowSelect, PlaylistSelector } from "../../Components/UI";
import { FetchedAnimesContainer } from "../../Components";
import { debounce } from "../../utils/debounce";

const SORT_OPTIONS = [
  {
    title: "popularity",
    value: "default",
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

const AddAnime = () => {
  const { t } = useTranslation();
  const [textInput, setTextInput] = useState<string>("");
  const [sort, setSort] = useState<string>("default");
  const [searchText, setSearchText] = useState<string>("");

  const debouncedRequest = useMemo(
    () => debounce((value: string) => setSearchText(value), 500),
    []
  );

  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const apiValue = value.replace(/\s/g, "+");
    setTextInput(value);
    debouncedRequest(apiValue);
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  return (
    <section className="w-full rounded-xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
      <main>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3 className="mb-6">{t("add_anime.title")}</h3>
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
            <PlaylistSelector />
          </div>
        </form>
        <FetchedAnimesContainer
          searchText={searchText}
          baseURL="https://kitsu.io/api/edge/anime"
          filter={true}
          pagination={true}
          sort={sort === "default" ? "" : sort}
        />
      </main>
    </section>
  );
};

export default AddAnime;
