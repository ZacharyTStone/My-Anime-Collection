import { ACTIONS } from "./actions";

import { toast } from "react-toastify";

import { initialState } from "./appContext";
import { t } from "i18next";

const reducer = (
  state: any,
  action: {
    type: string;
    payload: any;
  }
) => {
  if (action.type === ACTIONS.CHANGE_THEME) {
    const user = localStorage.getItem("user");

    return {
      ...state,
      theme: action.payload,
    };
  }

  if (action.type === ACTIONS.CHANGE_SITE_LANGUAGE) {
    return {
      ...state,
      siteLanguage: action.payload,
    };
  }

  if (action.type === ACTIONS.DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === ACTIONS.CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === ACTIONS.SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ACTIONS.SETUP_USER_SUCCESS) {
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
  if (action.type === ACTIONS.SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === ACTIONS.LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      theme: "light",
    };
  }
  if (action.type === ACTIONS.UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ACTIONS.UPDATE_USER_SUCCESS) {
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

  if (action.type === ACTIONS.UPDATE_USER_ERROR) {
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
  if (action.type === ACTIONS.DELETE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ACTIONS.DELETE_USER_SUCCESS) {
    toast.success("User deleted successfully", {
      toastId: "user-delete-success",
    });
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === ACTIONS.DELETE_USER_ERROR) {
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

  if (action.type === ACTIONS.HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === ACTIONS.HANDLE_PLAYLIST_CHANGE) {
    return {
      ...state,
      currentPlaylist: {
        title: action.payload.playlist.title,
        id: action.payload.playlist.id,
      },
    };
  }

  if (action.type === ACTIONS.CLEAR_VALUES) {
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
  if (action.type === ACTIONS.CREATE_ANIME_BEGIN) {
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

  if (action.type === ACTIONS.CREATE_ANIME_SUCCESS) {
    toast.success(`${t("add_anime.anime_created_successfully")}`, {
      toastId: action.payload.title,
      autoClose: 5000,
    });

    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === ACTIONS.CREATE_ANIME_ERROR) {
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
  if (action.type === ACTIONS.GET_ANIMES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ACTIONS.GET_ANIMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      animes: action.payload.animes,
      totalAnimes: action.payload.totalAnimes,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === ACTIONS.GET_ANIMES_ERROR) {
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

  if (action.type === ACTIONS.GET_PLAYLIST_BEGIN) {
    return {
      ...state,
      loadingFetchPlaylists: true,
    };
  }
  if (action.type === ACTIONS.GET_PLAYLIST_SUCCESS) {
    return {
      ...state,
      loadingFetchPlaylists: false,
      userPlaylists: action.payload.playlists,
    };
  }

  if (action.type === ACTIONS.GET_PLAYLIST_ERROR) {
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

  if (action.type === ACTIONS.DELETE_ANIME_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ACTIONS.DELETE_ANIME_SUCCESS) {
    toast.success("Anime deleted successfully", {
      toastId: "deleteAnime" + action.payload.animeId,
      autoClose: 5000,
    });
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === ACTIONS.CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === ACTIONS.CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === ACTIONS.CREATE_PLAYLIST_SUCCESS) {
    toast.success("Playlist created successfully", {
      toastId: "createPlaylist",
    });

    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === ACTIONS.CREATE_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ACTIONS.CREATE_PLAYLIST_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg)
      : toast.error("Something went wrong");
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === ACTIONS.UPDATE_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ACTIONS.UPDATE_PLAYLIST_SUCCESS) {
    toast.success(`${t("edit_playlist.playlist_updated_successfully")}`, {
      toastId: "updatePlaylist",
    });

    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === ACTIONS.UPDATE_PLAYLIST_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "updatePlaylist",
        })
      : toast.error("Something went wrong", {
          toastId: "updatePlaylist",
        });
  }
  if (action.type === ACTIONS.DELETE_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ACTIONS.DELETE_PLAYLIST_SUCCESS) {
    toast.success(`${t("edit_playlist.playlist_deleted_successfully")}`, {
      toastId: "deletePlaylist",
    });
    return {
      ...state,
      isLoading: false,
      currentPlaylist: state?.userPlaylists[0],
    };
  }

  if (action.type === ACTIONS.DELETE_PLAYLIST_ERROR) {
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

  if (action.type === ACTIONS.CHANGE_DEFAULT_PLAYLIST_POLICY) {
    let change = !state.addToDefault;
    return {
      ...state,
      addToDefault: change,
    };
  }

  if (action.type === ACTIONS.FETCH_ANIMES_BEGIN) {
    return { ...state, isLoading: true, loadingFetchAnimes: true };
  }

  if (action.type === ACTIONS.FETCH_ANIMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingFetchAnimes: false,
      fetchedAnimes: action.payload.animes,
      totalFetchedAnimes: action.payload.totalFetchedAnimes,
      numOfFetchedAnimesPages: action.payload.numOfFetchedAnimesPages,
    };
  }

  if (action.type === ACTIONS.RESET_FETCHED_ANIMES) {
    return {
      ...state,
      fetchedAnimes: [],
      totalFetchedAnimes: 0,
      numOfFetchedAnimesPages: 0,
    };
  }
  if (action.type === ACTIONS.FETCH_ANIMES_ERROR) {
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

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
