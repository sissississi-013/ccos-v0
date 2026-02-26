import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/notion/queries";
import { getPageBlocks } from "@/lib/notion/blocks";
import { NotionRenderer } from "@/components/notion/NotionRenderer";
import { DetailPageLayout } from "@/components/detail/DetailPageLayout";
import { SECTIONS } from "@/lib/constants";

const section = SECTIONS[3]; // research

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbId = process.env.NOTION_RESEARCH_DB;
  if (!dbId) notFound();

  const page = await getPageBySlug(dbId, slug);
  if (!page) notFound();

  const blocks = await getPageBlocks(page.id);
  const props = page.properties;

  const title = (() => {
    for (const key of ["Title", "Name", "Project name"]) {
      const val = props[key]?.title?.map((t: { plain_text: string }) => t.plain_text).join("");
      if (val) return val;
    }
    return "Untitled";
  })();
  const cover =
    page.cover?.type === "external"
      ? page.cover.external.url
      : page.cover?.type === "file"
        ? page.cover.file.url
        : null;
  const tags = props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [];
  const date = props.Date?.date?.start ?? props["Publish Date"]?.date?.start ?? props["Completion Date"]?.date?.start ?? "";

  return (
    <DetailPageLayout
      title={title}
      cover={cover}
      tags={tags}
      date={date}
      color={section.color}
      backHref={`/#${section.id}`}
      backLabel="Back to Research"
    >
      <NotionRenderer blocks={blocks} />
    </DetailPageLayout>
  );
}
