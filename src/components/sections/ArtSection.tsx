"use client";

import { SectionWrapper } from "./SectionWrapper";
import { ArtGallery } from "@/components/gallery/ArtGallery";
import { T } from "@/components/translation/T";
import type { ArtItem } from "@/lib/notion/types";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[3];

export function ArtSection({ items }: { items: ArtItem[] }) {
  return (
    <SectionWrapper id={section.id} label={section.label} color={section.color}>
      {items.length > 0 ? (
        <ArtGallery items={items} color={section.color} />
      ) : (
        <p className="text-sm text-[#bbb] italic"><T>Nothing here yet.</T></p>
      )}
    </SectionWrapper>
  );
}
