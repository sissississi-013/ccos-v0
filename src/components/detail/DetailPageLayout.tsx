"use client";

import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/translation/T";
import { MediaPreview } from "@/components/media/MediaPreview";

interface DetailPageLayoutProps {
  title: string;
  cover: string | null;
  media?: string;
  tags: string[];
  date: string;
  color: string;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}

export function DetailPageLayout({
  title,
  cover,
  media,
  tags,
  date,
  color,
  backHref,
  backLabel,
  children,
}: DetailPageLayoutProps) {
  return (
    <article className="min-h-screen pt-24 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs lowercase tracking-wide text-[#bbb] hover:text-[#777] mb-12 transition-colors font-sans"
        >
          <span>&larr;</span> <T>{backLabel}</T>
        </Link>

        {media ? (
          <MediaPreview src={media} alt={title} mode="detail" />
        ) : cover ? (
          <div className="relative w-full aspect-[2/1] rounded overflow-hidden mb-8">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        ) : null}

        <h1 className="notion-content text-2xl md:text-3xl font-light mb-3"><T>{title}</T></h1>

        <div className="flex items-center gap-3 mb-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs lowercase tracking-wide font-sans"
              style={{ color }}
            >
              {tag}
            </span>
          ))}
          {date && <span className="text-xs text-[#bbb] font-sans">{date}</span>}
        </div>

        <div>{children}</div>
      </div>
    </article>
  );
}
