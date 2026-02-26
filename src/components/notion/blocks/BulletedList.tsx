import type { NotionBlock } from "@/lib/notion/types";
import { renderRichText } from "@/lib/notion/richtext";

export function BulletedList({ items }: { items: NotionBlock[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {items.map((item) => (
        <li key={item.id} className="leading-7">
          {renderRichText(item.bulleted_list_item?.rich_text ?? [])}
        </li>
      ))}
    </ul>
  );
}
