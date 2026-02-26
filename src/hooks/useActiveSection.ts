"use client";

import { useEffect, useState, useRef } from "react";
import { SECTIONS } from "@/lib/constants";
import type { SectionId } from "@/lib/constants";

export function useActiveSection(): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const visibleSections = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.current.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.current.delete(entry.target.id);
          }
        });

        // Pick the section with the highest visibility ratio
        let best: string | null = null;
        let bestRatio = 0;
        visibleSections.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (best) {
          setActiveSection(best as SectionId);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
