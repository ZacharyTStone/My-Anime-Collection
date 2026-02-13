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
const FETCH_TIMEOUT_MS = 15_000; // 15 seconds

// In-memory cache: anime title -> recommendations
const cache = new Map<
  string,
  { recommendations: Recommendation[]; timestamp: number }
>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function buildSystemPrompt(): string {
  return `You are a bilingual (English/Japanese) anime recommendation engine. You return ONLY valid JSON arrays with no extra text, no markdown, no code blocks.

CRITICAL LANGUAGE RULE: Every response MUST contain both English AND Japanese text in the designated fields. The input anime title may be in English — this does NOT mean you should respond only in English. You must ALWAYS provide Japanese translations regardless of the input language.`;
}

function buildUserPrompt(animeName: string, synopsis: string): string {
  const cleanSynopsis = synopsis.slice(0, MAX_SYNOPSIS_LENGTH);

  return `Given this anime, suggest 5 similar anime the user would enjoy.

Anime: ${animeName}
Synopsis: ${cleanSynopsis}

Return ONLY a JSON array with exactly 5 objects. Each object must have these 4 fields:
- "title": The anime's English title (e.g. "Attack on Titan")
- "japanese_title": The anime's official Japanese title written in Japanese script (e.g. "進撃の巨人"). This MUST use Japanese characters (kanji/hiragana/katakana), NEVER romaji or English.
- "reason": 1-2 sentence explanation in English why the user would enjoy this anime
- "reason_jp": The SAME explanation as "reason" but written ENTIRELY in Japanese (日本語で書くこと). This field MUST be in Japanese using Japanese script — not English, not romaji.

⚠ STRICT LANGUAGE RULES — VIOLATIONS WILL BE REJECTED:
1. "japanese_title" MUST contain Japanese characters (漢字・ひらがな・カタカナ). Never copy the English title here.
2. "reason_jp" MUST be written entirely in Japanese (日本語). Even if the input anime title is in English, you MUST still write reason_jp in Japanese. Never leave it in English. Never use romaji.
3. "title" and "reason" MUST be in English.
4. Every object must have all 4 fields with the correct language.

Do not include the original anime. Only recommend real, existing anime.
Return ONLY the raw JSON array.`;
}

/** Returns true if the string contains at least one CJK / Hiragana / Katakana character. */
function containsJapanese(str: string): boolean {
  // Hiragana: \u3040-\u309F, Katakana: \u30A0-\u30FF, CJK Unified: \u4E00-\u9FFF
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(str);
}

function parseRecommendations(text: string): Recommendation[] {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Groq response as JSON:", (err as Error).message);
    console.error("Raw response (first 500 chars):", cleaned.slice(0, 500));
    return [];
  }

  if (!Array.isArray(parsed)) {
    console.error("Groq response is not an array:", typeof parsed);
    return [];
  }

  return parsed
    .filter((item: any) => {
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
        console.warn(
          `Recommendation "${item.title}" has non-Japanese japanese_title: "${item.japanese_title}"`
        );
      }
      if (!containsJapanese(item.reason_jp)) {
        console.warn(
          `Recommendation "${item.title}" has non-Japanese reason_jp: "${item.reason_jp}"`
        );
      }

      return true;
    })
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
    temperature: 0.5,
    max_tokens: 1024,
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    let response: Response;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch (err) {
      const message = (err as Error).name === "AbortError"
        ? `Groq API timed out after ${FETCH_TIMEOUT_MS}ms`
        : `Groq API network error: ${(err as Error).message}`;
      console.error(`${message} (attempt ${attempt + 1}/${MAX_RETRIES})`);

      if (attempt < MAX_RETRIES - 1) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await sleep(delay);
        continue;
      }
      return [];
    }

    if (response.status === 429) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      console.warn(
        `Groq rate limited (attempt ${attempt + 1}/${MAX_RETRIES}), retrying in ${delay}ms...`
      );
      await sleep(delay);
      continue;
    }

    if (response.status === 401) {
      console.error("Groq API authentication failed — check your GROQ_API_KEY in .env");
      return [];
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

  console.error("Groq API: max retries exceeded");
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
