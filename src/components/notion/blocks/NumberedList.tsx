import type { NotionBlock } from "@/lib/notion/types";
import { renderRichText } from "@/lib/notion/richtext";

export function NumberedList({ items }: { items: NotionBlock[] }) {
  return (
    <ol className="list-decimal list-inside space-y-1 text-gray-700">
      {items.map((item) => (
        <li key={item.id} className="leading-7">
          {renderRichText(item.numbered_list_item?.rich_text ?? [])}
        </li>
      ))}
    </ol>
  );
}
