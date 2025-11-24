import React, {
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ACTIONS } from "./actions";
import { SORT_OPTIONS } from "../utils/constants";
import { useAuthContext } from "./AuthContext";


// Types and Interfaces
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
  fetchedAnime: any; // TODO: Define proper type
  __v: number;
}

interface FetchedAnime {
  id: string;
  title: string;
  // Add other properties as needed
}

interface AnimeState {
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
  sortOptions: any[];
  fetchedAnimes: FetchedAnime[];
  totalFetchedAnimes: number;
  numOfFetchedAnimesPages: number;
  loadingFetchAnimes: boolean;
}

interface AnimeContextType extends AnimeState {
  handleChange: (params: { name: string; value: string }) => void;
  clearValues: () => void;
  createAnime: (anime: any, playlistID: string) => Promise<void>;
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

interface AnimeProviderProps {
  children: React.ReactNode;
}

// Constants
const API_BASE_URL = "/api/v1";

// Initial state
const getInitialAnimeState = (): AnimeState => {
  return {
    isLoading: false,
    loadingData: {
      anime_id: "",
    },
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
  };
};

export const initialAnimeState = getInitialAnimeState();

// Anime reducer
const animeReducer = (state: AnimeState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTIONS.HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    case ACTIONS.CLEAR_VALUES:
      return {
        ...state,
        page: 1,
        search: "",
        searchStatus: "all",
        searchType: "all",
        searchStared: "all",
        sort: "latest",
      };
    case ACTIONS.CREATE_ANIME_BEGIN:
      return {
        ...state,
        isLoading: true,
        loadingData: {
          ...state.loadingData,
          anime_id: action.payload?.id || "",
        },
      };
    case ACTIONS.CREATE_ANIME_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.CREATE_ANIME_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.GET_ANIMES_BEGIN:
      return { ...state, isLoading: true };
    case ACTIONS.GET_ANIMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        animes: action.payload.animes,
        totalAnimes: action.payload.totalAnimes,
        numOfPages: action.payload.numOfPages,
      };
    case ACTIONS.GET_ANIMES_ERROR:
      return { ...state, isLoading: false };
    case ACTIONS.DELETE_ANIME_BEGIN:
      return { ...state, isLoading: true };
    case ACTIONS.DELETE_ANIME_SUCCESS:
      return { ...state, isLoading: false };
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };
    case ACTIONS.CHANGE_PAGE:
      return { ...state, page: action.payload.page };
    case ACTIONS.FETCH_ANIMES_BEGIN:
      return { ...state, isLoading: true, loadingFetchAnimes: true };
    case ACTIONS.FETCH_ANIMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingFetchAnimes: false,
        fetchedAnimes: action.payload.animes,
        totalFetchedAnimes: action.payload.totalAnimes,
        numOfFetchedAnimesPages: action.payload.numOfPages,
      };
    case ACTIONS.RESET_FETCHED_ANIMES:
      return {
        ...state,
        fetchedAnimes: [],
        totalFetchedAnimes: 0,
        numOfFetchedAnimesPages: 0,
      };
    case ACTIONS.FETCH_ANIMES_ERROR:
      return {
        ...state,
        isLoading: false,
        loadingFetchAnimes: false,
      };
    default:
      return state;
  }
};

// Context
const AnimeContext = React.createContext<AnimeContextType | undefined>(undefined);

/**
 * AnimeProvider component that manages anime-related state
 */
export const AnimeProvider: React.FC<AnimeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(animeReducer, getInitialAnimeState());
  const { token, user } = useAuthContext();

  // Form handling functions
  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
    },
    []
  );

  const clearValues = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_VALUES, payload: {} });
  }, []);

  // Anime management functions
  const createAnime = useCallback(
    async (anime: any, playlistID: string) => {
      if (!token) return;
      
      dispatch({ type: ACTIONS.CREATE_ANIME_BEGIN, payload: {} });
      try {
        // Extract fields from anime object like the old appContext.js did
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

        const { data } = await axios.post(`${API_BASE_URL}/animes`, {
          title,
          id,
          rating,
          format,
          episodeCount,
          synopsis,
          coverImage,
          creationDate,
          youtubeVideoId,
          japanese_title,
          playlistID,
          isDemoAnime,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: ACTIONS.CREATE_ANIME_SUCCESS,
          payload: { anime: data.anime },
        });
        toast.success("Anime Created!");
      } catch (error: any) {
        if (error.response?.status === 401) return;
        dispatch({
          type: ACTIONS.CREATE_ANIME_ERROR,
          payload: { msg: error.response?.data?.msg || "An error occurred while adding the anime" },
        });
        toast.error(error.response?.data?.msg || "An error occurred while adding the anime");
      }
    },
    [token, user]
  );

  const getAnimes = useCallback(async (playlistId: string) => {
    if (!token) return;
    
    const {
      page,
      search,
      searchStatus,
      searchType,
      searchStared,
      sort,
    } = state;
    
    let url = `${API_BASE_URL}/animes?page=${page}&status=${searchStatus}&type=${searchType}&stared=${searchStared}&sort=${sort}&playlistId=${playlistId}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    
    dispatch({ type: ACTIONS.GET_ANIMES_BEGIN, payload: {} });
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { animes, totalAnimes, numOfPages } = data;
      dispatch({
        type: ACTIONS.GET_ANIMES_SUCCESS,
        payload: {
          animes,
          totalAnimes,
          numOfPages,
        },
      });
    } catch (error: any) {
      dispatch({
        type: ACTIONS.GET_ANIMES_ERROR,
        payload: { msg: error.response?.data?.msg || "Error fetching animes" },
      });
    }
  }, [state.page, state.search, state.searchStatus, state.searchType, state.searchStared, state.sort, token]);

  const deleteAnime = useCallback(
    async (animeId: string, playlistId: string) => {
      if (!token) return;
      
      dispatch({ type: ACTIONS.DELETE_ANIME_BEGIN, payload: {} });
      try {
        await axios.delete(`${API_BASE_URL}/animes/${animeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAnimes(playlistId);
        toast.success("Anime Deleted!");
      } catch (error: any) {
        dispatch({
          type: ACTIONS.DELETE_ANIME_ERROR,
          payload: { msg: error.response?.data?.msg || "Error deleting anime" },
        });
      }
    },
    [getAnimes, token]
  );

  const clearFilters = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS, payload: {} });
  }, []);

  const changePage = useCallback((page: number) => {
    dispatch({ type: ACTIONS.CHANGE_PAGE, payload: { page } });
  }, []);

  // Fetched animes functions
  const resetFetchedAnimes = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FETCHED_ANIMES, payload: {} });
  }, []);

  const fetchAnimes = useCallback(
    async ({
      page,
      baseURL,
      filter,
      searchText,
      pagination,
      sort,
    }: {
      page: number;
      baseURL: string;
      filter: string;
      searchText: string;
      pagination: boolean;
      sort: string;
    }) => {
      dispatch({ type: ACTIONS.FETCH_ANIMES_BEGIN, payload: {} });
      try {
        const limit = 18;
        let url = baseURL;

        // Build Kitsu-compatible query params
        if (baseURL.includes("/trending/")) {
          // Trending endpoint: uses limit/offset
          const offset = Math.max(0, (page - 1) * limit);
          const params = new URLSearchParams();
          params.set("limit", String(limit));
          params.set("offset", String(offset));
          url = `${baseURL}?${params.toString()}`;
        } else {
          // Search endpoint: /anime with JSON:API style params
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
        dispatch({
          type: ACTIONS.FETCH_ANIMES_SUCCESS,
          payload: {
            animes,
            totalAnimes,
            numOfPages,
          },
        });
      } catch (error: any) {
        dispatch({
          type: ACTIONS.FETCH_ANIMES_ERROR,
          payload: {
            msg: error.response?.data?.msg || "Error fetching animes",
          },
        });
      }
    },
    []
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      handleChange,
      clearValues,
      createAnime,
      getAnimes,
      deleteAnime,
      clearFilters,
      changePage,
      resetFetchedAnimes,
      fetchAnimes,
    }),
    [
      state,
      handleChange,
      clearValues,
      createAnime,
      getAnimes,
      deleteAnime,
      clearFilters,
      changePage,
      resetFetchedAnimes,
      fetchAnimes,
    ]
  );

  return (
    <AnimeContext.Provider value={contextValue}>{children}</AnimeContext.Provider>
  );
};

/**
 * Custom hook to use anime context
 * @throws {Error} When used outside of AnimeProvider
 */
export const useAnimeContext = (): AnimeContextType => {
  const context = useContext(AnimeContext);

  if (context === undefined) {
    throw new Error("useAnimeContext must be used within an AnimeProvider");
  }

  return context;
};
