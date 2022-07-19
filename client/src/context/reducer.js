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
  GET_PLAYLIST_BEGIN,
  GET_PLAYLIST_SUCCESS,
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
} from "./actions";

import { toast } from "react-toastify";

import { initialState } from "./appContext";

const reducer = (state, action) => {
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
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    toast.success("User updated successfully");
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      theme: action.payload.theme,
      user: action.payload.user,
      playlist: action.payload.playlist,
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
    toast.success("User deleted successfully");
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DELETE_USER_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg)
      : toast.error("Something went wrong");

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
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_ANIME_SUCCESS) {
    toast.success(
      `${action.payload.title} has been added to your playlist called ${action.payload.playlistTitle}`,
      {
        toastId: "createAnime",
      }
    );

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
    return { ...state, isLoading: true, showAlert: false };
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

  if (action.type === GET_PLAYLIST_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_PLAYLIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userPlaylists: action.payload.playlists,
    };
  }

  if (action.type === DELETE_ANIME_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_ANIME_SUCCESS) {
    toast.success("Anime deleted successfully", {
      toastId: "deleteAnime",
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
    toast.success("Playlist updated successfully", {
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
    toast.success("Playlist deleted successfully", {
      toastId: "deletePlaylist",
    });
    return {
      ...state,
      isLoading: false,
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
    return { ...state, isLoading: true };
  }

  if (action.type === FETCH_ANIMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      fetchedAnimes: action.payload.animes,
      totalFetchedAnimes: action.payload.totalFetchedAnimes,
      numOfFetchedAnimesPages: action.payload.numOfFetchedAnimesPages,
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
    };
  }

  if (action.type === CHANGE_AUDIO_STATE) {
    // if (action.payload === true) {
    //   toast.success(
    //     "Playing 100 ANIME SONGS in 30 MINUTES!!!.... by HalcyonMusic / ハルシオン Anime Piano Covers.",
    //     {
    //       toastId: "changeAudioState1",
    //       autoClose: 8000,
    //     }
    //   );

    //   toast.success(
    //     "Learn more about his music at https://halcyonmusic.carrd.co",
    //     {
    //       toastId: "changeAudioState2",
    //       autoClose: 8000,
    //     }
    //   );
    // }
    // if (action.payload === false) {
    //   toast.success(
    //     "100 ANIME SONGS in 30 MINUTES!!!.... by HalcyonMusic / ハルシオン Anime Piano Covers.",
    //     {
    //       toastId: "changeAudioState1",
    //     }
    //   );
    // }

    return {
      ...state,
      isAudioPlaying: action.payload,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
