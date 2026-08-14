import type { BlogArticle, BlogCategory } from "./types";

export const PER_PAGE = 21;

const SITE_URL = process.env.WORDPRESS_SITE_URL!;

interface RestTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface RestPost {
  id: number;
  slug: string;
  link: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };

  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      alt_text: string;
    }[];

    "wp:term"?: RestTerm[][];
  };
}

interface RestCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&");
}

function estimateReadMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function wordpressUrlToPath(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

function toArticle(post: RestPost): BlogArticle {
  const excerpt = decodeEntities(
    stripHtml(post.excerpt?.rendered ?? "")
  );

  const terms = (post._embedded?.["wp:term"] ?? []).flat();

  const category =
    terms.find((term) => term.taxonomy === "category")?.name ?? "";

  return {
    id: String(post.id),
    title: decodeEntities(
      stripHtml(post.title?.rendered ?? "")
    ),
    slug: post.slug,

    // IMPORTANT:
    // /my-post/
    // /ru/moy-post/
    // /fr/mon-article/
    href: wordpressUrlToPath(post.link),

    excerpt,
    category,
    read_minutes: estimateReadMinutes(excerpt),

    cover_url:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",

    published_on: post.date,
    body: "",
  };
}

async function getCategories(
  lang: string
): Promise<BlogCategory[]> {
  try {
    const params = new URLSearchParams({
      hide_empty: "true",
      per_page: "100",
      lang,
    });

    const res = await fetch(
      `${SITE_URL}/wp-json/wp/v2/categories?${params}`,
      {
        next: {
          tags: [`categories:${lang}`],
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `REST categories request failed: ${res.status}`
      );
    }

    const data: RestCategory[] = await res.json();

    return data.map((category) => ({
      id: category.id,
      name: decodeEntities(category.name),
      slug: category.slug,
      count: category.count,
    }));
  } catch (error) {
    console.error("getCategories failed:", error);
    return [];
  }
}

export interface GetBlogPostsParams {
  page: number;
  lang: string;
  search?: string;
  category?: string;
}

export type GetBlogPostsResult =
  | {
      ok: true;
      articles: BlogArticle[];
      total: number;
      totalPages: number;
      categories: BlogCategory[];
    }
  | {
      ok: false;
      error: string;
      categories: BlogCategory[];
    };

export async function getBlogPosts({
  page,
  lang,
  search,
  category,
}: GetBlogPostsParams): Promise<GetBlogPostsResult> {
  const categories = await getCategories(lang);

  const safePage =
    Number.isFinite(page) && page > 0
      ? Math.floor(page)
      : 1;

  const trimmedSearch = search?.trim();

  let categoryId: number | null = null;

  if (category && category !== "All") {
    const matchedCategory = categories.find(
      (item) => item.slug === category
    );

    if (!matchedCategory) {
      return {
        ok: true,
        articles: [],
        total: 0,
        totalPages: 0,
        categories,
      };
    }

    categoryId = matchedCategory.id;
  }

  const params = new URLSearchParams({
    lang,
    page: String(safePage),
    per_page: String(PER_PAGE),
    _embed: "wp:featuredmedia,wp:term",
    orderby: "date",
    order: "desc",
  });

  if (trimmedSearch) {
    params.set("search", trimmedSearch);
  }

  if (categoryId) {
    params.set("categories", String(categoryId));
  }

  try {
    const res = await fetch(
      `${SITE_URL}/wp-json/wp/v2/posts?${params}`,
      {
        next: {
          tags: [
            `posts:${lang}`,
            `posts:${lang}:category:${category ?? "all"}`,
          ],
        },
      }
    );

    if (res.status === 400) {
      return {
        ok: true,
        articles: [],
        total: 0,
        totalPages: 0,
        categories,
      };
    }

    if (!res.ok) {
      throw new Error(
        `REST posts request failed: ${res.status}`
      );
    }

    const total = Number(
      res.headers.get("X-WP-Total") ?? 0
    );

    const totalPages = Number(
      res.headers.get("X-WP-TotalPages") ?? 0
    );

    const posts: RestPost[] = await res.json();

    return {
      ok: true,
      articles: posts.map(toArticle),
      total,
      totalPages,
      categories,
    };
  } catch (error) {
    console.error("getBlogPosts failed:", error);

    return {
      ok: false,
      error: "Unable to load articles.",
      categories,
    };
  }
}