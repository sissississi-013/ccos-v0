"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface ScrollRowProps {
  children: React.ReactNode;
  color?: string;
}

export function ScrollRow({ children, color = "#999" }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollWidth - el.scrollLeft - el.clientWidth > 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {children}
      </div>

      {/* Right fade gradient */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-20 transition-opacity duration-300"
        style={{
          opacity: canScrollRight ? 1 : 0,
          background: "linear-gradient(to right, transparent, var(--fade-bg, white))",
        }}
      />

      {/* Subtle arrow below content */}
      <div
        className="flex justify-end pt-2 pr-1 transition-opacity duration-300"
        style={{ opacity: canScrollRight ? 1 : 0 }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 5h14M11 1l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}
