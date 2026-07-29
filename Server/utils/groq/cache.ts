import type { Recommendation } from "./types.js";

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// In-memory cache: anime title -> recommendations
const cache = new Map<string, { recommendations: Recommendation[]; timestamp: number }>();

export function getCachedRecommendations(cacheKey: string): Recommendation[] | undefined {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.recommendations;
  }
  return undefined;
}

export function setCachedRecommendations(
  cacheKey: string,
  recommendations: Recommendation[]
): void {
  cache.set(cacheKey, { recommendations, timestamp: Date.now() });
}
