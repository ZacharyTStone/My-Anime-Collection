import { useAnimeStore } from "./animeStore";
import { useAuthStore } from "./authStore";
import { usePlaylistStore } from "./playlistStore";
import { useShallow } from "zustand/react/shallow";

type AnimeState = ReturnType<typeof useAnimeStore.getState>;
type AuthState = ReturnType<typeof useAuthStore.getState>;
type PlaylistState = ReturnType<typeof usePlaylistStore.getState>;

export const useAnimeSelector = <T>(selector: (s: AnimeState) => T) =>
  useAnimeStore(useShallow(selector));

export const useAuthSelector = <T>(selector: (s: AuthState) => T) =>
  useAuthStore(useShallow(selector));

export const usePlaylistSelector = <T>(selector: (s: PlaylistState) => T) =>
  usePlaylistStore(useShallow(selector));
