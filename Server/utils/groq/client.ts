import { logger } from "../logger.js";
import { buildSystemPrompt, buildUserPrompt } from "./prompts.js";
import { parseRecommendations } from "./parse.js";
import type { Recommendation } from "./types.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;
const FETCH_TIMEOUT_MS = 15_000; // 15 seconds

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callGroqWithRetry(
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
      const message =
        (err as Error).name === "AbortError"
          ? `Groq API timed out after ${FETCH_TIMEOUT_MS}ms`
          : `Groq API network error: ${(err as Error).message}`;
      logger.error(`${message} (attempt ${attempt + 1}/${MAX_RETRIES})`);

      if (attempt < MAX_RETRIES - 1) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await sleep(delay);
        continue;
      }
      return [];
    }

    if (response.status === 429) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      logger.warn(
        `Groq rate limited (attempt ${attempt + 1}/${MAX_RETRIES}), retrying in ${delay}ms...`
      );
      await sleep(delay);
      continue;
    }

    if (response.status === 401) {
      logger.error("Groq API authentication failed — check your GROQ_API_KEY in .env");
      return [];
    }

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "unable to read body");
      logger.error(`Groq API error ${response.status}: ${errorBody}`);
      return [];
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      logger.error("No text in Groq response");
      return [];
    }

    return parseRecommendations(text);
  }

  logger.error("Groq API: max retries exceeded");
  return [];
}
