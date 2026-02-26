"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  translate: async (text) => text,
  isTranslating: false,
});

export function useTranslation() {
  return useContext(TranslationContext);
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [cache] = useState(() => new Map<string, string>());

  const translate = useCallback(
    async (text: string): Promise<string> => {
      if (language === "en") return text;

      const cacheKey = `${language}:${text}`;
      if (cache.has(cacheKey)) return cache.get(cacheKey)!;

      setIsTranslating(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, targetLanguage: language }),
        });
        const data = await res.json();
        const translated = data.translation || text;
        cache.set(cacheKey, translated);
        return translated;
      } catch {
        return text;
      } finally {
        setIsTranslating(false);
      }
    },
    [language, cache]
  );

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  );
}
