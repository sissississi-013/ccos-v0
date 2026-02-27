import type { NotionBlock } from "@/lib/notion/types";
import { NotionRenderer } from "../NotionRenderer";

export function ColumnList({ block }: { block: NotionBlock }) {
  const columns = block.children ?? [];
  if (columns.length === 0) return null;

  return (
    <div className="my-4 grid gap-6" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
      {columns.map((col: NotionBlock) => (
        <div key={col.id}>
          {col.children && <NotionRenderer blocks={col.children} />}
        </div>
      ))}
    </div>
  );
}
