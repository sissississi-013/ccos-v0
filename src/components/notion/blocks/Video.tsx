import type { NotionBlock } from "@/lib/notion/types";

export function Video({ block }: { block: NotionBlock }) {
  const video = block.video;
  if (!video) return null;

  const url = video.type === "external" ? video.external?.url : video.file?.url;
  if (!url) return null;

  // YouTube/Vimeo embed
  if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com")) {
    let embedUrl = url;
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    return (
      <div className="my-6 aspect-video rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  return (
    <video controls className="w-full my-6 rounded-lg">
      <source src={url} />
    </video>
  );
}
