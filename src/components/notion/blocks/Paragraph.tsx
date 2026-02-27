"use client";

import type { NotionBlock } from "@/lib/notion/types";
import { TranslatedRichText } from "@/components/translation/TranslatedRichText";

export function Paragraph({ block }: { block: NotionBlock }) {
  const richText = block.paragraph?.rich_text;
  if (!richText || richText.length === 0) {
    return <div className="h-4" />;
  }
  return (
    <p className="text-base leading-[1.7] text-[#333]">
      <TranslatedRichText richTexts={richText} />
    </p>
  );
}
