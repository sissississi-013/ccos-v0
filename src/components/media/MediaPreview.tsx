"use client";

import Image from "next/image";

type MediaType = "video" | "pdf" | "image";

function detectMediaType(url: string): MediaType {
  const lower = url.toLowerCase();
  const path = lower.split("?")[0];
  if (/\.(mp4|webm|mov|ogg)(\/|$)/.test(path) || path.includes("/mp4") || lower.includes(".mp4")) return "video";
  if (/\.pdf(\/|$)/.test(path) || lower.includes(".pdf")) return "pdf";
  return "image";
}

interface MediaPreviewProps {
  src: string;
  alt: string;
  mode: "card" | "detail";
}

export function MediaPreview({ src, alt, mode }: MediaPreviewProps) {
  const type = detectMediaType(src);

  if (mode === "card") {
    return <CardPreview src={src} alt={alt} type={type} />;
  }
  return <DetailPreview src={src} alt={alt} type={type} />;
}

function CardPreview({ src, alt, type }: { src: string; alt: string; type: MediaType }) {
  switch (type) {
    case "video":
      return (
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#faf9f7]">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      );
    case "pdf":
      return (
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#faf9f7]">
          <object
            data={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs text-[#999] font-sans">
              PDF
            </div>
          </object>
        </div>
      );
    case "image":
      return (
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#faf9f7]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      );
  }
}

function DetailPreview({ src, alt, type }: { src: string; alt: string; type: MediaType }) {
  switch (type) {
    case "video":
      return (
        <div className="w-full rounded overflow-hidden mb-8">
          <video
            src={src}
            controls
            playsInline
            className="w-full"
          />
        </div>
      );
    case "pdf":
      return (
        <div className="w-full aspect-[8.5/11] rounded overflow-hidden mb-8 bg-[#faf9f7]">
          <iframe
            src={`${src}#toolbar=1&navpanes=0`}
            className="w-full h-full border-0"
            title={alt}
          />
        </div>
      );
    case "image":
      return (
        <div className="relative w-full aspect-[2/1] rounded overflow-hidden mb-8">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
      );
  }
}
