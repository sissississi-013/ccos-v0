"use client";

import type { NotionBlock } from "@/lib/notion/types";
import { TranslatedRichText } from "@/components/translation/TranslatedRichText";

export function TodoList({ items }: { items: NotionBlock[] }) {
  return (
    <ul className="space-y-1 my-2">
      {items.map((item) => {
        const checked = item.to_do?.checked ?? false;
        const richText = item.to_do?.rich_text ?? [];
        return (
          <li key={item.id} className="flex items-start gap-2">
            <span className={`mt-1 w-4 h-4 flex-shrink-0 rounded border inline-flex items-center justify-center ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}>
              {checked && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </span>
            <span className={`text-base leading-[1.7] ${checked ? "line-through text-gray-400" : "text-[#333]"}`}>
              <TranslatedRichText richTexts={richText} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
