"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ArtItem } from "@/lib/notion/types";
import { T } from "@/components/translation/T";
import { Lightbox } from "./Lightbox";

interface ArtGalleryProps {
  items: ArtItem[];
  color: string;
}

export function ArtGallery({ items, color }: ArtGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % items.length : null
    );
  }, [items.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + items.length) % items.length : null
    );
  }, [items.length]);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {items.map((item, i) => {
          const src = item.media || item.cover;
          if (!src) return null;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06, ease: "easeOut" }}
              viewport={{ once: true, margin: "-40px" }}
              className="mb-4 break-inside-avoid"
            >
              <button
                onClick={() => openLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-sm cursor-pointer"
              >
                <Image
                  src={src}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized={src.includes("amazonaws.com")}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-sm font-medium leading-snug notion-content drop-shadow-md">
                    <T>{item.title}</T>
                  </p>
                  {item.date && (
                    <p className="text-white/70 text-xs mt-1 font-sans drop-shadow-md">
                      {item.date}
                    </p>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          item={items[lightboxIndex]}
          color={color}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
          hasNext={items.length > 1}
          hasPrev={items.length > 1}
        />
      )}
    </>
  );
}
