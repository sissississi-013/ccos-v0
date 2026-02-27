"use client";

import type { NotionBlock } from "@/lib/notion/types";
import { TranslatedRichText } from "@/components/translation/TranslatedRichText";

export function Callout({ block }: { block: NotionBlock }) {
  const callout = block.callout;
  if (!callout) return null;

  const icon = callout.icon?.type === "emoji" ? callout.icon.emoji : "💡";

  return (
    <div className="flex gap-3 p-4 my-4 bg-gray-50 rounded-lg">
      <span className="text-xl shrink-0">{icon}</span>
      <div className="text-gray-700 leading-7">
        <TranslatedRichText richTexts={callout.rich_text ?? []} />
      </div>
    </div>
  );
}
