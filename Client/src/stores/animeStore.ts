import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { SORT_OPTIONS } from "../utils/constants";
import { ExpectedFetchedAnimeResponse } from "../utils/types";

// Types
interface LoadingData {
  anime_id: string;
}

interface Anime {
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

interface FetchedAnime {
  id: string;
  title: string;
}

interface AnimeStore {
  isLoading: boolean;
  loadingData: LoadingData;
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
  fetchedAnimes: FetchedAnime[];
  totalFetchedAnimes: number;
  numOfFetchedAnimesPages: number;
  loadingFetchAnimes: boolean;
  handleChange: (params: { name: string; value: string }) => void;
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
    filter: string;
    searchText: string;
    pagination: boolean;
    sort: string;
  }) => Promise<void>;
}

const API_BASE_URL = "/api/v1";

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  isLoading: false,
  loadingData: { anime_id: "" },
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

  handleChange: ({ name, value }) => {
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
    const { token, user } = useAuthStore.getState();
    if (!token) return;

    set({ isLoading: true, loadingData: { anime_id: anime.id || "" } });
    try {
      const creationDate = anime.attributes?.startDate;
      const title =
        anime.attributes?.titles?.en ||
        anime.attributes?.titles?.en_jp ||
        anime.attributes?.canonicalTitle ||
        "Title N/A";
      const id = anime.id || Math.random() * 100000;
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
      const isDemoAnime = (user as any)?.isDemo === true;

      await axios.post(
        `${API_BASE_URL}/animes`,
        {
          title, id, rating, format, episodeCount, synopsis,
          coverImage, creationDate, youtubeVideoId, japanese_title,
          playlistID, isDemoAnime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ isLoading: false });
      toast.success("Anime Created!");
    } catch (error: any) {
      set({ isLoading: false });
      if (error.response?.status === 401) return;
      toast.error(error.response?.data?.msg || "An error occurred while adding the anime");
    }
  },

  getAnimes: async (playlistId) => {
    const { token } = useAuthStore.getState();
    if (!token) return;

    const { page, search, searchStatus, searchType, searchStared, sort } = get();
    let url = `${API_BASE_URL}/animes?page=${page}&status=${searchStatus}&type=${searchType}&stared=${searchStared}&sort=${sort}&currentPlaylistID=${playlistId}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    set({ isLoading: true });
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        isLoading: false,
        animes: data.animes,
        totalAnimes: data.totalAnimes,
        numOfPages: data.numOfPages,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  deleteAnime: async (animeId, playlistId) => {
    const { token } = useAuthStore.getState();
    if (!token) return;

    set({ isLoading: true });
    try {
      await axios.delete(`${API_BASE_URL}/animes/${animeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ isLoading: false });
      toast.success("Anime Deleted!");
      get().getAnimes(playlistId);
    } catch {
      set({ isLoading: false });
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

  fetchAnimes: async ({ page, baseURL, filter: _filter, searchText, pagination: _pagination, sort }) => {
    set({ isLoading: true, loadingFetchAnimes: true });
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

      const { data } = await axios.get(url);
      const animes = data?.data ?? [];
      const totalAnimes = data?.meta?.count ?? animes.length;
      const numOfPages = Math.max(1, Math.ceil(totalAnimes / limit));
      set({
        isLoading: false,
        loadingFetchAnimes: false,
        fetchedAnimes: animes,
        totalFetchedAnimes: totalAnimes,
        numOfFetchedAnimesPages: numOfPages,
      });
    } catch {
      set({ isLoading: false, loadingFetchAnimes: false });
    }
  },
}));
