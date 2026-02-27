"use client";

import { motion } from "framer-motion";

const name = "Sissi Wang";

const palette = [
  "#FFB3BA", // soft pink
  "#FFDFBA", // peach
  "#FFFFBA", // soft yellow
  "#BAFFC9", // mint
  "#BAE1FF", // sky blue
  "#D4BAFF", // lavender
  "#FFB3DE", // rose
  "#B5EAD7", // sage
  "#C7CEEA", // periwinkle
];

export function HeroSection() {
  return (
    <section className="flex items-end px-6 md:px-12 lg:px-24 pt-32 pb-16 md:pt-40 md:pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-light tracking-wide lowercase text-[#1C1C1C]">
          {name.split("").map((char, i) => (
            <span
              key={i}
              className="rainbow-char"
              style={{ "--sel-bg": palette[i % palette.length] } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
        </h1>
      </motion.div>
    </section>
  );
}
