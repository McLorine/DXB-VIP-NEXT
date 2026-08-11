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
import type { WPPage, WPPostSummary, BlogPreviewBlock } from "./types";

interface RawPostNode {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  categories: { nodes: { name: string }[] };
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
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

    return (data.posts?.nodes ?? []).map((node) => ({
      id: node.id,
      title: node.title,
      slug: node.slug,
      excerpt: stripHtml(node.excerpt ?? ""),
      categoryName: node.categories?.nodes?.[0]?.name ?? "",
      coverUrl: node.featuredImage?.node?.sourceUrl ?? "",
      publishedOn: node.date,
    }));
  } catch (err) {
    // A broken Blog Preview block (bad category, plugin misconfig, etc.)
    // should never take the whole page down — just show no articles.
    console.error("getLatestPosts failed:", err);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await fetchGraphQL<{ page: WPPage | null }>(
    PAGE_BY_SLUG_QUERY,
    { uri: slug },
    [`page:${slug}`]
  );

  if (!data.page) return null;

  // Defensive: pageContent can be null (ACF field group never saved on this
  // page), and pageBuilder can be null/empty (flexible content added but no
  // rows). Neither should ever throw — the page just renders with no blocks.
  const blocks = data.page.pageContent?.pageBuilder ?? [];

  const blogBlock = blocks.find(
    (b): b is BlogPreviewBlock => b.__typename === BLOG_PREVIEW_TYPENAME
  );

  if (blogBlock) {
    const categoryId = blogBlock.blogPreviewCategory?.nodes?.[0]?.databaseId ?? null;
    const latestPosts = await getLatestPosts(blogBlock.blogPreviewPostsCount || 3, categoryId);
    return {
      ...data.page,
      pageContent: { pageBuilder: blocks },
      latestPosts,
    };
  }

  return { ...data.page, pageContent: { pageBuilder: blocks } };
}
