import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
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
  GET_ANIMES_ERROR,
  GET_PLAYLIST_BEGIN,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_ERROR,
  FETCH_ANIMES_BEGIN,
  FETCH_ANIMES_SUCCESS,
  FETCH_ANIMES_ERROR,
  CREATE_PLAYLIST_BEGIN,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_ERROR,
  DELETE_PLAYLIST_BEGIN,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_ERROR,
  DELETE_ANIME_BEGIN,
  DELETE_ANIME_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CHANGE_SITE_LANGUAGE,
  HANDLE_PLAYLIST_CHANGE,
  CHANGE_DEFAULT_PLAYLIST_POLICY,
  UPDATE_PLAYLIST_BEGIN,
  UPDATE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_ERROR,
  CHANGE_AUDIO_STATE,
  CHANGE_THEME,
} from "./actions";

import { toast } from "react-toastify";

import { initialState } from "./appContext";
import { RESET_FETCHED_ANIMES } from "./actions";
import { t } from "i18next";
import { stat } from "fs";

const reducer = (
  state: any,
  action: {
    type: string;
    payload: any;
  }
) => {
  if (action.type === CHANGE_THEME) {
    const user = localStorage.getItem("user");

    return {
      ...state,
      theme: action.payload,
    };
  }

  if (action.type === CHANGE_SITE_LANGUAGE) {
    return {
      ...state,
      siteLanguage: action.payload,
    };
  }

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      theme: action.payload.theme,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      theme: "light",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    toast.success(`User updated successfully.`, {
      toastId: "user-update-success" + action.payload.user.theme,
    });

    return {
      ...state,
      isLoading: false,
      token: action.payload.token || state.token,
      theme: action.payload.theme || state.theme,
      user: action.payload.user || state.user,
      playlist: action.payload.playlist || state.playlist,
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    if (action.payload.msg) {
      toast.error(action.payload.msg);
    } else {
      toast.error("Something went wrong");
    }

    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DELETE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_USER_SUCCESS) {
    toast.success("User deleted successfully", {
      toastId: "user-delete-success",
    });
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DELETE_USER_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "user-delete-error",
        })
      : toast.error("Something went wrong", {
          toastId: "user-delete-error",
        });

    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === HANDLE_PLAYLIST_CHANGE) {
    return {
      ...state,
      currentPlaylist: {
        title: action.payload.playlist.title,
        id: action.payload.playlist.id,
      },
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      id: "",
      title: "",
    };

    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_ANIME_BEGIN) {
    // don't add loading to global loading state (need to add to local card state somehow)
    // return { ...state, isLoading: true };

    return {
      ...state,
      isLoading: true,
      loadingData: {
        ...state.loadingData,
        anime_id: action.payload?.id,
      },
    };
  }

  if (action.type === CREATE_ANIME_SUCCESS) {
    toast.success(`${t("add_anime.anime_created_successfully")}`, {
      toastId: action.payload.title,
      autoClose: 5000,
    });

    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_ANIME_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "createAnime",
        })
      : toast.error("Something went wrong", {
          toastId: "createAnime",
        });
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_ANIMES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ANIMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      animes: action.payload.animes,
      totalAnimes: action.payload.totalAnimes,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === GET_ANIMES_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "getAnimes",
        })
      : toast.error("Something went wrong", {
          toastId: "getAnimes",
        });
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === GET_PLAYLIST_BEGIN) {
    return {
      ...state,
      loadingFetchPlaylists: true,
    };
  }
  if (action.type === GET_PLAYLIST_SUCCESS) {
    return {
      ...state,
      loadingFetchPlaylists: false,
      userPlaylists: action.payload.playlists,
    };
  }

  if (action.type === GET_PLAYLIST_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "getPlaylist",
        })
      : toast.error("Something went wrong", {
          toastId: "getPlaylist",
        });
    return {
      ...state,
      loadingFetchPlaylists: false,
    };
  }

  if (action.type === DELETE_ANIME_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_ANIME_SUCCESS) {
    toast.success("Anime deleted successfully", {
      toastId: "deleteAnime" + action.payload.animeId,
      autoClose: 5000,
    });
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === CREATE_PLAYLIST_SUCCESS) {
    toast.success("Playlist created successfully", {
      toastId: "createPlaylist",
    });

    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CREATE_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_PLAYLIST_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg)
      : toast.error("Something went wrong");
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === UPDATE_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_PLAYLIST_SUCCESS) {
    toast.success(`${t("edit_playlist.playlist_updated_successfully")}`, {
      toastId: "updatePlaylist",
    });

    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === UPDATE_PLAYLIST_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "updatePlaylist",
        })
      : toast.error("Something went wrong", {
          toastId: "updatePlaylist",
        });
  }
  if (action.type === DELETE_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_PLAYLIST_SUCCESS) {
    toast.success(`${t("edit_playlist.playlist_deleted_successfully")}`, {
      toastId: "deletePlaylist",
    });
    return {
      ...state,
      isLoading: false,
      currentPlaylist: state?.userPlaylists[0],
    };
  }

  if (action.type === DELETE_PLAYLIST_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "deletePlaylist",
        })
      : toast.error("Something went wrong", {
          toastId: "deletePlaylist",
        });
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CHANGE_DEFAULT_PLAYLIST_POLICY) {
    let change = !state.addToDefault;
    return {
      ...state,
      addToDefault: change,
    };
  }

  if (action.type === FETCH_ANIMES_BEGIN) {
    return { ...state, isLoading: true, loadingFetchAnimes: true };
  }

  if (action.type === FETCH_ANIMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingFetchAnimes: false,
      fetchedAnimes: action.payload.animes,
      totalFetchedAnimes: action.payload.totalFetchedAnimes,
      numOfFetchedAnimesPages: action.payload.numOfFetchedAnimesPages,
    };
  }

  if (action.type === RESET_FETCHED_ANIMES) {
    return {
      ...state,
      fetchedAnimes: [],
      totalFetchedAnimes: 0,
      numOfFetchedAnimesPages: 0,
    };
  }
  if (action.type === FETCH_ANIMES_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "fetchAnimes",
        })
      : toast.error("Something went wrong", {
          toastId: "fetchAnimes",
        });
    return {
      ...state,
      isLoading: false,
      loadingFetchAnimes: false,
    };
  }

  if (action.type === CHANGE_AUDIO_STATE) {
    return {
      ...state,
      isAudioPlaying: action.payload,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
