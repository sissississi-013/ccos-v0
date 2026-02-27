"use client";

import type { NotionBlock } from "@/lib/notion/types";

export function Equation({ block }: { block: NotionBlock }) {
  const expression = block.equation?.expression;
  if (!expression) return null;

  return (
    <div className="my-4 py-3 flex justify-center overflow-x-auto">
      <code className="text-base font-mono text-[#333] bg-gray-50 px-4 py-2 rounded">
        {expression}
      </code>
    </div>
  );
}
