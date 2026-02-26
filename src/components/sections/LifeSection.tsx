"use client";

import { SectionWrapper } from "./SectionWrapper";
import { ContentCard } from "./ContentCard";
import type { LifeItem } from "@/lib/notion/types";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[4];

export function LifeSection({ items }: { items: LifeItem[] }) {
  return (
    <SectionWrapper id={section.id} label={section.label} color={section.color}>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24">
        {items.map((item, i) => (
          <div key={item.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-start shrink-0">
            <ContentCard
              title={item.title}
              description={item.description}
              cover={item.cover}
              tags={item.tags}
              date={item.date}
              href={`/life/${item.slug}`}
              color={section.color}
              index={i}
            />
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-sm text-[#bbb] italic">Nothing here yet.</p>
      )}
    </SectionWrapper>
  );
}
