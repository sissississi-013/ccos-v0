export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string | null;
  tags: string[];
  date: string;
  lastEdited: string;
}

export interface BlogItem extends ContentItem {
  readingTime?: string;
}

export interface ProjectItem extends ContentItem {
  link?: string;
  github?: string;
  status?: string;
}

export interface ArtItem extends ContentItem {
  medium?: string;
}

export interface ResearchItem extends ContentItem {
  venue?: string;
  pdf?: string;
}

export interface LifeItem extends ContentItem {}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface RichText {
  type: string;
  text?: { content: string; link: { url: string } | null };
  mention?: { type: string };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}
