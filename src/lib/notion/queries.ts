import { notion } from "./client";
import type {
  ContentItem,
  BlogItem,
  ProjectItem,
  ArtItem,
  ResearchItem,
  LifeItem,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPlainText(property: any): string {
  if (!property) return "";
  if (property.type === "title") {
    return property.title?.map((t: { plain_text: string }) => t.plain_text).join("") ?? "";
  }
  if (property.type === "rich_text") {
    return property.rich_text?.map((t: { plain_text: string }) => t.plain_text).join("") ?? "";
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCover(page: any): string | null {
  if (page.cover?.type === "external") return page.cover.external.url;
  if (page.cover?.type === "file") return page.cover.file.url;
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTags(property: any): string[] {
  if (!property || property.type !== "multi_select") return [];
  return property.multi_select.map((t: { name: string }) => t.name);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDate(property: any): string {
  if (!property || property.type !== "date" || !property.date) return "";
  return property.date.start ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUrl(property: any): string | undefined {
  if (!property || property.type !== "url" || !property.url) return undefined;
  return property.url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFileUrl(property: any): string | undefined {
  if (!property) return undefined;
  if (property.type === "url" && property.url) return property.url;
  if (property.type === "files" && property.files?.length > 0) {
    const file = property.files[0];
    if (file.type === "file") return file.file?.url;
    if (file.type === "external") return file.external?.url;
  }
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSelect(property: any): string | undefined {
  if (!property || property.type !== "select" || !property.select) return undefined;
  return property.select.name;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStatus(property: any): string | undefined {
  if (!property || property.type !== "status" || !property.status) return undefined;
  return property.status.name;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCheckbox(property: any): boolean {
  if (!property || property.type !== "checkbox") return false;
  return !!property.checkbox;
}

function sortPinned<T extends { pinned?: boolean }>(items: T[]): T[] {
  return items.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
}

/**
 * Blog DB properties:
 *   Title (title), Publish Date (date), Tags (multi_select),
 *   Featured Image (url), SEO Keywords (multi_select), URL (url), Status (status)
 */
export async function getBlogs(): Promise<BlogItem[]> {
  const dbId = process.env.NOTION_BLOG_DB;
  if (!dbId) return [];
  try {
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      sorts: [{ property: "Publish Date", direction: "descending" }],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        slug: page.id,
        title: getPlainText(props.Title),
        description: getPlainText(props.Summary ?? props.summary) || "",
        cover: getCover(page) || getUrl(props["Featured Image"]) || null,
        tags: getTags(props.Tags),
        date: getDate(props["Publish Date"]) || page.created_time?.split("T")[0] || "",
        lastEdited: page.last_edited_time,
        pinned: getCheckbox(props.Pinned ?? props.pinned),
      };
    });
    return sortPinned(items);
  } catch (error) {
    console.error("Notion query failed:", error);
    return [];
  }
}

/**
 * Project DB properties:
 *   Project name (title), Description (rich_text), Date (date),
 *   Link (url), GitHub (url), status (status), Owner (people)
 */
export async function getProjects(): Promise<ProjectItem[]> {
  const dbId = process.env.NOTION_PROJECT_DB;
  if (!dbId) return [];
  try {
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      sorts: [{ property: "Date", direction: "descending" }],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        slug: page.id,
        title: getPlainText(props["Project name"]),
        description: getPlainText(props.Description),
        cover: getCover(page),
        tags: getTags(props.Tags ?? props["Tech Stack"] ?? props.tags),
        date: getDate(props.Date) || page.created_time?.split("T")[0] || "",
        lastEdited: page.last_edited_time,
        media: getFileUrl(props.Media ?? props.media),
        link: getUrl(props.Link),
        github: getUrl(props.GitHub),
        status: getStatus(props.status),
        pinned: getCheckbox(props.Pinned ?? props.pinned),
      };
    });
    return sortPinned(items);
  } catch (error) {
    console.error("Notion query failed:", error);
    return [];
  }
}

/**
 * Art DB properties:
 *   Title (title), Medium (select), Year Created (rich_text), Status (status)
 */
export async function getArt(): Promise<ArtItem[]> {
  const dbId = process.env.NOTION_ART_DB;
  if (!dbId) return [];
  try {
    const response = await notion.dataSources.query({
      data_source_id: dbId,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        slug: page.id,
        title: getPlainText(props.Title),
        description: "",
        cover: getCover(page),
        tags: [],
        date: getPlainText(props["Year Created"]) || page.created_time?.split("T")[0] || "",
        lastEdited: page.last_edited_time,
        media: getFileUrl(props.Media ?? props.media),
        medium: getSelect(props.Medium),
        pinned: getCheckbox(props.Pinned ?? props.pinned),
      };
    });
    return sortPinned(items);
  } catch (error) {
    console.error("Notion query failed:", error);
    return [];
  }
}

/**
 * Research DB properties:
 *   Title (title), Tags (multi_select), Type (select), Status (status),
 *   Start Date (date), Completion Date (date), Source URL (url),
 *   Authors (people), Findings Summary (rich_text), Notes (rich_text)
 */
export async function getResearch(): Promise<ResearchItem[]> {
  const dbId = process.env.NOTION_RESEARCH_DB;
  if (!dbId) return [];
  try {
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      sorts: [{ property: "Completion Date", direction: "descending" }],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        slug: page.id,
        title: getPlainText(props.Title),
        description: getPlainText(props["Findings Summary"]),
        cover: getCover(page),
        tags: getTags(props.Tags),
        date: getDate(props["Completion Date"]) || getDate(props["Start Date"]) || page.created_time?.split("T")[0] || "",
        lastEdited: page.last_edited_time,
        media: getFileUrl(props.Media ?? props.media),
        venue: getPlainText(props.Notes),
        pdf: getUrl(props["Source URL"]),
        pinned: getCheckbox(props.Pinned ?? props.pinned),
      };
    });
    return sortPinned(items);
  } catch (error) {
    console.error("Notion query failed:", error);
    return [];
  }
}

/**
 * Life DB properties:
 *   Title (title), Date (date), Type (select), Notes (rich_text)
 */
export async function getLife(): Promise<LifeItem[]> {
  const dbId = process.env.NOTION_LIFE_DB;
  if (!dbId) return [];
  try {
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      sorts: [{ property: "Date", direction: "descending" }],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        slug: page.id,
        title: getPlainText(props.Title),
        description: getPlainText(props.Notes),
        cover: getCover(page),
        tags: [],
        date: getDate(props.Date) || page.created_time?.split("T")[0] || "",
        lastEdited: page.last_edited_time,
        media: getFileUrl(props.Media ?? props.media),
        type: getSelect(props.Type),
        pinned: getCheckbox(props.Pinned ?? props.pinned),
      };
    });
    return sortPinned(items);
  } catch (error) {
    console.error("Notion query failed:", error);
    return [];
  }
}

export async function getPageBySlug(
  databaseId: string,
  slug: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  try {
    // Since we use page IDs as slugs, try direct page retrieval first
    const page = await notion.pages.retrieve({ page_id: slug });
    return page;
  } catch {
    // Fallback: search by Slug property if it exists
    try {
      const response = await notion.dataSources.query({
        data_source_id: databaseId,
        filter: {
          property: "Slug",
          rich_text: { equals: slug },
        },
      });
      return response.results[0] ?? null;
    } catch (error) {
      console.error("Notion query failed:", error);
      return null;
    }
  }
}
