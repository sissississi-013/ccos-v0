"use client";

import { SectionWrapper } from "./SectionWrapper";
import { ProjectCard } from "./ProjectCard";
import { T } from "@/components/translation/T";
import type { ProjectItem } from "@/lib/notion/types";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[1];

export function ProjectSection({ items }: { items: ProjectItem[] }) {
  return (
    <SectionWrapper id={section.id} label={section.label} color={section.color}>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {items.map((item, i) => (
            <ProjectCard
              key={item.id}
              title={item.title}
              description={item.description}
              cover={item.cover}
              media={item.media}
              tags={item.tags}
              href={`/project/${item.slug}`}
              color={section.color}
              index={i}
              github={item.github}
              link={item.link}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#bbb] italic"><T>Nothing here yet.</T></p>
      )}
    </SectionWrapper>
  );
}
