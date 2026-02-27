"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { T } from "@/components/translation/T";
import type { BlogItem } from "@/lib/notion/types";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[0];

export function BlogSection({ items }: { items: BlogItem[] }) {
  return (
    <SectionWrapper id={section.id} label={section.label} color={section.color}>
      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        <div className="space-y-5">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${item.slug}`} className="group block">
                {item.date && (
                  <span className="text-xs text-[#bbb] tabular-nums">{item.date}</span>
                )}
                <h3 className="notion-content text-base text-[#2563EB] group-hover:underline decoration-[0.5px] underline-offset-4 mt-0.5">
                  <T>{item.title}</T>
                </h3>
                {item.description && (
                  <p className="notion-content text-sm text-[#777] mt-1">
                    <T>{item.description}</T>
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-[#bbb] italic"><T>Nothing here yet.</T></p>
      )}
    </SectionWrapper>
  );
}
