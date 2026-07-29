import { logger } from "../logger.js";
import type { RawRecommendation, Recommendation } from "./types.js";

/** Returns true if the string contains at least one CJK / Hiragana / Katakana character. */
function containsJapanese(str: string): boolean {
  // Hiragana: ぀-ゟ, Katakana: ゠-ヿ, CJK Unified: 一-鿿
  return /[぀-ゟ゠-ヿ一-鿿]/.test(str);
}

export function parseRecommendations(text: string): Recommendation[] {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    logger.error(`Failed to parse Groq response as JSON: ${(err as Error).message}`);
    return [];
  }

  if (!Array.isArray(parsed)) {
    logger.error(`Groq response is not an array: ${typeof parsed}`);
    return [];
  }

  const items: RawRecommendation[] = parsed;

  return items
    .filter((item): item is Recommendation => {
      if (
        !item ||
        typeof item.title !== "string" ||
        typeof item.japanese_title !== "string" ||
        typeof item.reason !== "string" ||
        typeof item.reason_jp !== "string"
      ) {
        return false;
      }

      // Warn (but still include) if Japanese fields lack Japanese characters.
      // This helps us track if the LLM is still misbehaving.
      if (!containsJapanese(item.japanese_title)) {
        logger.warn(
          `Recommendation "${item.title}" has non-Japanese japanese_title: "${item.japanese_title}"`
        );
      }
      if (!containsJapanese(item.reason_jp)) {
        logger.warn(
          `Recommendation "${item.title}" has non-Japanese reason_jp: "${item.reason_jp}"`
        );
      }

      return true;
    })
    .slice(0, 5);
}
