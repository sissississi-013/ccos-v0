import type { NotionBlock } from "@/lib/notion/types";

export function FileBlock({ block }: { block: NotionBlock }) {
  const fileData = block.file || block.pdf;
  if (!fileData) return null;

  const url =
    fileData.type === "external"
      ? fileData.external?.url
      : fileData.file?.url;
  if (!url) return null;

  const caption = fileData.caption?.[0]?.plain_text;
  const isPdf = block.type === "pdf" || url.toLowerCase().includes(".pdf");

  if (isPdf) {
    return (
      <figure className="my-6">
        <div className="relative w-full overflow-hidden rounded-lg border border-gray-200" style={{ height: "600px" }}>
          <iframe
            src={url}
            className="w-full h-full border-0"
            title={caption || "PDF document"}
          />
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-gray-400 mt-2">{caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <div className="my-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm text-[#444]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        {caption || "Download file"}
      </a>
    </div>
  );
}
