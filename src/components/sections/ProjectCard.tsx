"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/translation/T";
import { MediaPreview } from "@/components/media/MediaPreview";

interface ProjectCardProps {
  title: string;
  description: string;
  cover: string | null;
  media?: string;
  tags: string[];
  href: string;
  color: string;
  index: number;
  github?: string;
  link?: string;
}

export function ProjectCard({
  title,
  description,
  cover,
  media,
  tags,
  href,
  color,
  index,
  github,
  link,
}: ProjectCardProps) {
  const src = media || cover;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col h-full"
    >
      {/* Media with hover overlay */}
      {src && (
        <div className="group/media relative overflow-hidden rounded-sm bg-[#faf9f7]">
          <div className="aspect-[4/3] relative">
            {media ? (
              <MediaPreview src={media} alt={title} mode="card" />
            ) : (
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized={src.includes("amazonaws.com")}
              />
            )}
          </div>

          {/* Hover overlay with icons */}
          <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/45 transition-all duration-300 flex items-start justify-end gap-3 p-3 opacity-0 group-hover/media:opacity-100">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/90 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            ) : (
              <span className="text-white/30">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </span>
            )}
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/90 hover:text-white transition-colors"
                aria-label="Live link"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
              </a>
            ) : (
              <span className="text-white/30">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Info box below media */}
      <Link href={href} className="group block mt-3 flex-1">
        <h3 className="notion-content text-[15px] font-medium group-hover:underline decoration-[0.5px] underline-offset-4">
          <T>{title}</T>
        </h3>
        {description && (
          <p className="notion-content text-[13px] text-[#777] mt-1 line-clamp-2">
            <T>{description}</T>
          </p>
        )}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] lowercase font-sans px-1.5 py-0.5 rounded"
                style={{ color, backgroundColor: `${color}12` }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
