import React from "react";
import type { RichText } from "./types";

export function renderRichText(richTexts: RichText[]): React.ReactNode {
  if (!richTexts || richTexts.length === 0) return null;

  return richTexts.map((text, i) => {
    let content: React.ReactNode = text.plain_text;

    if (text.annotations.bold) {
      content = <strong key={`b-${i}`}>{content}</strong>;
    }
    if (text.annotations.italic) {
      content = <em key={`i-${i}`}>{content}</em>;
    }
    if (text.annotations.strikethrough) {
      content = <s key={`s-${i}`}>{content}</s>;
    }
    if (text.annotations.underline) {
      content = <u key={`u-${i}`}>{content}</u>;
    }
    if (text.annotations.code) {
      content = (
        <code key={`c-${i}`} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
          {content}
        </code>
      );
    }

    if (text.href) {
      content = (
        <a
          key={`a-${i}`}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[0.5px] underline-offset-3 hover:decoration-[1px] text-[#1C1C1C] transition-all"
        >
          {content}
        </a>
      );
    }

    if (text.annotations.color && text.annotations.color !== "default") {
      const colorMap: Record<string, string> = {
        gray: "text-gray-500",
        brown: "text-amber-700",
        orange: "text-orange-500",
        yellow: "text-yellow-600",
        green: "text-green-600",
        blue: "text-blue-500",
        purple: "text-purple-500",
        pink: "text-pink-500",
        red: "text-red-500",
        gray_background: "bg-gray-100",
        brown_background: "bg-amber-50",
        orange_background: "bg-orange-50",
        yellow_background: "bg-yellow-50",
        green_background: "bg-green-50",
        blue_background: "bg-blue-50",
        purple_background: "bg-purple-50",
        pink_background: "bg-pink-50",
        red_background: "bg-red-50",
      };
      const cls = colorMap[text.annotations.color];
      if (cls) {
        content = (
          <span key={`color-${i}`} className={cls}>
            {content}
          </span>
        );
      }
    }

    return <React.Fragment key={i}>{content}</React.Fragment>;
  });
}
