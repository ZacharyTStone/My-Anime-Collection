import { create } from "zustand";

const STORAGE_KEY = "streamingServices";

const getStoredServices = (): string[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

/**
 * The streaming services the user subscribes to (UI preference, stored
 * locally). Used by the playlist streaming filter.
 */
interface SettingsStore {
  streamingServices: string[];
  toggleStreamingService: (service: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  streamingServices: getStoredServices(),

  toggleStreamingService: (service) => {
    const current = get().streamingServices;
    const next = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set({ streamingServices: next });
  },
}));
