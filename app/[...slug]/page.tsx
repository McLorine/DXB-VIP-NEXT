import { notFound } from "next/navigation";
import { getContentByUri } from "@/lib/wordpress/getNodeByUri";
import { getAllContentSlugs } from "@/lib/wordpress/getAllContentSlugs";
import SectionRenderer from "@/components/sections/SectionRenderer";
import BlogPostView from "@/components/common/BlogPostView";
import SyncTranslations from "@/components/i18n/SyncTranslations";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const uri = slug.join("/");
  const result = await getContentByUri(uri);

  if (!result) return notFound();

  if (result.type === "page") {
    return (
      <>
        <SyncTranslations
          currentLanguage={result.page.language}
          translations={result.page.translations}
        />
        <SectionRenderer
          blocks={result.page.pageContent?.pageBuilder ?? []}
          latestPosts={result.page.latestPosts}
        />
      </>
    );
  }

  return (
    <>
      <SyncTranslations
        currentLanguage={result.post.language}
        translations={result.post.translations}
      />
      <BlogPostView post={result.post} />
    </>
  );
}