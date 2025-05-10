import React, { useReducer, useContext, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import reducer from "./reducer";
import axios from "axios";
import { toast } from "react-toastify";

import { ACTIONS } from "./actions";
import { SORT_OPTIONS } from "../utils/constants";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,

  loadingdata: {
    anime_id: "",
  },
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  theme: "light",
  token: token,
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
  },
  userPlaylists: [],
  sortOptions: SORT_OPTIONS,
  siteLanguage: "en",
  addToDefault: false,
  fetchedAnimes: [],
  totalFetchedAnimes: 0,
  numOfFetchedAnimesPages: 0,

  // specific loading queries
  loadingFetchAnimes: false,
  loadingFetchPlaylists: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const createAxiosInstance = (token) => {
    const instance = axios.create({
      baseURL: "/api/v1",
    });

    instance.interceptors.request.use(
      (config) => {
        config.headers.common["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return instance;
  };

  const { i18n } = useTranslation();

  const [state, dispatch] = useReducer(reducer, initialState);

  // axios instance with token
  const authFetch = createAxiosInstance(state.token);

  const changeDefaultPlaylistPolicy = () => {
    dispatch({
      type: ACTIONS.CHANGE_DEFAULT_PLAYLIST_POLICY,
    });
  };

  const changeSiteLanguage = (lang) => {
    dispatch({
      type: ACTIONS.CHANGE_SITE_LANGUAGE,
      payload: lang,
    });

    i18n.changeLanguage(lang);
  };

  const displayAlert = () => {
    dispatch({ type: ACTIONS.DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: ACTIONS.SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      console.log(user);
      dispatch({
        type: ACTIONS.SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
      // Redirect to top-animes page after successful login
      window.location.href = "/top-animes";
    } catch (error) {
      dispatch({
        type: ACTIONS.SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    dispatch({ type: ACTIONS.LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: ACTIONS.UPDATE_USER_BEGIN });
    try {
      const oldUser = JSON.parse(localStorage.getItem("user"));

      if (!oldUser) {
        dispatch({
          type: ACTIONS.UPDATE_USER_ERROR,
          payload: { msg: "User not found" },
        });
        return;
      }

      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token } = data;

      dispatch({
        type: ACTIONS.UPDATE_USER_SUCCESS,
        payload: { oldUser, user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ACTIONS.UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const deleteUser = async (currentUser) => {
    dispatch({ type: ACTIONS.DELETE_USER_BEGIN });
    try {
      const { data } = await authFetch.delete("/auth/deleteUser", currentUser);
      const { user, token } = data;
      dispatch({
        type: ACTIONS.DELETE_USER_SUCCESS,
        payload: { user, token },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ACTIONS.DELETE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    removeUserFromLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const handlePlaylistChange = ({ value }) => {
    // find the playlist with the name of the value
    const playlist = state.userPlaylists.find(
      (playlist) => playlist.id === value
    );

    if (!playlist) {
      alert("Playlist not found");
    } else {
      dispatch({ type: ACTIONS.HANDLE_PLAYLIST_CHANGE, payload: { playlist } });
    }
  };
  const clearValues = () => {
    dispatch({ type: ACTIONS.CLEAR_VALUES });
  };

  const createAnime = async (anime, playlistID) => {
    dispatch({ type: ACTIONS.CREATE_ANIME_BEGIN, payload: anime });

    try {
      const creationDate = anime.attributes.startDate;
      const title =
        anime.attributes.titles.en ||
        anime.attributes.titles.en_jp ||
        anime.attributes.canonicalTitle ||
        "Title N/A";
      const id = anime.id || Math.random() * 100000;
      const rating = anime.attributes.averageRating || "N/A";
      const format = anime.attributes.subtype || "N/A";
      const episodeCount = anime.attributes.episodeCount ?? null;
      const synopsis = anime.attributes.synopsis || "N/A";
      const coverImage = anime.attributes.posterImage.small || "N/A";
      const youtubeVideoId = anime.attributes.youtubeVideoId || "N/A";
      const japanese_title =
        anime.attributes.titles.ja_jp ||
        anime.attributes.titles.en_jp ||
        anime.attributes.canonicalTitle ||
        "Title N/A";

      const isDemoAnime = state.user.isDemo ? true : false;

      const playlistTitle = state.userPlaylists.find(
        (playlist) => playlist.id === playlistID
      ).title;

      await authFetch.post("/animes", {
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
      });

      dispatch({
        type: ACTIONS.CREATE_ANIME_SUCCESS,
        payload: { title, playlistTitle },
      });
      dispatch({ type: ACTIONS.CLEAR_VALUES });
    } catch (error) {
      if (error.response && error.response.status === 401) return;
      dispatch({
        type: ACTIONS.CREATE_ANIME_ERROR,
        payload: {
          msg:
            error.response && error.response.data && error.response.data.msg
              ? error.response.data.msg
              : "An error occurred while adding the anime",
        },
      });
    }
  };

  const getAnimes = async () => {
    const { page, search, searchStatus, searchType, sort, currentPlaylist } =
      state;

    let url = `/animes?page=${page}&status=${searchStatus}&animeType=${searchType}&sort=${sort}&currentPlaylistID=${currentPlaylist.id}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: ACTIONS.GET_ANIMES_BEGIN });
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
    } catch (error) {
      dispatch({
        type: ACTIONS.GET_ANIMES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteAnime = async (animeId) => {
    dispatch({ type: ACTIONS.DELETE_ANIME_BEGIN });
    try {
      await authFetch.delete(`/animes/${animeId}`);
      dispatch({
        type: ACTIONS.DELETE_ANIME_SUCCESS,
        payload: { animeId },
      });
      getAnimes();
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: ACTIONS.CHANGE_PAGE, payload: { page } });
  };

  const getPlaylists = async () => {
    dispatch({ type: ACTIONS.GET_PLAYLIST_BEGIN });
    try {
      const { data } = await authFetch("/playlists");
      const { playlists } = data || [];

      dispatch({
        type: ACTIONS.GET_PLAYLIST_SUCCESS,
        payload: { playlists },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.GET_PLAYLIST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const createPlaylist = async (playlistTitle) => {
    dispatch({ type: ACTIONS.CREATE_PLAYLIST_BEGIN });

    let playlist = state.userPlaylists.find(
      (playlist) => playlist.title === playlistTitle
    );

    if (playlist) {
      playlistTitle += `${Math.floor(Math.random() * 100)}`;
    }

    playlist = {
      title: playlistTitle,
      userId: `${state.userPlaylists.length + 1}`,
    };

    try {
      await authFetch.post("/playlists", playlist);

      getPlaylists();
      dispatch({
        type: ACTIONS.CREATE_PLAYLIST_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: ACTIONS.CREATE_PLAYLIST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const updatePlaylist = async (playlist) => {
    dispatch({ type: ACTIONS.UPDATE_PLAYLIST_BEGIN });

    if (playlist.id === "0") {
      toast.error(`Woops. The default playlist can not be edited`, {
        toastId: "update-playlist-error",
      });
      return;
    }

    // make sure the playlist with the same title does not already exist
    let playlistTitle = playlist.title;
    let playlistToUpdate = state.userPlaylists.find(
      (playlist) => playlist.title === playlistTitle
    );
    if (playlistToUpdate) {
      playlist.title += `${Math.floor(Math.random() * 100)}`;
    }
    playlist.title = playlistTitle;

    try {
      await authFetch.put(`/playlists/${playlist.id}`, playlist);

      dispatch({
        type: ACTIONS.UPDATE_PLAYLIST_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: ACTIONS.UPDATE_PLAYLIST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deletePlaylist = async (playlistId) => {
    dispatch({ type: ACTIONS.DELETE_PLAYLIST_BEGIN });
    try {
      await authFetch.delete(`/playlists/${playlistId}`);
      getPlaylists();
      dispatch({
        type: ACTIONS.DELETE_PLAYLIST_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ACTIONS.DELETE_PLAYLIST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const resetFetchedAnimes = () => {
    dispatch({ type: ACTIONS.RESET_FETCHED_ANIMES });
  };

  const fetchAnimes = async ({
    page,
    baseURL,
    filter,
    searchText,
    pagination,
    sort,
  }) => {
    dispatch({ type: ACTIONS.FETCH_ANIMES_BEGIN });
    // the fetching is done here. the sorting is passed in from AddAnime Page
    let APIURL = baseURL;

    if (filter === "true" && searchText) {
      APIURL += "?filter[text]=" + searchText + "&page[limit]=10";
    }
    if (pagination === "true" && page) {
      APIURL += "&page[offset]=" + (page * 10 || 1);
    }

    if (sort !== "false" && sort) {
      APIURL += "&sort=" + sort;
    }

    try {
      fetch(APIURL)
        // check if the response is ok
        .then((res) => {
          if (!res.ok && res.status !== 404) {
            dispatch({
              type: ACTIONS.FETCH_ANIMES_ERROR,
              payload: { msg: "could not fetch animes from API" },
            });
            throw Error("Could not fetch the data for that resource");
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => {
          let animes = data.data ?? [];
          let totalFetchedAnimes = 10;
          if (filter === "true") {
            totalFetchedAnimes = data.meta.count;
          }
          let numOfFetchedAnimesPages = Math.ceil(totalFetchedAnimes / 10);

          if (!animes) {
            toast.error("No animes found", {
              toastId: "no-animes-found",
            });
            animes = [];
          }

          dispatch({
            type: ACTIONS.FETCH_ANIMES_SUCCESS,
            payload: { animes, totalFetchedAnimes, numOfFetchedAnimesPages },
          });
        })
        .catch((error) => {
          dispatch({
            type: ACTIONS.FETCH_ANIMES_ERROR,
            payload: { msg: error.response.data.msg },
          });
        });
    } catch (error) {
      dispatch({
        type: ACTIONS.FETCH_ANIMES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        deleteUser,
        handleChange,
        handlePlaylistChange,
        clearValues,
        createAnime,
        getAnimes,
        getPlaylists,
        createPlaylist,
        changeSiteLanguage,
        deleteAnime,
        updatePlaylist,
        deletePlaylist,
        changeDefaultPlaylistPolicy,
        clearFilters,
        changePage,
        fetchAnimes,
        resetFetchedAnimes,
        siteLanguage: state.siteLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
