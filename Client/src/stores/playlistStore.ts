import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthStore } from "./authStore";

// Types and Interfaces
interface Playlist {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface PlaylistStore {
  currentPlaylist: Playlist;
  userPlaylists: Playlist[];
  loadingFetchPlaylists: boolean;
  handlePlaylistChange: (params: { value: string }) => void;
  getPlaylists: () => Promise<void>;
  createPlaylist: (playlistTitle: string) => Promise<void>;
  updatePlaylist: (playlist: Playlist) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
}

const API_BASE_URL = "/api/v1";

const DEFAULT_PLAYLIST: Playlist = {
  id: "2",
  title: "",
  userId: "",
  createdAt: "",
  updatedAt: "",
};

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  currentPlaylist: { ...DEFAULT_PLAYLIST },
  userPlaylists: [],
  loadingFetchPlaylists: false,

  handlePlaylistChange: ({ value }) => {
    const playlist = get().userPlaylists.find((p) => p.id === value);
    if (playlist) {
      set({ currentPlaylist: { ...playlist } });
    }
  },

  getPlaylists: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loadingFetchPlaylists: true });
    try {
      const { data } = await axios.get(`${API_BASE_URL}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingFetchPlaylists: false,
        userPlaylists: data.playlists,
      });
    } catch {
      set({ loadingFetchPlaylists: false });
    }
  },

  createPlaylist: async (playlistTitle: string) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loadingFetchPlaylists: true });
    try {
      await axios.post(
        `${API_BASE_URL}/playlists`,
        { title: playlistTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ loadingFetchPlaylists: false });
      toast.success("Playlist Created!");
      get().getPlaylists();
    } catch (error: any) {
      set({ loadingFetchPlaylists: false });
      if (error.response?.status === 401) return;
      toast.error(error.response?.data?.msg);
    }
  },

  updatePlaylist: async (playlist: Playlist) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loadingFetchPlaylists: true });
    try {
      await axios.patch(
        `${API_BASE_URL}/playlists/${playlist.id}`,
        playlist,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ loadingFetchPlaylists: false });
      toast.success("Playlist Updated!");
      get().getPlaylists();
    } catch (error: any) {
      set({ loadingFetchPlaylists: false });
      if (error.response?.status === 401) return;
      toast.error(error.response?.data?.msg);
    }
  },

  deletePlaylist: async (playlistId: string) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loadingFetchPlaylists: true });
    try {
      await axios.delete(`${API_BASE_URL}/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { userPlaylists } = get();
      set({
        loadingFetchPlaylists: false,
        currentPlaylist: userPlaylists[0] || { ...DEFAULT_PLAYLIST },
      });
      toast.success("Playlist Deleted!");
      get().getPlaylists();
    } catch (error: any) {
      set({ loadingFetchPlaylists: false });
    }
  },
}));
