export interface Recommendation {
  title: string;
  japanese_title: string;
  reason: string;
  reason_jp: string;
}

/** Shape of a single item in the LLM's JSON array, before validation. */
export interface RawRecommendation {
  title?: unknown;
  japanese_title?: unknown;
  reason?: unknown;
  reason_jp?: unknown;
}
