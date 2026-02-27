"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { T } from "@/components/translation/T";
import type { LifeItem } from "@/lib/notion/types";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[4];

export function LifeSection({ items }: { items: LifeItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);

  const types = useMemo(() => {
    const seen = new Set<string>();
    for (const item of items) {
      if (item.type) seen.add(item.type);
    }
    return Array.from(seen).sort();
  }, [items]);

  const filtered = activeType
    ? items.filter((item) => item.type === activeType)
    : items;

  const handleTypeClick = (type: string) => {
    setActiveType(activeType === type ? null : type);
  };

  return (
    <section
      id={section.id}
      className="px-6 py-16 md:px-12 md:py-20 lg:px-24 section-colored"
      style={{ "--section-color": section.color } as React.CSSProperties}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-10">
          <button
            onClick={() => {
              setExpanded(!expanded);
              if (expanded) setActiveType(null);
            }}
            className="text-lg font-light tracking-wide lowercase text-[#999] hover:text-[var(--section-color)] transition-colors duration-300 font-sans cursor-pointer"
          >
            <T>{section.label}</T>
            <span className={`inline-block ml-2 text-sm transition-transform ${expanded ? "rotate-90" : ""}`}>
              &rsaquo;
            </span>
          </button>

          <AnimatePresence>
            {expanded && types.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex gap-3 mt-4 flex-wrap font-sans">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeClick(type)}
                      className={`text-xs lowercase tracking-wide px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                        activeType === type
                          ? "border-[#FFD93D] text-[#1C1C1C] bg-[#FFD93D15]"
                          : "border-[#eee] text-[#999] hover:border-[#ccc] hover:text-[#777]"
                      }`}
                    >
                      <T>{type}</T>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  <Link href={`/life/${item.slug}`} className="group block">
                    {item.date && (
                      <span className="text-xs text-[#bbb] tabular-nums">{item.date}</span>
                    )}
                    <h3 className="notion-content text-base group-hover:underline decoration-[0.5px] underline-offset-4 mt-0.5 text-[#B8860B]">
                      <T>{item.title}</T>
                    </h3>
                    {item.description && (
                      <p className="notion-content text-sm text-[#777] mt-1">
                        <T>{item.description}</T>
                      </p>
                    )}
                    {item.type && (
                      <span className="text-[10px] text-[#bbb] font-sans mt-1 inline-block">{item.type}</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-[#bbb] italic"><T>Nothing here yet.</T></p>
        )}
      </motion.div>
    </section>
  );
}
