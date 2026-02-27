"use client";

import { useState, useRef, useEffect } from "react";
import { LanguageSwitcher } from "@/components/translation/LanguageSwitcher";
import { useTheme } from "@/hooks/useTheme";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const { dark, toggleDark, increaseText, decreaseText } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 right-0 z-50 transition-transform duration-300"
        style={{ transform: visible ? "translateY(0)" : "translateY(-100%)", fontSize: "16px" }}
      >
        <div className="flex items-center gap-4 px-6 py-4 md:px-12">
          <div className="flex items-center gap-1" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
            <button
              onClick={decreaseText}
              className="text-[#666] hover:text-[#1C1C1C] transition-colors cursor-pointer px-1"
              style={{ fontSize: "11px" }}
              aria-label="Decrease text size"
            >
              A-
            </button>
            <span className="text-[#ccc]" style={{ fontSize: "10px" }}>/</span>
            <button
              onClick={increaseText}
              className="text-[#666] hover:text-[#1C1C1C] transition-colors cursor-pointer px-1"
              style={{ fontSize: "13px" }}
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          <button
            onClick={toggleDark}
            className="text-[#666] hover:text-[#1C1C1C] transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="text-[#666] hover:text-[#1C1C1C] transition-colors cursor-pointer"
            aria-label="Search"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <LanguageSwitcher />
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
