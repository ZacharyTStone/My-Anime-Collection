import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/api";
import { useAuthStore } from "../stores/authStore";
import type { AiRecommendation } from "../utils/types";
import { queryKeys } from "./keys";

/**
 * AI-powered recommendations for a given anime. Cached per title, so
 * re-opening the modal is instant and no manual cache ref is needed.
 */
export const useAiRecommendations = (
  title: string,
  synopsis: string,
  enabled: boolean
) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.aiRecommendations(title),
    queryFn: async (): Promise<AiRecommendation[]> => {
      const { data } = await apiClient.post("/animes/recommendations", {
        title,
        synopsis,
      });
      return data.recommendations;
    },
    enabled: Boolean(token) && enabled,
    staleTime: Infinity,
    retry: false,
  });
};
