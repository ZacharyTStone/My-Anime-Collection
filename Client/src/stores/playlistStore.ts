import { create } from "zustand";

export interface Playlist {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_PLAYLIST: Playlist = {
  id: "2",
  title: "",
  userId: "",
  createdAt: "",
  updatedAt: "",
};

/**
 * Holds only the currently selected playlist (UI state). The playlist list
 * itself and all mutations live in TanStack Query — see src/queries/playlists.ts.
 */
interface PlaylistStore {
  currentPlaylist: Playlist;
  setCurrentPlaylist: (playlist: Playlist) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  currentPlaylist: { ...DEFAULT_PLAYLIST },

  setCurrentPlaylist: (playlist) => {
    set({ currentPlaylist: { ...playlist } });
  },
}));
