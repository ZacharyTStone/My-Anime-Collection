import { logger } from "../logger.js";
import { env } from "../../config/env.js";
import { callGroqWithRetry } from "./client.js";
import { getCachedRecommendations, setCachedRecommendations } from "./cache.js";
import type { Recommendation } from "./types.js";

export type { Recommendation } from "./types.js";

export async function getAnimeRecommendations(
  animeName: string,
  synopsis: string
): Promise<Recommendation[]> {
  const apiKey = env.GROQ_API_KEY;

  if (!apiKey) {
    logger.error("GROQ_API_KEY is not set");
    return [];
  }

  // Check cache
  const cacheKey = animeName.toLowerCase().trim();
  const cached = getCachedRecommendations(cacheKey);
  if (cached) {
    return cached;
  }

  const recommendations = await callGroqWithRetry(apiKey, animeName, synopsis);

  // Cache successful results to prevent hammering the API
  if (recommendations.length > 0) {
    setCachedRecommendations(cacheKey, recommendations);
  }

  return recommendations;
}
