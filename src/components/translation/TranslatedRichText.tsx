"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "./TranslationProvider";
import { renderRichText } from "@/lib/notion/richtext";
import type { RichText } from "@/lib/notion/types";

export function TranslatedRichText({ richTexts }: { richTexts: RichText[] }) {
  const { language, translate } = useTranslation();
  const plainText = richTexts.map((t) => t.plain_text).join("");
  const [translated, setTranslated] = useState(plainText);

  useEffect(() => {
    if (language === "en") {
      setTranslated(plainText);
      return;
    }
    let cancelled = false;
    translate(plainText).then((result) => {
      if (!cancelled) setTranslated(result);
    });
    return () => {
      cancelled = true;
    };
  }, [plainText, language, translate]);

  if (language === "en") {
    return <>{renderRichText(richTexts)}</>;
  }

  return <>{translated}</>;
}
