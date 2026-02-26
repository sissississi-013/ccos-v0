import type { NotionBlock } from "@/lib/notion/types";

export function Code({ block }: { block: NotionBlock }) {
  const code = block.code;
  if (!code) return null;

  const text = code.rich_text?.map((t: { plain_text: string }) => t.plain_text).join("") ?? "";
  const language = code.language ?? "";

  return (
    <div className="my-4 rounded-lg overflow-hidden">
      {language && (
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400">
          {language}
        </div>
      )}
      <pre className="bg-gray-900 p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono">{text}</code>
      </pre>
    </div>
  );
}
