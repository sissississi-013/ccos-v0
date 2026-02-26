"use client";

import { useState } from "react";
import type { NotionBlock } from "@/lib/notion/types";
import { renderRichText } from "@/lib/notion/richtext";
import { NotionRenderer } from "../NotionRenderer";

export function Toggle({ block }: { block: NotionBlock }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="my-2 group"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer list-none flex items-center gap-2 font-medium hover:text-gray-600">
        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
        {renderRichText(block.toggle?.rich_text ?? [])}
      </summary>
      <div className="pl-6 mt-2">
        {block.children && <NotionRenderer blocks={block.children} />}
      </div>
    </details>
  );
}
