import React, {
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { ACTIONS } from "./actions";
import { useAuthContext } from "./AuthContext";
import { createApiClient } from "../utils/api";

// Types and Interfaces
interface Playlist {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface PlaylistState {
  currentPlaylist: Playlist;
  userPlaylists: Playlist[];
  loadingFetchPlaylists: boolean;
}

interface PlaylistContextType extends PlaylistState {
  handlePlaylistChange: (params: { value: string }) => void;
  getPlaylists: () => Promise<void>;
  createPlaylist: (playlistTitle: string) => Promise<void>;
  updatePlaylist: (playlist: Playlist) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
}

interface PlaylistProviderProps {
  children: React.ReactNode;
}

// Initial state
const getInitialPlaylistState = (): PlaylistState => {
  return {
    currentPlaylist: {
      id: "2",
      title: "",
      userId: "",
      createdAt: "",
      updatedAt: "",
    },
    userPlaylists: [],
    loadingFetchPlaylists: false,
  };
};

export const initialPlaylistState = getInitialPlaylistState();

// Playlist reducer
interface PlaylistAction {
  type: string;
  payload?: {
    playlist?: Playlist;
    playlists?: Playlist[];
    msg?: string;
    id?: string;
  };
}

const playlistReducer = (state: PlaylistState, action: PlaylistAction): PlaylistState => {
  switch (action.type) {
    case ACTIONS.HANDLE_PLAYLIST_CHANGE:
      if (!action.payload?.playlist) return state;
      return {
        ...state,
        currentPlaylist: {
          title: action.payload.playlist.title,
          id: action.payload.playlist.id,
          userId: action.payload.playlist.userId || "",
          createdAt: action.payload.playlist.createdAt || "",
          updatedAt: action.payload.playlist.updatedAt || "",
        },
      };
    case ACTIONS.GET_PLAYLIST_BEGIN:
      return {
        ...state,
        loadingFetchPlaylists: true,
      };
    case ACTIONS.GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        loadingFetchPlaylists: false,
        userPlaylists: action.payload?.playlists || [],
      };
    case ACTIONS.GET_PLAYLIST_ERROR:
      return {
        ...state,
        loadingFetchPlaylists: false,
      };
    case ACTIONS.CREATE_PLAYLIST_BEGIN:
      return { ...state, loadingFetchPlaylists: true };
    case ACTIONS.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loadingFetchPlaylists: false,
      };
    case ACTIONS.CREATE_PLAYLIST_ERROR:
      return {
        ...state,
        loadingFetchPlaylists: false,
      };
    case ACTIONS.UPDATE_PLAYLIST_BEGIN:
      return { ...state, loadingFetchPlaylists: true };
    case ACTIONS.UPDATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loadingFetchPlaylists: false,
      };
    case ACTIONS.UPDATE_PLAYLIST_ERROR:
      return {
        ...state,
        loadingFetchPlaylists: false,
      };
    case ACTIONS.DELETE_PLAYLIST_BEGIN:
      return { ...state, loadingFetchPlaylists: true };
    case ACTIONS.DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loadingFetchPlaylists: false,
        currentPlaylist: (state?.userPlaylists[0] as Playlist) || {
          id: "2",
          title: "",
          userId: "",
          createdAt: "",
          updatedAt: "",
        },
      };
    case ACTIONS.DELETE_PLAYLIST_ERROR:
      return {
        ...state,
        loadingFetchPlaylists: false,
      };
    default:
      return state;
  }
};

// Context
const PlaylistContext = React.createContext<PlaylistContextType | undefined>(undefined);

/**
 * PlaylistProvider component that manages playlist-related state
 */
export const PlaylistProvider: React.FC<PlaylistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, getInitialPlaylistState());
  const { token } = useAuthContext();

  // Create API client instance
  const apiClient = useMemo(
    () => createApiClient(token),
    [token]
  );

  // Playlist management functions
  const handlePlaylistChange = useCallback(({ value }: { value: string }) => {
    const playlist = state.userPlaylists.find((p: Playlist) => p.id === value);
    if (playlist) {
      dispatch({
        type: ACTIONS.HANDLE_PLAYLIST_CHANGE,
        payload: { playlist },
      });
    }
  }, [state.userPlaylists]);

  const getPlaylists = useCallback(async () => {
    if (!token) return;

    dispatch({ type: ACTIONS.GET_PLAYLIST_BEGIN, payload: {} });
    try {
      const response = await apiClient.get<{ playlists: Playlist[] }>("/playlists");
      const { playlists } = response.data;
      dispatch({
        type: ACTIONS.GET_PLAYLIST_SUCCESS,
        payload: { playlists },
      });
    } catch (error: any) {
      dispatch({
        type: ACTIONS.GET_PLAYLIST_ERROR,
        payload: { msg: error.response?.data?.msg || "Error fetching playlists" },
      });
    }
  }, [token, apiClient]);

  const createPlaylist = useCallback(
    async (playlistTitle: string) => {
      if (!token) return;

      dispatch({ type: ACTIONS.CREATE_PLAYLIST_BEGIN, payload: {} });
      try {
        const response = await apiClient.post<{ playlist: Playlist }>("/playlists", {
          title: playlistTitle,
        });
        const { playlist } = response.data;
        dispatch({
          type: ACTIONS.CREATE_PLAYLIST_SUCCESS,
          payload: { playlist },
        });
        toast.success("Playlist Created!");
        // Refresh playlists after creation
        getPlaylists();
      } catch (error: any) {
        if (error.response?.status === 401) return;
        const errorMessage = error.response?.data?.msg || "Error creating playlist";
        dispatch({
          type: ACTIONS.CREATE_PLAYLIST_ERROR,
          payload: { msg: errorMessage },
        });
        toast.error(errorMessage);
      }
    },
    [getPlaylists, token]
  );

  const updatePlaylist = useCallback(
    async (playlist: Playlist) => {
      if (!token) return;

      dispatch({ type: ACTIONS.UPDATE_PLAYLIST_BEGIN, payload: {} });
      try {
        const response = await apiClient.patch<{ updatedPlaylist: Playlist }>(
          `/playlists/${playlist.id}`,
          playlist
        );
        const { updatedPlaylist } = response.data;
        dispatch({
          type: ACTIONS.UPDATE_PLAYLIST_SUCCESS,
          payload: { playlist: updatedPlaylist },
        });
        toast.success("Playlist Updated!");
        // Refresh playlists after update
        getPlaylists();
      } catch (error: any) {
        if (error.response?.status === 401) return;
        const errorMessage = error.response?.data?.msg || "Error updating playlist";
        dispatch({
          type: ACTIONS.UPDATE_PLAYLIST_ERROR,
          payload: { msg: errorMessage },
        });
        toast.error(errorMessage);
      }
    },
    [getPlaylists, token]
  );

  const deletePlaylist = useCallback(
    async (playlistId: string) => {
      if (!token) return;

      dispatch({ type: ACTIONS.DELETE_PLAYLIST_BEGIN, payload: {} });
      try {
        await apiClient.delete(`/playlists/${playlistId}`);
        dispatch({
          type: ACTIONS.DELETE_PLAYLIST_SUCCESS,
          payload: {},
        });
        toast.success("Playlist Deleted!");
        // Refresh playlists after deletion
        getPlaylists();
      } catch (error: any) {
        const errorMessage = error.response?.data?.msg || "Error deleting playlist";
        dispatch({
          type: ACTIONS.DELETE_PLAYLIST_ERROR,
          payload: { msg: errorMessage },
        });
        toast.error(errorMessage);
      }
    },
    [getPlaylists, token]
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      handlePlaylistChange,
      getPlaylists,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
    }),
    [
      state,
      handlePlaylistChange,
      getPlaylists,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
    ]
  );

  return (
    <PlaylistContext.Provider value={contextValue}>{children}</PlaylistContext.Provider>
  );
};

/**
 * Custom hook to use playlist context
 * @throws {Error} When used outside of PlaylistProvider
 */
export const usePlaylistContext = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);

  if (context === undefined) {
    throw new Error("usePlaylistContext must be used within a PlaylistProvider");
  }

  return context;
};
