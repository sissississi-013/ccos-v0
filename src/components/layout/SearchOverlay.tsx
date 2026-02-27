"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { SECTIONS } from "@/lib/constants";

interface SearchOverlayProps {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return SECTIONS.map((s) => ({ ...s, type: "section" as const }));
    const q = query.toLowerCase();
    return SECTIONS.filter((s) => s.label.toLowerCase().includes(q)).map((s) => ({ ...s, type: "section" as const }));
  }, [query]);

  const handleSelect = useCallback((id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[selectedIdx]) { handleSelect(results[selectedIdx].id); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, results, selectedIdx, handleSelect]);

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ fontSize: "16px" }}
      onClick={onClose}
    >
      {/* Dim backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Spotlight card */}
      <div className="relative flex justify-center pt-[18vh]">
        <div
          className="w-full max-w-[560px] mx-6 rounded-xl bg-white/95 backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "0 16px 70px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-[#1C1C1C] placeholder:text-[#999]"
              style={{ fontSize: "16px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e5e5e5]" />

          {/* Results */}
          <div className="py-1.5 max-h-[320px] overflow-y-auto">
            {results.length > 0 ? (
              results.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors ${
                    i === selectedIdx ? "bg-[#007AFF] text-white" : "text-[#1C1C1C] hover:bg-[#f0f0f0]"
                  }`}
                  onMouseEnter={() => setSelectedIdx(i)}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: i === selectedIdx ? "white" : item.color }}
                  />
                  <span
                    className="lowercase"
                    style={{ fontSize: "14px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
                  >
                    {item.label}
                  </span>
                </button>
              ))
            ) : (
              <p
                className="px-4 py-3 text-[#999] italic"
                style={{ fontSize: "14px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
              >
                No results
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
