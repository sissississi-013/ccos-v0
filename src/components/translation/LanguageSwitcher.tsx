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
    <div
      className="flex items-center gap-3 lowercase tracking-wide"
      style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontSize: "12px" }}
    >
      <button
        onClick={() => setLanguage("en")}
        className={`transition-colors cursor-pointer ${
          language === "en" ? "text-[#1C1C1C]" : "text-[#999] hover:text-[#555]"
        }`}
      >
        en
      </button>
      <span className="text-[#ccc]">/</span>
      <button
        onClick={() => setLanguage("zh")}
        className={`transition-colors cursor-pointer ${
          language === "zh" ? "text-[#1C1C1C]" : "text-[#999] hover:text-[#555]"
        }`}
      >
        cn
      </button>
      <span className="text-[#ccc]">/</span>
      <button
        onClick={() => setShowInput(!showInput)}
        className={`transition-colors cursor-pointer ${
          !["en", "zh"].includes(language) ? "text-[#1C1C1C]" : "text-[#999] hover:text-[#555]"
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
            className="w-24 px-2 py-0.5 border-b border-[#ddd] bg-transparent focus:outline-none focus:border-[#777] lowercase"
            style={{ fontSize: "12px" }}
            autoFocus
          />
        </form>
      )}
    </div>
  );
}
