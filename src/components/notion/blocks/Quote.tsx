import type { NotionBlock } from "@/lib/notion/types";
import { renderRichText } from "@/lib/notion/richtext";

export function Quote({ block }: { block: NotionBlock }) {
  return (
    <blockquote className="border-l-[2px] border-[#ddd] pl-4 py-1 my-4 text-[#777] italic">
      {renderRichText(block.quote?.rich_text ?? [])}
    </blockquote>
  );
}
