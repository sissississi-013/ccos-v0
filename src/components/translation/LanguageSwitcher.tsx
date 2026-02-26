"use client";

import { useState } from "react";
import { useTranslation } from "./TranslationProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setLanguage(customInput.trim().toLowerCase());
      setShowInput(false);
      setCustomInput("");
    }
  };

  return (
    <div className="flex items-center gap-3 text-xs lowercase tracking-wide">
      <button
        onClick={() => setLanguage("en")}
        className={`transition-colors ${
          language === "en" ? "text-[#1C1C1C]" : "text-[#bbb] hover:text-[#777]"
        }`}
      >
        en
      </button>
      <span className="text-[#ddd]">/</span>
      <button
        onClick={() => setLanguage("zh")}
        className={`transition-colors ${
          language === "zh" ? "text-[#1C1C1C]" : "text-[#bbb] hover:text-[#777]"
        }`}
      >
        cn
      </button>
      <span className="text-[#ddd]">/</span>
      <button
        onClick={() => setShowInput(!showInput)}
        className={`transition-colors ${
          !["en", "zh"].includes(language) ? "text-[#1C1C1C]" : "text-[#bbb] hover:text-[#777]"
        }`}
      >
        ?
      </button>
      {showInput && (
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-1.5">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="pirate, uwu..."
            className="w-24 px-2 py-0.5 text-xs border-b border-[#ddd] bg-transparent focus:outline-none focus:border-[#777] lowercase"
            autoFocus
          />
        </form>
      )}
    </div>
  );
}
