export interface Recommendation {
  title: string;
  japanese_title: string;
  reason: string;
  reason_jp: string;
}

// Use v1beta with gemini-1.5-flash (most stable free-tier model)
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;
const MAX_SYNOPSIS_LENGTH = 500;

// In-memory cache: anime title -> recommendations (avoids repeat Gemini calls)
const cache = new Map<string, { recommendations: Recommendation[]; timestamp: number }>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function sanitizeText(text: string): string {
  return text
    .replace(/[\u0000-\u001F\u007F]/g, " ") // strip control characters
    .replace(/\\/g, "\\\\") // escape backslashes
    .trim();
}

function buildPrompt(animeName: string, synopsis: string): string {
  const cleanName = sanitizeText(animeName);
  const cleanSynopsis = sanitizeText(synopsis).slice(0, MAX_SYNOPSIS_LENGTH);

  return `You are an anime recommendation engine. Given the following anime, suggest 5 similar anime the user would enjoy.

Anime: ${cleanName}
Synopsis: ${cleanSynopsis}

Return ONLY a JSON array with exactly 5 objects. Each object must have these fields:
- "title": English title of the recommended anime
- "japanese_title": Japanese title of the recommended anime
- "reason": A brief 1-2 sentence explanation in English of why they'd like it
- "reason_jp": The same explanation translated to Japanese

Do not include the original anime in recommendations. Only recommend real, existing anime.
Return ONLY the JSON array, no markdown formatting, no code blocks, no extra text.`;
}

function parseRecommendations(text: string): Recommendation[] {
  // Strip markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter(
      (item: any) =>
        item &&
        typeof item.title === "string" &&
        typeof item.japanese_title === "string" &&
        typeof item.reason === "string" &&
        typeof item.reason_jp === "string"
    )
    .slice(0, 5);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGeminiWithRetry(
  apiKey: string,
  animeName: string,
  synopsis: string
): Promise<Recommendation[]> {
  const requestBody = {
    contents: [
      {
        parts: [{ text: buildPrompt(animeName, synopsis) }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 429) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      console.warn(`Gemini rate limited (attempt ${attempt + 1}/${MAX_RETRIES}), retrying in ${delay}ms...`);
      await sleep(delay);
      continue;
    }

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "unable to read body");
      console.error(`Gemini API error ${response.status}: ${errorBody}`);
      return [];
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("No text in Gemini response:", JSON.stringify(data).slice(0, 500));
      return [];
    }

    return parseRecommendations(text);
  }

  console.error("Gemini API: max retries exceeded (429 rate limit)");
  return [];
}

export async function getAnimeRecommendations(
  animeName: string,
  synopsis: string
): Promise<Recommendation[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return [];
  }

  // Check cache
  const cacheKey = animeName.toLowerCase().trim();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.recommendations;
  }

  const recommendations = await callGeminiWithRetry(apiKey, animeName, synopsis);

  // Cache successful results to prevent hammering the API
  if (recommendations.length > 0) {
    cache.set(cacheKey, { recommendations, timestamp: Date.now() });
  }

  return recommendations;
}
