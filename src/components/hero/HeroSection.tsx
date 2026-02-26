"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="flex items-end px-6 md:px-12 lg:px-24 pt-32 pb-16 md:pt-40 md:pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-light tracking-wide lowercase text-[#1C1C1C]">
          Sissi Wang
        </h1>
      </motion.div>
    </section>
  );
}
