import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { SORT_OPTIONS } from "../utils/constants";
import { ExpectedFetchedAnimeResponse, AiRecommendation } from "../utils/types";
import { apiClient } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";

export interface Anime {
  _id: string;
  title: string;
  rating: number;
  episodeCount: number;
  format: string;
  creationDate: string;
  synopsis: string;
  coverImage: string;
  type: string;
  japanese_title: string;
  youtubeVideoId: string;
  fetchedAnime: ExpectedFetchedAnimeResponse;
  __v: number;
}

export type FilterField = "search" | "searchStatus" | "searchStared" | "searchType" | "sort";

interface AnimeStore {
  loadingMyAnimes: boolean;
  loadingItemIds: string[];
  animes: Anime[];
  totalAnimes: number;
  numOfPages: number;
  page: number;
  search: string;
  searchStatus: string;
  searchStared: string;
  searchType: string;
  sort: string;
  sortOptions: { title: string; value: string }[];
  fetchedAnimes: ExpectedFetchedAnimeResponse[];
  totalFetchedAnimes: number;
  numOfFetchedAnimesPages: number;
  loadingFetchAnimes: boolean;
  handleChange: (params: { name: FilterField; value: string }) => void;
  clearValues: () => void;
  createAnime: (anime: ExpectedFetchedAnimeResponse, playlistID: string) => Promise<void>;
  getAnimes: (playlistId: string) => Promise<void>;
  deleteAnime: (animeId: string, playlistId: string) => Promise<void>;
  clearFilters: () => void;
  changePage: (page: number) => void;
  resetFetchedAnimes: () => void;
  fetchAnimes: (params: {
    page: number;
    baseURL: string;
    filter: boolean;
    searchText: string;
    pagination: boolean;
    sort: string;
  }) => Promise<void>;
  getAiRecommendations: (title: string, synopsis: string) => Promise<AiRecommendation[]>;
  isItemLoading: (id: string) => boolean;
}

let getAnimesController: AbortController | null = null;
let fetchAnimesController: AbortController | null = null;

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  loadingMyAnimes: false,
  loadingItemIds: [],
  animes: [],
  totalAnimes: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchStatus: "all",
  searchStared: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: SORT_OPTIONS,
  fetchedAnimes: [],
  totalFetchedAnimes: 0,
  numOfFetchedAnimesPages: 0,
  loadingFetchAnimes: false,

  isItemLoading: (id: string) => get().loadingItemIds.includes(id),

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

  createAnime: async (anime, playlistID) => {
    const { user } = useAuthStore.getState();
    if (!useAuthStore.getState().token) return;

    const itemId = anime.id || crypto.randomUUID();
    set((s) => ({ loadingItemIds: [...s.loadingItemIds, itemId] }));
    try {
      const creationDate = anime.attributes?.startDate;
      const title =
        anime.attributes?.titles?.en ||
        anime.attributes?.titles?.en_jp ||
        anime.attributes?.canonicalTitle ||
        "Title N/A";
      const rating = anime.attributes?.averageRating || "N/A";
      const format = anime.attributes?.subtype || "N/A";
      const episodeCount = anime.attributes?.episodeCount ?? null;
      const synopsis = anime.attributes?.synopsis || "N/A";
      const coverImage = anime.attributes?.posterImage?.small || "N/A";
      const youtubeVideoId = anime.attributes?.youtubeVideoId || "N/A";
      const japanese_title =
        anime.attributes?.titles?.ja_jp ||
        anime.attributes?.titles?.en_jp ||
        anime.attributes?.canonicalTitle ||
        "Title N/A";
      const isDemoAnime = user?.isDemo === true;

      await apiClient.post("/animes", {
        title, id: itemId, rating, format, episodeCount, synopsis,
        coverImage, creationDate, youtubeVideoId, japanese_title,
        playlistID, isDemoAnime,
      });
      toast.success("Anime Created!");
    } catch (error: unknown) {
      handleApiError(error, "An error occurred while adding the anime");
    } finally {
      set((s) => ({ loadingItemIds: s.loadingItemIds.filter((id) => id !== itemId) }));
    }
  },

  getAnimes: async (playlistId) => {
    if (!useAuthStore.getState().token) return;

    getAnimesController?.abort();
    getAnimesController = new AbortController();

    const { page, search, searchStatus, searchType, searchStared, sort } = get();
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("status", searchStatus);
    params.set("type", searchType);
    params.set("stared", searchStared);
    params.set("sort", sort);
    params.set("currentPlaylistID", playlistId);
    if (search) {
      params.set("search", search);
    }

    set({ loadingMyAnimes: true });
    try {
      const { data } = await apiClient.get(`/animes?${params.toString()}`, {
        signal: getAnimesController.signal,
      });
      set({
        loadingMyAnimes: false,
        animes: data.animes,
        totalAnimes: data.totalAnimes,
        numOfPages: data.numOfPages,
      });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ loadingMyAnimes: false });
      handleApiError(error, "Failed to fetch animes");
    }
  },

  deleteAnime: async (animeId, playlistId) => {
    if (!useAuthStore.getState().token) return;

    set((s) => ({ loadingItemIds: [...s.loadingItemIds, animeId] }));
    try {
      await apiClient.delete(`/animes/${animeId}`);
      toast.success("Anime Deleted!");
      get().getAnimes(playlistId);
    } catch (error: unknown) {
      handleApiError(error, "Failed to delete anime");
    } finally {
      set((s) => ({ loadingItemIds: s.loadingItemIds.filter((id) => id !== animeId) }));
    }
  },

  clearFilters: () => {
    set({
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    });
  },

  changePage: (page) => {
    set({ page });
  },

  resetFetchedAnimes: () => {
    set({
      fetchedAnimes: [],
      totalFetchedAnimes: 0,
      numOfFetchedAnimesPages: 0,
    });
  },

  fetchAnimes: async ({ page, baseURL, searchText, sort }) => {
    fetchAnimesController?.abort();
    fetchAnimesController = new AbortController();

    set({ loadingFetchAnimes: true });
    try {
      const limit = 18;
      let url = baseURL;

      if (baseURL.includes("/trending/")) {
        const offset = Math.max(0, (page - 1) * limit);
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        params.set("offset", String(offset));
        url = `${baseURL}?${params.toString()}`;
      } else {
        const offset = Math.max(0, (page - 1) * limit);
        const params = new URLSearchParams();
        params.set("page[limit]", String(limit));
        params.set("page[offset]", String(offset));
        if (searchText) {
          params.set("filter[text]", searchText);
        }
        if (sort) {
          params.set("sort", sort);
        }
        url = `${baseURL}?${params.toString()}`;
      }

      const { data } = await axios.get(url, {
        signal: fetchAnimesController.signal,
      });
      const animes = data?.data ?? [];
      const totalAnimes = data?.meta?.count ?? animes.length;
      const numOfPages = Math.max(1, Math.ceil(totalAnimes / limit));
      set({
        loadingFetchAnimes: false,
        fetchedAnimes: animes,
        totalFetchedAnimes: totalAnimes,
        numOfFetchedAnimesPages: numOfPages,
      });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ loadingFetchAnimes: false });
      handleApiError(error, "Failed to fetch animes");
    }
  },

  getAiRecommendations: async (title, synopsis) => {
    const { data } = await apiClient.post("/animes/recommendations", { title, synopsis });
    return data.recommendations as AiRecommendation[];
  },
}));
