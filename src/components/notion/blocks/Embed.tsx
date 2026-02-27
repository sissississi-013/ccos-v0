import type { NotionBlock } from "@/lib/notion/types";

export function Embed({ block }: { block: NotionBlock }) {
  const url = block.embed?.url;
  if (!url) return null;

  const caption = block.embed?.caption?.[0]?.plain_text;

  return (
    <figure className="my-6">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}
