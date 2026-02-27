"use client";

import { useEffect, useState, useCallback } from "react";
import { SECTIONS } from "@/lib/constants";
import type { SectionId } from "@/lib/constants";

export function useActiveSection(): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const update = useCallback(() => {
    const viewportMiddle = window.innerHeight / 3;
    let closest: SectionId | null = null;
    let closestDist = Infinity;

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) continue;
      const dist = Math.abs(rect.top - viewportMiddle);
      if (dist < closestDist) {
        closestDist = dist;
        closest = section.id;
      }
    }

    if (closest) setActiveSection(closest);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  return activeSection;
}
