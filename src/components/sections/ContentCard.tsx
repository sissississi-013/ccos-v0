"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  cover: string | null;
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
    >
      <Link href={href} className="group block">
        <div className="transition-all duration-300">
          {cover && (
            <div className="relative aspect-[16/10] overflow-hidden rounded bg-[#faf9f7] mb-3">
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div>
            <h3 className="text-base font-normal mb-1 group-hover:underline decoration-[0.5px] underline-offset-4">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-[#777] mb-2 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#777] lowercase"
                  style={{ color }}
                >
                  {tag}
                </span>
              ))}
              {date && (
                <span className="text-xs text-[#bbb]">{date}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
