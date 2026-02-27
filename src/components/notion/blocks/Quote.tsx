"use client";

import type { NotionBlock } from "@/lib/notion/types";
import { TranslatedRichText } from "@/components/translation/TranslatedRichText";

export function Quote({ block }: { block: NotionBlock }) {
  return (
    <blockquote className="border-l-[2px] border-[#ddd] pl-4 py-1 my-4 text-[#777] italic">
      <TranslatedRichText richTexts={block.quote?.rich_text ?? []} />
    </blockquote>
  );
}
