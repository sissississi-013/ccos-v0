import type { NotionBlock } from "@/lib/notion/types";

export function Bookmark({ block }: { block: NotionBlock }) {
  const url = block.bookmark?.url || block.link_preview?.url;
  if (!url) return null;

  const caption = block.bookmark?.caption?.[0]?.plain_text;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <span className="text-sm text-blue-600 underline break-all">{url}</span>
      {caption && <p className="text-xs text-gray-400 mt-1">{caption}</p>}
    </a>
  );
}
