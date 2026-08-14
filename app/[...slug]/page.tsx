import { notFound } from "next/navigation";

import { getContentByUri } from "@/lib/wordpress/getNodeByUri";
import { getAllContentSlugs } from "@/lib/wordpress/getAllContentSlugs";

import SectionRenderer from "@/components/sections/SectionRenderer";
import BlogPostView from "@/components/common/BlogPostView";
import SyncTranslations from "@/components/i18n/SyncTranslations";
import NewsArchive from "@/components/news/NewsArchive";

export const dynamicParams = true;


/**
 * WordPress page IDs that should render using the Next.js News Archive.
 *
 * Example .env.local:
 *
 * WORDPRESS_NEWS_ARCHIVE_PAGE_IDS=123,456,789
 *
 * These IDs stay the same even if somebody changes:
 *
 * /news/
 * /ru/novosti/
 * /fr/actualites/
 *
 * to completely different URLs.
 */
const NEWS_ARCHIVE_PAGE_IDS = new Set(
  (process.env.WORDPRESS_NEWS_ARCHIVE_PAGE_IDS ?? "")
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isFinite(id))
);


export async function generateStaticParams() {
  const slugs = await getAllContentSlugs();

  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}


interface DynamicRouteProps {
  params: Promise<{
    slug: string[];
  }>;

  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}


export default async function DynamicRoute({
  params,
  searchParams,
}: DynamicRouteProps) {
  const { slug } = await params;

  const uri = slug.join("/");

  const result = await getContentByUri(uri);

  if (!result) {
    return notFound();
  }


  // ============================================================
  // PAGE
  // ============================================================

  if (result.type === "page") {
    const page = result.page;


    // ==========================================================
    // NEWS ARCHIVE
    // ==========================================================
    //
    // We identify the archive by WordPress PAGE ID,
    // NOT by URL.
    //
    // Therefore:
    //
    // /news/
    //
    // can become:
    //
    // /latest-news/
    //
    // without changing Next.js.
    //
    // ==========================================================

    if (NEWS_ARCHIVE_PAGE_IDS.has(page.databaseId)) {
      const lang =
        page.language?.slug?.toLowerCase() ??
        page.language?.code?.toLowerCase() ??
        "en";

      return (
        <>
          <SyncTranslations
            currentLanguage={page.language}
            translations={page.translations}
          />

          <NewsArchive
            lang={lang}
            searchParams={searchParams}
          />
        </>
      );
    }


    // ==========================================================
    // NORMAL WORDPRESS PAGE
    // ==========================================================

    return (
      <>
        <SyncTranslations
          currentLanguage={page.language}
          translations={page.translations}
        />

        <SectionRenderer
          blocks={page.pageContent?.pageBuilder ?? []}
          latestPosts={page.latestPosts}
        />
      </>
    );
  }


  // ============================================================
  // BLOG POST
  // ============================================================

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