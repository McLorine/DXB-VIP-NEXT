// ============================================================================
// getContentByUri — resolves a URI (e.g. "/hello-world-2/" or "/ru/new-year-ru/")
// to either a Page or a Post, since both types can live at root-level or
// language-prefixed permalinks. Returns a discriminated union so the route
// can render the right thing. Rejects non-canonical URI matches (WPGraphQL's
// nodeByUri can resolve loosely) so only WP's own canonical uri is reachable.
//
// Front-page URIs (e.g. "/", or a translated homepage like "/ru/") trigger a
// WPGraphQL core bug in nodeByUri (UniformResourceIdentifiable::get_type()
// receives a null type name). When that happens, we fall back to the same
// page(id, idType: URI) mechanism the root Home route already uses
// successfully — nodeByUri and page() are different resolvers, and only the
// former has this bug.
// ============================================================================

import { fetchGraphQL, GraphQLRequestError } from "./client";
import { NODE_BY_URI_QUERY } from "./queries/node";
import { PAGE_BY_SLUG_QUERY } from "./queries/page";
import { LATEST_POSTS_QUERY } from "./queries/posts";
import { BLOG_PREVIEW_TYPENAME } from "./fragments";
import type { WPPage, WPPost, BlogPreviewBlock, WPLanguage, WPTranslation } from "./types";

interface RawNode {
  __typename: "Page" | "Post" | string;
  databaseId: number;
  title: string;
  uri?: string | null;
  language?: WPLanguage | null;
  translations?: WPTranslation[] | null;
  pageContent?: { pageBuilder: any[] | null };
  slug?: string;
  date?: string;
  excerpt?: string;
  content?: string;
  author?: { node: { name: string } } | null;
  categories?: { nodes: { databaseId: number; name: string; slug: string }[] };
  featuredImage?: { node: { sourceUrl: string; altText: string } } | null;
}

interface RawPageLike {
  title: string;
  language?: WPLanguage | null;
  translations?: WPTranslation[] | null;
  pageContent?: { pageBuilder: any[] | null } | null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function estimateReadMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 40));
}

async function getLatestPosts(count: number, categoryId: number | null) {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: any[] } | null }>(
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

async function buildPageResult(raw: RawPageLike): Promise<WPPage> {
  const blocks = raw.pageContent?.pageBuilder ?? [];
  const blogBlock = blocks.find(
    (b: any): b is BlogPreviewBlock => b.__typename === BLOG_PREVIEW_TYPENAME
  );

  let latestPosts: any[] = [];
  if (blogBlock) {
    const categoryId = blogBlock.blogPreviewCategory?.nodes?.[0]?.databaseId ?? null;
    latestPosts = await getLatestPosts(blogBlock.blogPreviewPostsCount || 3, categoryId);
  }

  return {
    title: raw.title,
    pageContent: { pageBuilder: blocks },
    latestPosts,
    language: raw.language ?? undefined,
    translations: raw.translations ?? undefined,
  };
}

/** True only for the specific WPGraphQL core bug where nodeByUri can't resolve front pages. */
function isFrontPageResolutionBug(err: unknown): boolean {
  if (!(err instanceof GraphQLRequestError)) return false;
  return err.errors.some((e: any) => {
    const path = Array.isArray(e.path) ? e.path.join(".") : "";
    const debugMsg: string = e.extensions?.debugMessage ?? "";
    return path.includes("nodeByUri") && debugMsg.includes("UniformResourceIdentifiable");
  });
}

export type ResolvedContent =
  | { type: "page"; page: WPPage }
  | { type: "post"; post: WPPost }
  | null;

export async function getContentByUri(path: string): Promise<ResolvedContent> {
  const uri = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;

  let node: RawNode | null = null;
  let hitFrontPageBug = false;

  try {
    const data = await fetchGraphQL<{ nodeByUri: RawNode | null }>(
      NODE_BY_URI_QUERY,
      { uri },
      [`node:${uri}`]
    );
    node = data.nodeByUri;
  } catch (err) {
    if (!isFrontPageResolutionBug(err)) throw err;
    hitFrontPageBug = true;
  }

  if (hitFrontPageBug) {
    const fallback = await fetchGraphQL<{ page: RawPageLike | null }>(
      PAGE_BY_SLUG_QUERY,
      { uri },
      [`node:${uri}`]
    );

    if (!fallback.page) return null;

    return { type: "page", page: await buildPageResult(fallback.page) };
  }

  if (!node) return null;

  // Reject loose matches — only WP's own canonical uri for this node is reachable.
  if (node.uri && node.uri !== uri) {
    return null;
  }

  if (node.__typename === "Page") {
    return { type: "page", page: await buildPageResult(node) };
  }

  if (node.__typename === "Post") {
    const post: WPPost = {
      id: String(node.databaseId),
      title: node.title,
      slug: node.slug ?? path,
      excerpt: stripHtml(node.excerpt ?? ""),
      content: node.content ?? "",
      author: node.author?.node?.name ?? "",
      categoryName: node.categories?.nodes?.[0]?.name ?? "",
      coverUrl: node.featuredImage?.node?.sourceUrl ?? "",
      coverAlt: node.featuredImage?.node?.altText ?? "",
      publishedOn: node.date ?? "",
      language: node.language ?? undefined,
      translations: node.translations ?? undefined,
    };

    return { type: "post", post };
  }

  return null;
}