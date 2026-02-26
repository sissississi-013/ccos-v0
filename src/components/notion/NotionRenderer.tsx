import type { NotionBlock } from "@/lib/notion/types";
import { Paragraph } from "./blocks/Paragraph";
import { Heading } from "./blocks/Heading";
import { NotionImage } from "./blocks/Image";
import { Code } from "./blocks/Code";
import { BulletedList } from "./blocks/BulletedList";
import { NumberedList } from "./blocks/NumberedList";
import { Quote } from "./blocks/Quote";
import { Callout } from "./blocks/Callout";
import { Divider } from "./blocks/Divider";
import { Toggle } from "./blocks/Toggle";
import { Video } from "./blocks/Video";
import { Bookmark } from "./blocks/Bookmark";

export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  // Group consecutive list items
  const grouped: (NotionBlock | NotionBlock[])[] = [];
  let currentBulletList: NotionBlock[] = [];
  let currentNumberedList: NotionBlock[] = [];

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      if (currentNumberedList.length > 0) {
        grouped.push(currentNumberedList);
        currentNumberedList = [];
      }
      currentBulletList.push(block);
    } else if (block.type === "numbered_list_item") {
      if (currentBulletList.length > 0) {
        grouped.push(currentBulletList);
        currentBulletList = [];
      }
      currentNumberedList.push(block);
    } else {
      if (currentBulletList.length > 0) {
        grouped.push(currentBulletList);
        currentBulletList = [];
      }
      if (currentNumberedList.length > 0) {
        grouped.push(currentNumberedList);
        currentNumberedList = [];
      }
      grouped.push(block);
    }
  }
  if (currentBulletList.length > 0) grouped.push(currentBulletList);
  if (currentNumberedList.length > 0) grouped.push(currentNumberedList);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {grouped.map((item, i) => {
        if (Array.isArray(item)) {
          const type = item[0].type;
          if (type === "bulleted_list_item") {
            return <BulletedList key={i} items={item} />;
          }
          if (type === "numbered_list_item") {
            return <NumberedList key={i} items={item} />;
          }
          return null;
        }

        return <BlockRenderer key={item.id} block={item} />;
      })}
    </div>
  );
}

function BlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "heading_1":
      return <Heading block={block} level={1} />;
    case "heading_2":
      return <Heading block={block} level={2} />;
    case "heading_3":
      return <Heading block={block} level={3} />;
    case "image":
      return <NotionImage block={block} />;
    case "code":
      return <Code block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "callout":
      return <Callout block={block} />;
    case "divider":
      return <Divider />;
    case "toggle":
      return <Toggle block={block} />;
    case "video":
      return <Video block={block} />;
    case "bookmark":
    case "link_preview":
      return <Bookmark block={block} />;
    default:
      return null;
  }
}
