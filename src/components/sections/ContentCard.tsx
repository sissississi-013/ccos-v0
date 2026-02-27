"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/translation/T";
import { MediaPreview } from "@/components/media/MediaPreview";

interface ContentCardProps {
  title: string;
  description: string;
  cover: string | null;
  media?: string;
  tags: string[];
  date: string;
  href: string;
  color: string;
  index: number;
}

export function ContentCard({
  title,
  description,
  cover,
  media,
  tags,
  date,
  href,
  color,
  index,
}: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="h-full"
    >
      <Link href={href} className="group flex flex-col h-full">
        {media ? (
          <div className="mb-3">
            <MediaPreview src={media} alt={title} mode="card" />
          </div>
        ) : cover ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#faf9f7] mb-3">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ) : null}
        <div className="flex flex-col flex-1">
          <h3 className="notion-content text-[15px] font-normal mb-1 group-hover:underline decoration-[0.5px] underline-offset-4">
            <T>{title}</T>
          </h3>
          {description && (
            <p className="notion-content text-[13px] text-[#777] mb-2">
              <T>{description}</T>
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap font-sans mt-auto">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] lowercase"
                style={{ color }}
              >
                {tag}
              </span>
            ))}
            {date && (
              <span className="text-[10px] text-[#bbb]">{date}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
