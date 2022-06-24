import React, { useReducer, useContext } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_ANIME_BEGIN,
  CREATE_ANIME_SUCCESS,
  CREATE_ANIME_ERROR,
  GET_ANIMES_BEGIN,
  GET_ANIMES_SUCCESS,
  DELETE_ANIME_BEGIN,
  DELETE_ANIME_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CHANGE_SITE_LANGUAGE,
} from "./actions";
import i18next from "i18next";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  theme: user ? user.theme : "dark",
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
  sortOptions: [
    {
      title: "Latest",
      value: "latest",
    },
    {
      title: "Oldest",
      value: "oldest",
    },
    {
      title: "A - Z",
      value: "a-z",
    },
    {
      title: "Z - A",
      value: "z-a",
    },
    {
      title: "Rating",
      value: "rating",
    },
    {
      title: "Format",
      value: "format",
    },
    {
      title: "Date Added",
      value: "date added",
    },
  ],

  siteLanguage: "en",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
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

  const changeSiteLanguage = (lang) => {
    dispatch({
      type: CHANGE_SITE_LANGUAGE,
      payload: lang,
    });

    i18n.changeLanguage(lang);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
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
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token } = data;

      toast.success("User updated successfully");

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        toast.error(error.response.data.message);
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    // clearAlert();
  };

  const deleteUser = async (currentUser) => {
    dispatch({ type: DELETE_USER_BEGIN });
    try {
      const { data } = await authFetch.delete("/auth/deleteUser", currentUser);

      const { user, token } = data;
      toast.success("User deleted successfully");
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: { user, token },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        toast.error(error.response.data.message);
        dispatch({
          type: DELETE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    // clearAlert();
    removeUserFromLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createAnime = async (anime) => {
    dispatch({ type: CREATE_ANIME_BEGIN, payload: anime });
    console.log(anime);
    try {
      const creationDate = anime.attributes.startDate;
      const title =
        anime.attributes.titles.en ||
        anime.attributes.titles.en_jp ||
        anime.attributes.canonicalTitle ||
        "Title N/A";
      const id = anime.id || 0;
      const rating = anime.attributes.averageRating || 9001;
      const format = anime.attributes.subtype || "N/A";
      const episodeCount = anime.attributes.episodeCount || 9001;
      const synopsis = anime.attributes.synopsis || "N/A";
      const coverImage = anime.attributes.posterImage.small || "N/A";
      const youtubeVideoId = anime.attributes.youtubeVideoId || "N/A";
      const ageRating = anime.attributes.ageRating || "N/A";
      const japanese_title =
        anime.attributes.titles.ja_jp ||
        anime.attributes.titles.en_jp ||
        anime.attributes.canonicalTitle ||
        "Title N/A";

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
        ageRating,
        japanese_title,
      });
      toast.success(`${title} has been added to your list!`);
      dispatch({ type: CREATE_ANIME_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      toast.error(`Woops. ${error.response.data.msg}`);
      dispatch({
        type: CREATE_ANIME_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // clearAlert();
  };

  const getAnimes = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/animes?page=${page}&status=${searchStatus}&animeType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_ANIMES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { animes, totalAnimes, numOfPages } = data;
      dispatch({
        type: GET_ANIMES_SUCCESS,
        payload: {
          animes,
          totalAnimes,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    // clearAlert();
  };

  const deleteAnime = async (animeId) => {
    dispatch({ type: DELETE_ANIME_BEGIN });
    try {
      await authFetch.delete(`/animes/${animeId}`);
      getAnimes();
      toast.success("Anime deleted successfully");
      dispatch({
        type: DELETE_ANIME_SUCCESS,
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        deleteUser,
        handleChange,
        clearValues,
        createAnime,
        getAnimes,
        changeSiteLanguage,
        deleteAnime,

        clearFilters,
        changePage,
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
