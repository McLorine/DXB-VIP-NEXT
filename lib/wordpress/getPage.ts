// ============================================================================
// getPageBySlug — the one function every route calls to load a WP page.
//
// If the page's builder includes a Blog Preview block, we make a second,
// separate query for real WP posts (see queries/posts.ts) and attach the
// result as `latestPosts`. SectionRenderer merges that array into the
// BlogPreview component's props at render time.
// ============================================================================

import { fetchGraphQL } from "./client";
import { PAGE_BY_SLUG_QUERY } from "./queries/page";
import { LATEST_POSTS_QUERY } from "./queries/posts";
import { BLOG_PREVIEW_TYPENAME } from "./fragments";
import type { WPPage, WPPostSummary, BlogPreviewBlock, WPLanguage, WPTranslation } from "./types";

interface RawPostNode {
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  categories: { nodes: { databaseId: number; name: string; slug: string }[] };
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
}

interface RawPage {
  databaseId: number;
  title: string;
  language: WPLanguage | null;
  translations: WPTranslation[] | null;
  pageContent: { pageBuilder: any[] | null } | null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function estimateReadMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 40));
}

async function getLatestPosts(
  count: number,
  categoryId: number | null
): Promise<WPPostSummary[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: RawPostNode[] } | null }>(
      LATEST_POSTS_QUERY,
      { first: count, categoryId },
      ["posts"]
    );

    return (data.posts?.nodes ?? []).map((node) => {
      const excerpt = stripHtml(node.excerpt ?? "");
      return {
        id: String(node.databaseId),
        title: node.title,
        slug: node.slug,
        excerpt,
        categoryName: node.categories?.nodes?.[0]?.name ?? "",
        readMinutes: estimateReadMinutes(excerpt),
        coverUrl: node.featuredImage?.node?.sourceUrl ?? "",
        publishedOn: node.date,
      };
    });
  } catch (err) {
    console.error("getLatestPosts failed:", err);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await fetchGraphQL<{ page: RawPage | null }>(
    PAGE_BY_SLUG_QUERY,
    { uri: slug },
    [`page:${slug}`]
  );

  if (!data.page) return null;

  const blocks = data.page.pageContent?.pageBuilder ?? [];

  const blogBlock = blocks.find(
    (b): b is BlogPreviewBlock => b.__typename === BLOG_PREVIEW_TYPENAME
  );

  let latestPosts: WPPostSummary[] = [];
  if (blogBlock) {
    const categoryId = blogBlock.blogPreviewCategory?.nodes?.[0]?.databaseId ?? null;
    latestPosts = await getLatestPosts(blogBlock.blogPreviewPostsCount || 3, categoryId);
  }

  return {
    databaseId: data.page.databaseId,
    title: data.page.title,
    pageContent: { pageBuilder: blocks },
    latestPosts,
    language: data.page.language ?? undefined,
    translations: data.page.translations ?? undefined,
  };
}
