"use client";

import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { T } from "@/components/translation/T";

export function SideNav() {
  const activeSection = useActiveSection();

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Scroll to ${section.label}`}
          >
            <span className="absolute right-7 text-xs lowercase tracking-wide text-[#999] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <T>{section.label}</T>
            </span>
            <motion.span
              className="block rounded-full"
              animate={{
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                backgroundColor: section.color,
                opacity: isActive ? 1 : 0.35,
              }}
              whileHover={{ scale: 1.4, opacity: 0.8 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          </button>
        );
      })}
    </nav>
  );
}
