import { useAnimeStore } from "../stores/animeStore";
import { useAuthStore } from "../stores/authStore";
import { usePlaylistStore } from "../stores/playlistStore";
import { useLanguageStore } from "../stores/languageStore";
import { useSettingsStore } from "../stores/settingsStore";
import { useShallow } from "zustand/react/shallow";

type AnimeState = ReturnType<typeof useAnimeStore.getState>;
type AuthState = ReturnType<typeof useAuthStore.getState>;
type PlaylistState = ReturnType<typeof usePlaylistStore.getState>;
type LanguageState = ReturnType<typeof useLanguageStore.getState>;
type SettingsState = ReturnType<typeof useSettingsStore.getState>;

export const useAnimeSelector = <T>(selector: (s: AnimeState) => T) =>
  useAnimeStore(useShallow(selector));

export const useAuthSelector = <T>(selector: (s: AuthState) => T) =>
  useAuthStore(useShallow(selector));

export const usePlaylistSelector = <T>(selector: (s: PlaylistState) => T) =>
  usePlaylistStore(useShallow(selector));

export const useLanguageSelector = <T>(selector: (s: LanguageState) => T) =>
  useLanguageStore(useShallow(selector));

export const useSettingsSelector = <T>(selector: (s: SettingsState) => T) =>
  useSettingsStore(useShallow(selector));
