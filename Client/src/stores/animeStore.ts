import { create } from "zustand";
import { SORT_OPTIONS } from "../utils/constants";

export type FilterField = "search" | "searchStatus" | "searchStared" | "searchType" | "sort";

/**
 * UI state for the anime collection filters. Server data (animes, Kitsu
 * results, mutations) lives in TanStack Query — see src/queries/.
 */
interface AnimeStore {
  page: number;
  search: string;
  searchStatus: string;
  searchStared: string;
  searchType: string;
  sort: string;
  sortOptions: { title: string; value: string }[];
  /** When on, the playlist shows only anime available on the user's streaming services */
  streamingOnly: boolean;
  handleChange: (params: { name: FilterField; value: string }) => void;
  clearValues: () => void;
  changePage: (page: number) => void;
  toggleStreamingOnly: () => void;
}

export const useAnimeStore = create<AnimeStore>((set) => ({
  page: 1,
  search: "",
  searchStatus: "all",
  searchStared: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: SORT_OPTIONS,
  streamingOnly: false,

  handleChange: ({ name, value }: { name: FilterField; value: string }) => {
    set({ page: 1, [name]: value });
  },

  clearValues: () => {
    set({
      page: 1,
      search: "",
      searchStatus: "all",
      searchType: "all",
      searchStared: "all",
      sort: "latest",
    });
  },

  changePage: (page) => {
    set({ page });
  },

  toggleStreamingOnly: () => {
    set((state) => ({ streamingOnly: !state.streamingOnly }));
  },
}));
