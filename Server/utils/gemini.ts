export interface Recommendation {
  title: string;
  japanese_title: string;
  reason: string;
  reason_jp: string;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;
const MAX_SYNOPSIS_LENGTH = 500;

// In-memory cache: anime title -> recommendations
const cache = new Map<
  string,
  { recommendations: Recommendation[]; timestamp: number }
>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function buildSystemPrompt(): string {
  return `You are an anime recommendation engine. You return ONLY valid JSON arrays with no extra text, no markdown, no code blocks.`;
}

function buildUserPrompt(animeName: string, synopsis: string): string {
  const cleanSynopsis = synopsis.slice(0, MAX_SYNOPSIS_LENGTH);

  return `Given this anime, suggest 5 similar anime the user would enjoy.

Anime: ${animeName}
Synopsis: ${cleanSynopsis}

Return ONLY a JSON array with exactly 5 objects. Each object must have:
- "title": English title
- "japanese_title": Japanese title
- "reason": 1-2 sentence explanation in English
- "reason_jp": same explanation in Japanese

Do not include the original anime. Only recommend real, existing anime.
Return ONLY the raw JSON array.`;
}

function parseRecommendations(text: string): Recommendation[] {
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

async function callGroqWithRetry(
  apiKey: string,
  animeName: string,
  synopsis: string
): Promise<Recommendation[]> {
  const requestBody = {
    model: MODEL,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: buildUserPrompt(animeName, synopsis) },
    ],
    temperature: 0.7,
    max_tokens: 1024,
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 429) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      console.warn(
        `Groq rate limited (attempt ${attempt + 1}/${MAX_RETRIES}), retrying in ${delay}ms...`
      );
      await sleep(delay);
      continue;
    }

    if (!response.ok) {
      const errorBody = await response
        .text()
        .catch(() => "unable to read body");
      console.error(`Groq API error ${response.status}: ${errorBody}`);
      return [];
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      console.error(
        "No text in Groq response:",
        JSON.stringify(data).slice(0, 500)
      );
      return [];
    }

    return parseRecommendations(text);
  }

  console.error("Groq API: max retries exceeded (429 rate limit)");
  return [];
}

export async function getAnimeRecommendations(
  animeName: string,
  synopsis: string
): Promise<Recommendation[]> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("GROQ_API_KEY is not set");
    return [];
  }

  // Check cache
  const cacheKey = animeName.toLowerCase().trim();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.recommendations;
  }

  const recommendations = await callGroqWithRetry(apiKey, animeName, synopsis);

  // Cache successful results to prevent hammering the API
  if (recommendations.length > 0) {
    cache.set(cacheKey, { recommendations, timestamp: Date.now() });
  }

  return recommendations;
}
