import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wordpress/getPage";
import { getAllPageSlugs } from "@/lib/wordpress/getAllPageSlugs";
import SectionRenderer from "@/components/sections/SectionRenderer";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const uris = await getAllPageSlugs();

  return uris
    .filter((uri) => uri !== "/")
    .map((uri) => ({
      slug: uri.replace(/^\/|\/$/g, "").split("/"),
    }));
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params; // <-- the fix: await before destructuring
  const uri = "/" + slug.join("/") + "/";

  const page = await getPageBySlug(uri);

  if (!page) notFound();

  return <SectionRenderer blocks={page.pageContent?.pageBuilder ?? []} />;
}