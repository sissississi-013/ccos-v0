"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface ScrollGridProps {
  children: React.ReactNode;
  color?: string;
}

export function ScrollGrid({ children, color = "#999" }: ScrollGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScroll(el.scrollHeight - el.scrollTop - el.clientHeight > 2);
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
        className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto scrollbar-hide"
      >
        {children}
      </div>

      {/* Bottom fade gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-16 transition-opacity duration-300"
        style={{
          opacity: canScroll ? 1 : 0,
          background: "linear-gradient(to bottom, transparent, var(--fade-bg, white))",
        }}
      />

      {/* Vertical double-sided arrow below */}
      <div
        className="flex justify-center pt-3 transition-opacity duration-300"
        style={{ opacity: canScroll ? 1 : 0 }}
      >
        <svg width="10" height="22" viewBox="0 0 10 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 1l-3.5 3.5M5 1l3.5 3.5M5 1v20M5 21l-3.5-3.5M5 21l3.5-3.5" />
        </svg>
      </div>
    </div>
  );
}
