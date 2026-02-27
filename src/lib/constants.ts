export const SECTIONS = [
  {
    id: "blogs",
    label: "Blogs",
    color: "#FF6B35",
    colorName: "section-orange",
    route: "/blog",
    dbEnvKey: "NOTION_BLOG_DB",
  },
  {
    id: "projects",
    label: "Projects",
    color: "#4ECB71",
    colorName: "section-green",
    route: "/project",
    dbEnvKey: "NOTION_PROJECT_DB",
  },
  {
    id: "research",
    label: "Research",
    color: "#FF6B9D",
    colorName: "section-pink",
    route: "/research",
    dbEnvKey: "NOTION_RESEARCH_DB",
  },
  {
    id: "art",
    label: "Art",
    color: "#4A90D9",
    colorName: "section-blue",
    route: "/art",
    dbEnvKey: "NOTION_ART_DB",
  },
  {
    id: "life",
    label: "Life",
    color: "#FFD93D",
    colorName: "section-yellow",
    route: "/life",
    dbEnvKey: "NOTION_LIFE_DB",
  },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const SITE = {
  name: "Sissi Wang",
  url: "https://sissiwang.me",
  description: "Portfolio of Sissi Wang",
} as const;

export const REVALIDATE_INTERVAL = 3600; // 1 hour ISR
