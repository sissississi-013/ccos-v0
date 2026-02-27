"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollGrid } from "./ScrollGrid";
import { T } from "@/components/translation/T";
import type { ResearchItem } from "@/lib/notion/types";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[2];

export function ResearchSection({ items }: { items: ResearchItem[] }) {
  return (
    <SectionWrapper id={section.id} label={section.label} color={section.color}>
      <ScrollGrid color={section.color}>
        {items.map((item, i) => {
          const src = item.media || item.cover;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              viewport={{ once: true, margin: "-40px" }}
              className="col-span-2 md:col-span-3"
            >
              <Link href={`/research/${item.slug}`} className="group flex gap-4 items-start">
                {src && (
                  <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded overflow-hidden bg-[#faf9f7]">
                    <Image
                      src={src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized={src.includes("amazonaws.com")}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="notion-content text-[15px] font-medium group-hover:underline decoration-[0.5px] underline-offset-4" style={{ color: section.color }}>
                    <T>{item.title}</T>
                  </h3>
                  {item.description && (
                    <p className="notion-content text-[13px] text-[#777] mt-1">
                      <T>{item.description}</T>
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap font-sans mt-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] lowercase" style={{ color: section.color }}>
                        {tag}
                      </span>
                    ))}
                    {item.date && (
                      <span className="text-[10px] text-[#bbb]">{item.date}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </ScrollGrid>
      {items.length === 0 && (
        <p className="text-sm text-[#bbb] italic"><T>Nothing here yet.</T></p>
      )}
    </SectionWrapper>
  );
}
