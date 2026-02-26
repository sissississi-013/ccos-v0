"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/lib/constants";
import { T } from "@/components/translation/T";

interface SectionWrapperProps {
  id: SectionId;
  label: string;
  color: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, label, color, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className="px-6 py-16 md:px-12 md:py-20 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <h2
          className="text-lg font-light tracking-wide lowercase mb-10 text-[#999]"
        >
          <T>{label}</T>
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
