import { NextRequest, NextResponse } from "next/server";

const EASTER_EGG_LANGUAGES: Record<string, string> = {
  pirate: "You are a pirate translator. Translate UI labels into pirate speak. Use 'Arr', 'ye', 'matey' etc. Keep it SHORT — 1-3 words max for short inputs.",
  uwu: "You are a uwu translator. Replace R and L with W, keep it cute. Keep it SHORT — 1-3 words max for short inputs.",
  yoda: "You are Yoda. Rearrange into Yoda speak. Keep it SHORT — 1-3 words max for short inputs.",
  shakespearean: "You are a Shakespearean translator. Use 'thee', 'thou', 'hath'. Keep it SHORT — 1-3 words max for short inputs.",
  emoji: "Replace words with emoji. Keep it SHORT — 1-3 emoji max for short inputs.",
  cat: "You are a cat. Add 'meow'/'purr'. Keep it SHORT — 1-3 words max for short inputs.",
  robot: "You are a robot. Use 'BEEP BOOP'. Keep it SHORT — 1-3 words max for short inputs.",
};

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Missing text or targetLanguage" }, { status: 400 });
    }

    if (targetLanguage === "en") {
      return NextResponse.json({ translation: text });
    }

    const easterEgg = EASTER_EGG_LANGUAGES[targetLanguage.toLowerCase()];

    const systemPrompt = easterEgg
      ? `${easterEgg} Reply with ONLY the translated text. No explanation, no markdown, no quotes.`
      : `You are a translator. Translate into ${targetLanguage}. Reply with ONLY the translated text. No explanation, no markdown, no quotes. Match the length and tone of the original.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 100,
        system: systemPrompt,
        messages: [{ role: "user", content: text }],
      }),
    });

    const data = await res.json();
    const translation =
      data.content?.[0]?.type === "text" ? data.content[0].text.trim() : text;

    return NextResponse.json({
      translation,
      isEasterEgg: !!easterEgg,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
