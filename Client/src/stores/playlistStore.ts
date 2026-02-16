import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";
import { apiClient } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";

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

const DEFAULT_PLAYLIST: Playlist = {
  id: "2",
  title: "",
  userId: "",
  createdAt: "",
  updatedAt: "",
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
    if (!useAuthStore.getState().token) return;

    set({ loadingFetchPlaylists: true });
    try {
      const { data } = await apiClient.get("/playlists");
      set({
        loadingFetchPlaylists: false,
        userPlaylists: data.playlists,
      });
    } catch (error: unknown) {
      set({ loadingFetchPlaylists: false });
      handleApiError(error, "Failed to fetch playlists");
    }
  },

  createPlaylist: async (playlistTitle: string) => {
    if (!useAuthStore.getState().token) return;

    set({ loadingFetchPlaylists: true });
    try {
      await apiClient.post("/playlists", { title: playlistTitle });
      set({ loadingFetchPlaylists: false });
      toast.success("Playlist Created!");
      get().getPlaylists();
    } catch (error: unknown) {
      set({ loadingFetchPlaylists: false });
      handleApiError(error, "Failed to create playlist");
    }
  },

  updatePlaylist: async (playlist: Playlist) => {
    if (!useAuthStore.getState().token) return;

    set({ loadingFetchPlaylists: true });
    try {
      await apiClient.patch(`/playlists/${playlist.id}`, playlist);
      set({ loadingFetchPlaylists: false });
      toast.success("Playlist Updated!");
      get().getPlaylists();
    } catch (error: unknown) {
      set({ loadingFetchPlaylists: false });
      handleApiError(error, "Failed to update playlist");
    }
  },

  deletePlaylist: async (playlistId: string) => {
    if (!useAuthStore.getState().token) return;

    set({ loadingFetchPlaylists: true });
    try {
      await apiClient.delete(`/playlists/${playlistId}`);
      const { userPlaylists } = get();
      set({
        loadingFetchPlaylists: false,
        currentPlaylist: userPlaylists[0] || { ...DEFAULT_PLAYLIST },
      });
      toast.success("Playlist Deleted!");
      get().getPlaylists();
    } catch (error: unknown) {
      set({ loadingFetchPlaylists: false });
      handleApiError(error, "Failed to delete playlist");
    }
  },
}));
