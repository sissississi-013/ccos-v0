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
import { Table } from "./blocks/Table";
import { Equation } from "./blocks/Equation";
import { TodoList } from "./blocks/TodoItem";
import { ColumnList } from "./blocks/ColumnList";
import { Embed } from "./blocks/Embed";
import { FileBlock } from "./blocks/FileBlock";
import { TableOfContents } from "./blocks/TableOfContents";

type GroupedItem = NotionBlock | { groupType: string; items: NotionBlock[] };

export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  const grouped: GroupedItem[] = [];
  let currentBulletList: NotionBlock[] = [];
  let currentNumberedList: NotionBlock[] = [];
  let currentTodoList: NotionBlock[] = [];

  const flushLists = () => {
    if (currentBulletList.length > 0) {
      grouped.push({ groupType: "bulleted_list", items: currentBulletList });
      currentBulletList = [];
    }
    if (currentNumberedList.length > 0) {
      grouped.push({ groupType: "numbered_list", items: currentNumberedList });
      currentNumberedList = [];
    }
    if (currentTodoList.length > 0) {
      grouped.push({ groupType: "to_do_list", items: currentTodoList });
      currentTodoList = [];
    }
  };

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      if (currentNumberedList.length > 0 || currentTodoList.length > 0) flushLists();
      currentBulletList.push(block);
    } else if (block.type === "numbered_list_item") {
      if (currentBulletList.length > 0 || currentTodoList.length > 0) flushLists();
      currentNumberedList.push(block);
    } else if (block.type === "to_do") {
      if (currentBulletList.length > 0 || currentNumberedList.length > 0) flushLists();
      currentTodoList.push(block);
    } else {
      flushLists();
      grouped.push(block);
    }
  }
  flushLists();

  return (
    <div className="notion-content space-y-4">
      {grouped.map((item, i) => {
        if ("groupType" in item) {
          if (item.groupType === "bulleted_list") {
            return <BulletedList key={i} items={item.items} />;
          }
          if (item.groupType === "numbered_list") {
            return <NumberedList key={i} items={item.items} />;
          }
          if (item.groupType === "to_do_list") {
            return <TodoList key={i} items={item.items} />;
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
    case "table":
      return <Table block={block} />;
    case "equation":
      return <Equation block={block} />;
    case "column_list":
      return <ColumnList block={block} />;
    case "embed":
      return <Embed block={block} />;
    case "file":
      return <FileBlock block={block} />;
    case "pdf":
      return <FileBlock block={block} />;
    case "table_of_contents":
      return <TableOfContents />;
    case "synced_block":
      return block.children ? <NotionRenderer blocks={block.children} /> : null;
    case "child_page":
    case "child_database":
      return (
        <div className="my-2 px-3 py-2 rounded bg-gray-50 text-sm text-[#555]">
          📄 {block.child_page?.title || block.child_database?.title || "Untitled"}
        </div>
      );
    default:
      return null;
  }
}
