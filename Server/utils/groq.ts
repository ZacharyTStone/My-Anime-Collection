// The implementation lives in ./groq/ (prompts, client, parse, cache).
// This barrel keeps the existing `../utils/groq.js` import path stable.
export { getAnimeRecommendations } from "./groq/index.js";
export type { Recommendation } from "./groq/index.js";
