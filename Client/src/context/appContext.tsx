import React, {
  useReducer,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import reducer from "./reducer";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

import { ACTIONS } from "./actions";
import { SORT_OPTIONS } from "../utils/constants";

// Types and Interfaces
interface User {
  id: string;
  username: string;
  email: string;
}

interface LoadingData {
  anime_id: string;
}

interface Playlist {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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

interface AppState {
  isLoading: boolean;
  loadingData: LoadingData;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  animes: Anime[];
  totalAnimes: number;
  numOfPages: number;
  page: number;
  search: string;
  searchStatus: string;
  searchStared: string;
  searchType: string;
  sort: string;
  currentPlaylist: Playlist;
  userPlaylists: Playlist[];
  sortOptions: any[];
  siteLanguage: string;
  fetchedAnimes: FetchedAnime[];
  totalFetchedAnimes: number;
  numOfFetchedAnimesPages: number;
  loadingFetchAnimes: boolean;
  loadingFetchPlaylists: boolean;
}

interface AppContextType extends AppState {
  displayAlert: () => void;
  clearAlert: () => void;
  setupUser: (params: {
    currentUser: User;
    endPoint: string;
    alertText: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (currentUser: User) => Promise<void>;
  deleteUser: (currentUser: User) => Promise<void>;
  handleChange: (params: { name: string; value: string }) => void;
  handlePlaylistChange: (params: { value: string }) => void;
  clearValues: () => void;
  createAnime: (anime: any, playlistID: string) => Promise<void>;
  getAnimes: () => Promise<void>;
  deleteAnime: (animeId: string) => Promise<void>;
  clearFilters: () => void;
  changePage: (page: number) => void;
  getPlaylists: () => Promise<void>;
  createPlaylist: (playlistTitle: string) => Promise<void>;
  updatePlaylist: (playlist: Playlist) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  resetFetchedAnimes: () => void;
  fetchAnimes: (params: {
    page: number;
    baseURL: string;
    filter: string;
    searchText: string;
    pagination: boolean;
    sort: string;
  }) => Promise<void>;
  changeSiteLanguage: (lang: string) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

// Constants
const TOKEN_KEY = "token";
const USER_KEY = "user";
const API_BASE_URL = "/api/v1";

// Initial state
const getInitialState = (): AppState => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);

  return {
    isLoading: false,
    loadingData: {
      anime_id: "",
    },
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token,
    animes: [],
    totalAnimes: 0,
    numOfPages: 1,
    page: 1,
    search: "",
    searchStatus: "all",
    searchStared: "all",
    searchType: "all",
    sort: "latest",
    currentPlaylist: {
      id: "2",
      title: "",
      userId: "",
      createdAt: "",
      updatedAt: "",
    },
    userPlaylists: [],
    sortOptions: SORT_OPTIONS,
    siteLanguage: "en",
    fetchedAnimes: [],
    totalFetchedAnimes: 0,
    numOfFetchedAnimesPages: 0,
    loadingFetchAnimes: false,
    loadingFetchPlaylists: false,
  };
};

// Context
const AppContext = React.createContext<AppContextType | undefined>(undefined);

/**
 * AppProvider component that manages global application state
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [state, dispatch] = useReducer(reducer, getInitialState());

  // Create axios instance with interceptors
  const createAxiosInstance = useCallback(
    (token: string | null): AxiosInstance => {
      const instance = axios.create({
        baseURL: API_BASE_URL,
      });

      instance.interceptors.request.use(
        (config) => {
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        }
      );

      instance.interceptors.response.use(
        (response: AxiosResponse) => {
          return response;
        },
        (error: AxiosError) => {
          if (error.response?.status === 401) {
            logoutUser();
          }
          return Promise.reject(error);
        }
      );

      return instance;
    },
    []
  );

  // Memoized axios instance
  const authFetch = useMemo(
    () => createAxiosInstance(state.token),
    [state.token, createAxiosInstance]
  );

  // Utility functions
  const addUserToLocalStorage = useCallback(
    ({ user, token }: { user: User; token: string }) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    },
    []
  );

  const removeUserFromLocalStorage = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  // Alert functions
  const displayAlert = useCallback(() => {
    dispatch({ type: ACTIONS.DISPLAY_ALERT, payload: {} });
    clearAlert();
  }, []);

  const clearAlert = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ALERT, payload: {} });
    }, 3000);
  }, []);

  // User management functions
  const setupUser = useCallback(
    async ({
      currentUser,
      endPoint,
      alertText,
    }: {
      currentUser: User;
      endPoint: string;
      alertText: string;
    }) => {
      try {
        const { data } = await authFetch.post(endPoint, currentUser);
        const { user, token } = data;
        addUserToLocalStorage({ user, token });
        dispatch({
          type: ACTIONS.SETUP_USER_SUCCESS,
          payload: { user, token },
        });
        toast.success(alertText);
      } catch (error: any) {
        dispatch({
          type: ACTIONS.SETUP_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
        toast.error(error.response.data.msg);
      }
      clearAlert();
    },
    [authFetch, addUserToLocalStorage, clearAlert]
  );

  const logoutUser = useCallback(async () => {
    removeUserFromLocalStorage();
    dispatch({ type: ACTIONS.LOGOUT_USER, payload: {} });
  }, [removeUserFromLocalStorage]);

  const updateUser = useCallback(
    async (currentUser: User) => {
      try {
        const { data } = await authFetch.patch("/auth/updateUser", currentUser);
        const { user, token } = data;
        addUserToLocalStorage({ user, token });
        dispatch({
          type: ACTIONS.UPDATE_USER_SUCCESS,
          payload: { user, token },
        });
        toast.success("User Updated!");
      } catch (error: any) {
        if (error.response.status !== 401) {
          dispatch({
            type: ACTIONS.UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
          toast.error(error.response.data.msg);
        }
      }
      clearAlert();
    },
    [authFetch, addUserToLocalStorage, clearAlert]
  );

  const deleteUser = useCallback(
    async (currentUser: User) => {
      try {
        await authFetch.delete("/auth/deleteUser");
        logoutUser();
        toast.success("User Deleted!");
      } catch (error: any) {
        if (error.response.status !== 401) {
          dispatch({
            type: ACTIONS.DELETE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
          toast.error(error.response.data.msg);
        }
      }
      clearAlert();
    },
    [authFetch, logoutUser, clearAlert]
  );

  // Form handling functions
  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
    },
    []
  );

  const handlePlaylistChange = useCallback(({ value }: { value: string }) => {
    dispatch({
      type: ACTIONS.HANDLE_PLAYLIST_CHANGE,
      payload: { value },
    });
  }, []);

  const clearValues = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_VALUES, payload: {} });
  }, []);

  // Anime management functions
  const createAnime = useCallback(
    async (anime: any, playlistID: string) => {
      dispatch({ type: ACTIONS.CREATE_ANIME_BEGIN, payload: {} });
      try {
        const { data } = await authFetch.post("/animes", {
          ...anime,
          playlistID,
        });
        dispatch({
          type: ACTIONS.CREATE_ANIME_SUCCESS,
          payload: { anime: data.anime },
        });
        toast.success("Anime Created!");
      } catch (error: any) {
        if (error.response.status === 401) return;
        dispatch({
          type: ACTIONS.CREATE_ANIME_ERROR,
          payload: { msg: error.response.data.msg },
        });
        toast.error(error.response.data.msg);
      }
      clearAlert();
    },
    [authFetch, clearAlert]
  );

  const getAnimes = useCallback(async () => {
    const {
      page,
      search,
      searchStatus,
      searchType,
      searchStared,
      sort,
      currentPlaylist,
    } = state;
    let url = `/animes?page=${page}&status=${searchStatus}&type=${searchType}&stared=${searchStared}&sort=${sort}&playlistId=${currentPlaylist.id}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: ACTIONS.GET_ANIMES_BEGIN, payload: {} });
    try {
      const { data } = await authFetch(url);
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
      logoutUser();
    }
    clearAlert();
  }, [
    state.page,
    state.search,
    state.searchStatus,
    state.searchType,
    state.searchStared,
    state.sort,
    state.currentPlaylist.id,
    authFetch,
    logoutUser,
    clearAlert,
  ]);

  const deleteAnime = useCallback(
    async (animeId: string) => {
      dispatch({ type: ACTIONS.DELETE_ANIME_BEGIN, payload: {} });
      try {
        await authFetch.delete(`/animes/${animeId}`);
        getAnimes();
        toast.success("Anime Deleted!");
      } catch (error: any) {
        logoutUser();
      }
    },
    [authFetch, getAnimes, logoutUser]
  );

  const clearFilters = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS, payload: {} });
  }, []);

  const changePage = useCallback((page: number) => {
    dispatch({ type: ACTIONS.CHANGE_PAGE, payload: { page } });
  }, []);

  // Playlist management functions
  const getPlaylists = useCallback(async () => {
    dispatch({ type: ACTIONS.GET_PLAYLIST_BEGIN, payload: {} });
    try {
      const { data } = await authFetch("/playlists");
      const { playlists } = data;
      dispatch({
        type: ACTIONS.GET_PLAYLIST_SUCCESS,
        payload: { playlists },
      });
    } catch (error: any) {
      logoutUser();
    }
    clearAlert();
  }, [authFetch, logoutUser, clearAlert]);

  const createPlaylist = useCallback(
    async (playlistTitle: string) => {
      dispatch({ type: ACTIONS.CREATE_PLAYLIST_BEGIN, payload: {} });
      try {
        const { data } = await authFetch.post("/playlists", {
          title: playlistTitle,
        });
        const { playlist } = data;
        dispatch({
          type: ACTIONS.CREATE_PLAYLIST_SUCCESS,
          payload: { playlist },
        });
        toast.success("Playlist Created!");
      } catch (error: any) {
        if (error.response.status === 401) return;
        dispatch({
          type: ACTIONS.CREATE_PLAYLIST_ERROR,
          payload: { msg: error.response.data.msg },
        });
        toast.error(error.response.data.msg);
      }
      clearAlert();
    },
    [authFetch, clearAlert]
  );

  const updatePlaylist = useCallback(
    async (playlist: Playlist) => {
      dispatch({ type: ACTIONS.UPDATE_PLAYLIST_BEGIN, payload: {} });
      try {
        const { data } = await authFetch.patch(
          `/playlists/${playlist.id}`,
          playlist
        );
        const { updatedPlaylist } = data;
        dispatch({
          type: ACTIONS.UPDATE_PLAYLIST_SUCCESS,
          payload: { playlist: updatedPlaylist },
        });
        toast.success("Playlist Updated!");
      } catch (error: any) {
        if (error.response.status === 401) return;
        dispatch({
          type: ACTIONS.UPDATE_PLAYLIST_ERROR,
          payload: { msg: error.response.data.msg },
        });
        toast.error(error.response.data.msg);
      }
      clearAlert();
    },
    [authFetch, clearAlert]
  );

  const deletePlaylist = useCallback(
    async (playlistId: string) => {
      dispatch({ type: ACTIONS.DELETE_PLAYLIST_BEGIN, payload: {} });
      try {
        await authFetch.delete(`/playlists/${playlistId}`);
        getPlaylists();
        toast.success("Playlist Deleted!");
      } catch (error: any) {
        logoutUser();
      }
    },
    [authFetch, getPlaylists, logoutUser]
  );

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
        let url = `${baseURL}?page=${page}&filter=${filter}&sort=${sort}`;
        if (searchText) {
          url = url + `&search=${searchText}`;
        }
        if (pagination) {
          url = url + `&pagination=true`;
        }
        const { data } = await axios.get(url);
        const { animes, totalAnimes, numOfPages } = data;
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
      clearAlert();
    },
    [clearAlert]
  );

  // Language functions
  const changeSiteLanguage = useCallback(
    (lang: string) => {
      dispatch({
        type: ACTIONS.CHANGE_SITE_LANGUAGE,
        payload: lang,
      });
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      displayAlert,
      clearAlert,
      setupUser,
      logoutUser,
      updateUser,
      deleteUser,
      handleChange,
      handlePlaylistChange,
      clearValues,
      createAnime,
      getAnimes,
      deleteAnime,
      clearFilters,
      changePage,
      getPlaylists,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      resetFetchedAnimes,
      fetchAnimes,
      changeSiteLanguage,
    }),
    [
      state,
      displayAlert,
      clearAlert,
      setupUser,
      logoutUser,
      updateUser,
      deleteUser,
      handleChange,
      handlePlaylistChange,
      clearValues,
      createAnime,
      getAnimes,
      deleteAnime,
      clearFilters,
      changePage,
      getPlaylists,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      resetFetchedAnimes,
      fetchAnimes,
      changeSiteLanguage,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

/**
 * Custom hook to use app context
 * @throws {Error} When used outside of AppProvider
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
