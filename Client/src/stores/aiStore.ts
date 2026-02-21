import { create } from "zustand";
import { AiRecommendation } from "../utils/types";
import { apiClient } from "../utils/api";

interface AiStore {
  getRecommendations: (title: string, synopsis: string) => Promise<AiRecommendation[]>;
}

export const useAiStore = create<AiStore>(() => ({
  getRecommendations: async (title, synopsis) => {
    const { data } = await apiClient.post("/animes/recommendations", { title, synopsis });
    return data.recommendations as AiRecommendation[];
  },
}));
