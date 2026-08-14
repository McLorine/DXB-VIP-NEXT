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
import { POST_BY_URI_QUERY } from "./queries/posts";
import {
  POST_BY_SLUG_AND_LANGUAGE_QUERY,
} from "./queries/posts";
import { BLOG_PREVIEW_TYPENAME } from "./fragments";
import type { WPPage, WPPost, BlogPreviewBlock, WPLanguage, WPTranslation } from "./types";

import { LANGUAGES_QUERY, FRONT_PAGES_QUERY } from "./queries/frontPage";

async function getLanguageSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{ languages: { slug: string }[] }>(LANGUAGES_QUERY);
    return (data.languages ?? []).map((l) => l.slug);
  } catch (err) {
    console.error("getLanguageSlugs failed:", err);
    return [];
  }
}

async function getPostByLocalizedPath(
  path: string
): Promise<RawNode | null> {
  try {
    const {
      slug,
      languageCode,
    } = await resolveLanguageFromPath(path);

    if (!slug) {
      return null;
    }

    const data = await fetchGraphQL<{
      posts: {
        nodes: RawNode[];
      } | null;
    }>(
      POST_BY_SLUG_AND_LANGUAGE_QUERY,
      {
        slug,
        language: languageCode,
      },
      [
        `post:${languageCode}:${slug}`,
      ]
    );

    return data.posts?.nodes?.[0] ?? null;

  } catch (err) {
    console.error(
      `getPostByLocalizedPath failed for "${path}"`,
      err
    );

    return null;
  }
}

/**
 * Handles Polylang translated front pages (e.g. "/ru/"), where uri doesn't
 * match the page's actual slug and both nodeByUri and page(idType: URI) fail
 * to resolve it. Only triggers for single-segment paths that match a real
 * configured language slug — anything else returns null immediately.
 */
async function getFrontPageForUri(uri: string): Promise<RawPageLike | null> {
  const segments = uri.split("/").filter(Boolean);
  if (segments.length !== 1) return null;

  const candidateLangSlug = segments[0];
  const languageSlugs = await getLanguageSlugs();
  if (!languageSlugs.includes(candidateLangSlug)) return null;

  const data = await fetchGraphQL<{ pages: { nodes: any[] } }>(
    FRONT_PAGES_QUERY,
    {},
    [`frontpage:${candidateLangSlug}`]
  );

  const match = (data.pages?.nodes ?? []).find(
    (n) => n.isFrontPage && n.language?.slug === candidateLangSlug
  );

  return match ?? null;
}
/**
 * True for the WPGraphQL core bug where nodeByUri fails to resolve certain
 * URIs (UniformResourceIdentifiable::get_type() receives a null type name).
 * Seen so far on: front-page / translated-homepage URIs, and short (1–3
 * character) page slugs — likely colliding with some other short rewrite
 * rule WP registers. Posts haven't been observed to hit this.
 */
function isUnresolvedUriBug(err: unknown): boolean {
  if (!(err instanceof GraphQLRequestError)) return false;
  return err.errors.some((e: any) => {
    const path = Array.isArray(e.path) ? e.path.join(".") : "";
    const debugMsg: string = e.extensions?.debugMessage ?? "";
    return path.includes("nodeByUri") && debugMsg.includes("UniformResourceIdentifiable");
  });
}

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
  databaseId: number;
  title: string;
  uri?: string | null;
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
        href: node.uri,
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
    (b: any): b is BlogPreviewBlock =>
      b.__typename === BLOG_PREVIEW_TYPENAME
  );

  let latestPosts: any[] = [];

  if (blogBlock) {
    const categoryId =
      blogBlock.blogPreviewCategory?.nodes?.[0]?.databaseId ?? null;

    latestPosts = await getLatestPosts(
      blogBlock.blogPreviewPostsCount || 3,
      categoryId
    );
  }

  return {
    databaseId: raw.databaseId,
    uri: raw.uri ?? undefined,
    title: raw.title,

    pageContent: {
      pageBuilder: blocks,
    },

    latestPosts,

    language: raw.language ?? undefined,
    translations: raw.translations ?? undefined,
  };
}

async function resolveLanguageFromPath(
  path: string
): Promise<{
  languageSlug: string;
  languageCode: string;
  slug: string;
}> {
  const segments = path
    .split("/")
    .filter(Boolean);

  const languages = await fetchGraphQL<{
    languages: {
      code: string;
      slug: string;
    }[];
  }>(LANGUAGES_QUERY);

  const availableLanguages =
    languages.languages ?? [];

  const firstSegment =
    segments[0]?.toLowerCase();

  const explicitLanguage =
    availableLanguages.find(
      (language) =>
        language.slug.toLowerCase() === firstSegment
    );

  if (explicitLanguage) {
    return {
      languageSlug: explicitLanguage.slug,

      languageCode:
        explicitLanguage.code,

      slug:
        segments.at(-1) ?? "",
    };
  }

  /*
   * No language prefix means default language.
   *
   * Ideally mark your default language in LANGUAGES_QUERY.
   * If your current setup doesn't expose it yet,
   * use your site's known default language.
   */
  const defaultLanguage =
    availableLanguages.find(
      (language) =>
        language.slug === "en"
    );

  if (!defaultLanguage) {
    throw new Error(
      "Default WordPress language could not be resolved."
    );
  }

  return {
    languageSlug: defaultLanguage.slug,
    languageCode: defaultLanguage.code,
    slug: segments.at(-1) ?? "",
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


async function getPostByUri(
  uri: string
): Promise<RawNode | null> {
  try {
    const data = await fetchGraphQL<{
      post: RawNode | null;
    }>(
      POST_BY_URI_QUERY,
      { uri },
      [`node:${uri}`]
    );

    return data.post ?? null;
  } catch (err) {
    console.error(
      `getPostByUri failed for "${uri}"`,
      err
    );

    return null;
  }
}
function normalizeUri(value: string): string {
  const clean = value
    .split("?")[0]
    .split("#")[0]
    .replace(/^\/+|\/+$/g, "");

  return clean ? `/${clean}/` : "/";
}


function buildPostResult(
  node: RawNode,
  fallbackSlug: string
): WPPost {
  return {
    id:
      String(node.databaseId),

    title:
      node.title,

    slug:
      node.slug ??
      fallbackSlug,

    excerpt:
      stripHtml(
        node.excerpt ?? ""
      ),

    content:
      node.content ?? "",

    author:
      node.author?.node?.name ?? "",

    categoryName:
      node.categories?.nodes?.[0]?.name ?? "",

    coverUrl:
      node.featuredImage?.node?.sourceUrl ?? "",

    coverAlt:
      node.featuredImage?.node?.altText ?? "",

    publishedOn:
      node.date ?? "",

    language:
      node.language ?? undefined,

    translations:
      node.translations ?? undefined,
  };
}

export async function getContentByUri(
  path: string
): Promise<ResolvedContent> {
  const uri =
    path === "/"
      ? "/"
      : `/${path.replace(/^\/|\/$/g, "")}/`;

  /*
   * ==========================================================
   * 1. TRY EXACT LOCALIZED POST
   * ==========================================================
   *
   * Important for Polylang because different translations
   * are allowed to have the exact same slug.
   */

  const localizedPost =
    await getPostByLocalizedPath(path);

  if (
    localizedPost &&
    localizedPost.uri === uri
  ) {
    return {
      type: "post",
      post: buildPostResult(
        localizedPost,
        path
      ),
    };
  }


  /*
   * ==========================================================
   * 2. TRY nodeByUri
   * ==========================================================
   *
   * This remains useful for Pages and other URI-based content.
   */

  let node: RawNode | null = null;
  let hitUriBug = false;

  try {
    const data = await fetchGraphQL<{
      nodeByUri: RawNode | null;
    }>(
      NODE_BY_URI_QUERY,
      { uri },
      [`node:${uri}`]
    );

    node = data.nodeByUri;

  } catch (err) {
    if (!isUnresolvedUriBug(err)) {
      console.error(
        `getContentByUri: unexpected error resolving "${uri}"`,
        err
      );

      throw err;
    }

    hitUriBug = true;
  }


  /*
   * ==========================================================
   * 3. EXISTING PAGE FALLBACKS
   * ==========================================================
   */

  if (hitUriBug) {
    const fallback =
      await fetchGraphQL<{
        page: RawPageLike | null;
      }>(
        PAGE_BY_SLUG_QUERY,
        { uri },
        [`node:${uri}`]
      );

    if (fallback.page) {
      return {
        type: "page",
        page:
          await buildPageResult(
            fallback.page
          ),
      };
    }

    const frontPage =
      await getFrontPageForUri(uri);

    if (frontPage) {
      return {
        type: "page",
        page:
          await buildPageResult(
            frontPage
          ),
      };
    }

    return null;
  }


  if (!node) {
    return null;
  }


  /*
   * ==========================================================
   * 4. CANONICAL URI CHECK
   * ==========================================================
   */

  if (
    node.uri &&
    node.uri !== uri
  ) {
    return null;
  }


  /*
   * ==========================================================
   * 5. PAGE
   * ==========================================================
   */

  if (node.__typename === "Page") {
    return {
      type: "page",
      page:
        await buildPageResult(node),
    };
  }


  /*
   * ==========================================================
   * 6. POST
   * ==========================================================
   */

  if (node.__typename === "Post") {
    return {
      type: "post",
      post:
        buildPostResult(
          node,
          path
        ),
    };
  }


  return null;
}