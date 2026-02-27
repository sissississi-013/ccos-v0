"use client";

import type { NotionBlock } from "@/lib/notion/types";
import { TranslatedRichText } from "@/components/translation/TranslatedRichText";

const styles: Record<number, string> = {
  1: "text-2xl font-light mt-10 mb-4",
  2: "text-xl font-light mt-8 mb-3",
  3: "text-lg font-normal mt-6 mb-2",
};

export function Heading({ block, level }: { block: NotionBlock; level: 1 | 2 | 3 }) {
  const key = `heading_${level}` as const;
  const richText = block[key]?.rich_text ?? [];
  const content = <TranslatedRichText richTexts={richText} />;

  if (level === 1) return <h1 className={styles[1]}>{content}</h1>;
  if (level === 2) return <h2 className={styles[2]}>{content}</h2>;
  return <h3 className={styles[3]}>{content}</h3>;
}
