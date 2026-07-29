const MAX_SYNOPSIS_LENGTH = 500;

export function buildSystemPrompt(): string {
  return `You are a bilingual (English/Japanese) anime recommendation engine. You return ONLY valid JSON arrays with no extra text, no markdown, no code blocks.

CRITICAL LANGUAGE RULE: Every response MUST contain both English AND Japanese text in the designated fields. The input anime title may be in English — this does NOT mean you should respond only in English. You must ALWAYS provide Japanese translations regardless of the input language.`;
}

export function buildUserPrompt(animeName: string, synopsis: string): string {
  const cleanSynopsis = synopsis.slice(0, MAX_SYNOPSIS_LENGTH);

  return `Given this anime, suggest 5 similar anime the user would enjoy.

Anime: ${animeName}
Synopsis: ${cleanSynopsis}

Return ONLY a JSON array with exactly 5 objects. Each object must have these 4 fields:
- "title": The anime's English title (e.g. "Attack on Titan")
- "japanese_title": The anime's official Japanese title written in Japanese script (e.g. "進撃の巨人"). This MUST use Japanese characters (kanji/hiragana/katakana), NEVER romaji or English.
- "reason": 1-2 sentence explanation in English why the user would enjoy this anime and why it's similar to the input anime.
- "reason_jp": The SAME explanation as "reason" but written ENTIRELY in Japanese (日本語で書くこと). This field MUST be in Japanese using Japanese script — not English, not romaji.

⚠ STRICT LANGUAGE RULES — VIOLATIONS WILL BE REJECTED:
1. "japanese_title" MUST contain Japanese characters (漢字・ひらがな・カタカナ). Never copy the English title here.
2. "reason_jp" MUST be written entirely in Japanese (日本語). Even if the input anime title is in English, you MUST still write reason_jp in Japanese. Never leave it in English. Never use romaji.
3. "title" and "reason" MUST be in English.
4. Every object must have all 4 fields with the correct language.

Do not include the original anime as a recommendation. Only recommend real, existing anime. Do include the original anime in the "reason" field as a reason why the user would enjoy it.
Return ONLY the raw JSON array.`;
}
