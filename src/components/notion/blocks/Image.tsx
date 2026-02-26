import NextImage from "next/image";
import type { NotionBlock } from "@/lib/notion/types";

export function NotionImage({ block }: { block: NotionBlock }) {
  const image = block.image;
  if (!image) return null;

  const src = image.type === "external" ? image.external?.url : image.file?.url;
  const caption = image.caption?.[0]?.plain_text;

  if (!src) return null;

  return (
    <figure className="my-6">
      <div className="relative w-full overflow-hidden rounded-lg">
        <NextImage
          src={src}
          alt={caption || ""}
          width={800}
          height={450}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
