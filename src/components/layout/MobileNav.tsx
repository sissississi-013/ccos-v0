"use client";

import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";

export function MobileNav() {
  const activeSection = useActiveSection();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden gap-4 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-[#eee]">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label={`Scroll to ${section.label}`}
          >
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
