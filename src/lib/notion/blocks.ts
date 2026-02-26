import { notion } from "./client";
import type { NotionBlock } from "./types";

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      const b = block as unknown as NotionBlock;
      if (b.has_children) {
        b.children = await getPageBlocks(b.id);
      }
      blocks.push(b);
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}
