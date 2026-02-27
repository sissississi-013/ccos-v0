"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
  textSize: number;
  increaseText: () => void;
  decreaseText: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleDark: () => {},
  textSize: 18,
  increaseText: () => {},
  decreaseText: () => {},
});

const TEXT_SIZES = [16, 18, 20, 22, 24];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [textSize, setTextSize] = useState(18);

  useEffect(() => {
    const savedDark = localStorage.getItem("theme-dark");
    const savedSize = localStorage.getItem("theme-text-size");
    if (savedDark === "true") setDark(true);
    if (savedSize) setTextSize(Number(savedSize));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme-dark", String(dark));
  }, [dark]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      (main as HTMLElement).style.zoom = String(textSize / 16);
    }
    localStorage.setItem("theme-text-size", String(textSize));
  }, [textSize]);

  const toggleDark = useCallback(() => setDark((d) => !d), []);

  const increaseText = useCallback(() => {
    setTextSize((s) => {
      const idx = TEXT_SIZES.indexOf(s);
      return idx < TEXT_SIZES.length - 1 ? TEXT_SIZES[idx + 1] : s;
    });
  }, []);

  const decreaseText = useCallback(() => {
    setTextSize((s) => {
      const idx = TEXT_SIZES.indexOf(s);
      return idx > 0 ? TEXT_SIZES[idx - 1] : s;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark, textSize, increaseText, decreaseText }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
