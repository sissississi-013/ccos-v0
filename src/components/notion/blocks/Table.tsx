"use client";

import type { NotionBlock } from "@/lib/notion/types";
import { TranslatedRichText } from "@/components/translation/TranslatedRichText";

export function Table({ block }: { block: NotionBlock }) {
  const rows = block.children ?? [];
  if (rows.length === 0) return null;

  const hasColumnHeader = block.table?.has_column_header ?? false;
  const hasRowHeader = block.table?.has_row_header ?? false;

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-sm">
        {rows.map((row: NotionBlock, rowIdx: number) => {
          const cells = row.table_row?.cells ?? [];
          const isHeaderRow = hasColumnHeader && rowIdx === 0;
          const Tag = isHeaderRow ? "thead" : "tbody";
          const CellTag = isHeaderRow ? "th" : "td";

          if (isHeaderRow) {
            return (
              <Tag key={row.id}>
                <tr>
                  {cells.map((cell: unknown[], cellIdx: number) => (
                    <CellTag
                      key={cellIdx}
                      className="px-4 py-2.5 text-left font-medium text-[#333] bg-gray-50 border-b border-gray-200"
                    >
                      <TranslatedRichText richTexts={cell as never} />
                    </CellTag>
                  ))}
                </tr>
              </Tag>
            );
          }

          return (
            <tbody key={row.id}>
              <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                {cells.map((cell: unknown[], cellIdx: number) => {
                  const isRowHeaderCell = hasRowHeader && cellIdx === 0;
                  return (
                    <td
                      key={cellIdx}
                      className={`px-4 py-2.5 text-[#444] border-r border-gray-100 last:border-r-0 ${isRowHeaderCell ? "font-medium bg-gray-50/50" : ""}`}
                    >
                      <TranslatedRichText richTexts={cell as never} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
