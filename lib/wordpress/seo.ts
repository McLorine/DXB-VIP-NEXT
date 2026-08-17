import type { Metadata } from "next";
import { headers } from "next/headers";

const WORDPRESS_SITE_URL = process.env.WORDPRESS_SITE_URL?.replace(/\/$/, "");

const SEO_REVALIDATE_SECONDS = 300;

export interface RankMathSeo {
  metadata: Metadata;
  jsonLd: unknown[];
}

interface RankMathHeadResponse {
  success?: boolean;
  head?: string;
}

function extractDocumentHead(html: string): string | null {
  const match = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match?.[1]?.trim() || null;
}

function decodeHtml(value: string): string {
  const entities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const radix = code[1]?.toLowerCase() === "x" ? 16 : 10;
      const number = Number.parseInt(code.replace(/^#x?/i, ""), radix);
      return Number.isFinite(number) ? String.fromCodePoint(number) : entity;
    }

    return entities[code.toLowerCase()] ?? entity;
  });
}

function getAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const pattern = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(tag))) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? "");
  }

  return attributes;
}

function rewriteWordPressUrl(value: string, publicSiteUrl: string): string {
  if (!WORDPRESS_SITE_URL) return value;
  return value.split(WORDPRESS_SITE_URL).join(publicSiteUrl);
}

function absolutePublicUrl(path: string, publicSiteUrl: string): string {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return new URL(normalizedPath, `${publicSiteUrl}/`).toString();
}

function asNumber(value?: string): number | undefined {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function asImages(publicSiteUrl: string, url?: string, alt?: string, width?: string, height?: string) {
  return url
    ? [{
        url: rewriteWordPressUrl(url, publicSiteUrl),
        alt: alt || undefined,
        width: asNumber(width),
        height: asNumber(height),
      }]
    : undefined;
}

export function parseRankMathHead(head: string, publicSiteUrl: string): RankMathSeo {
  const meta = new Map<string, string>();
  const links: Array<Record<string, string>> = [];

  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = getAttributes(tag);
    const key = (attributes.property ?? attributes.name)?.toLowerCase();
    if (key && attributes.content) meta.set(key, attributes.content);
  }

  for (const tag of head.match(/<link\b[^>]*>/gi) ?? []) {
    links.push(getAttributes(tag));
  }

  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeHtml(titleMatch[1].replace(/<[^>]+>/g, "").trim()) : undefined;
  const canonical = links.find((link) => link.rel?.toLowerCase() === "canonical")?.href;
  const alternateLanguages = Object.fromEntries(
    links
      .filter((link) => link.rel?.toLowerCase() === "alternate" && link.hreflang && link.href)
      .map((link) => [link.hreflang, rewriteWordPressUrl(link.href, publicSiteUrl)])
  );

  const ogImage = meta.get("og:image") ?? meta.get("og:image:secure_url");
  const twitterImage = meta.get("twitter:image");
  const publishedTime = meta.get("article:published_time");
  const modifiedTime = meta.get("article:modified_time");

  const metadata: Metadata = {
    title,
    description: meta.get("description"),
    keywords: meta.get("keywords"),
    authors: meta.get("author") ? [{ name: meta.get("author")! }] : undefined,
    generator: meta.get("generator"),
    alternates: canonical || Object.keys(alternateLanguages).length
      ? {
          canonical: canonical ? rewriteWordPressUrl(canonical, publicSiteUrl) : undefined,
          languages: Object.keys(alternateLanguages).length ? alternateLanguages : undefined,
        }
      : undefined,
    // A string preserves every Rank Math directive, including max-snippet,
    // max-image-preview and plugin additions unknown to Next.js.
    robots: meta.get("robots"),
    verification: {
      google: meta.get("google-site-verification"),
      yandex: meta.get("yandex-verification"),
      yahoo: meta.get("y_key"),
    },
    openGraph: meta.get("og:title") || meta.get("og:description") || ogImage
      ? {
          title: meta.get("og:title"),
          description: meta.get("og:description"),
          url: meta.get("og:url") ? rewriteWordPressUrl(meta.get("og:url")!, publicSiteUrl) : undefined,
          siteName: meta.get("og:site_name"),
          locale: meta.get("og:locale"),
          type: meta.get("og:type") === "article" ? "article" : "website",
          images: asImages(
            publicSiteUrl,
            ogImage,
            meta.get("og:image:alt"),
            meta.get("og:image:width"),
            meta.get("og:image:height")
          ),
          ...(meta.get("og:type") === "article"
            ? { publishedTime, modifiedTime, authors: meta.get("article:author") ? [meta.get("article:author")!] : undefined }
            : {}),
        }
      : undefined,
    twitter: meta.get("twitter:title") || meta.get("twitter:description") || twitterImage
      ? {
          card: meta.get("twitter:card") === "summary" ? "summary" : "summary_large_image",
          title: meta.get("twitter:title"),
          description: meta.get("twitter:description"),
          creator: meta.get("twitter:creator"),
          site: meta.get("twitter:site"),
          images: twitterImage ? [rewriteWordPressUrl(twitterImage, publicSiteUrl)] : undefined,
        }
      : undefined,
    facebook: meta.get("fb:app_id") ? { appId: meta.get("fb:app_id")! } : undefined,
  };

  const jsonLd: unknown[] = [];
  const scriptPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch: RegExpExecArray | null;

  while ((scriptMatch = scriptPattern.exec(head))) {
    try {
      jsonLd.push(JSON.parse(rewriteWordPressUrl(scriptMatch[1].trim(), publicSiteUrl)));
    } catch {
      // Ignore malformed schema without breaking the page response.
    }
  }

  return { metadata, jsonLd };
}

export async function getRankMathSeo(path: string): Promise<RankMathSeo | null> {
  if (!WORDPRESS_SITE_URL) return null;
  const publicSiteUrl = await getRequestSiteUrl();

  const pageUrl = new URL(path, `${WORDPRESS_SITE_URL}/`).toString();
  const endpoint = new URL("/wp-json/rankmath/v1/getHead", `${WORDPRESS_SITE_URL}/`);
  endpoint.searchParams.set("url", pageUrl);

  try {
    const apiResponse = await fetch(endpoint, {
      next: { revalidate: SEO_REVALIDATE_SECONDS, tags: [`seo:${path}`] },
    });

    if (apiResponse.ok) {
      const payload = (await apiResponse.json()) as RankMathHeadResponse;

      // Some Rank Math versions omit `success` while still returning `head`.
      // The head itself is the authoritative value.
      if (payload.head) return parseRankMathHead(payload.head, publicSiteUrl);
    }
  } catch (error) {
    console.warn(`Rank Math REST endpoint failed for "${path}"; trying the WordPress HTML.`, error);
  }

  try {
    // The REST endpoint only works when Rank Math's Headless CMS Support is
    // enabled. A normal WordPress response contains the same generated SEO
    // head, so use it as a transparent fallback.
    const pageResponse = await fetch(pageUrl, {
      next: { revalidate: SEO_REVALIDATE_SECONDS, tags: [`seo:${path}`] },
    });

    if (!pageResponse.ok) return null;
    const head = extractDocumentHead(await pageResponse.text());
    if (!head) return null;

    return parseRankMathHead(head, publicSiteUrl);
  } catch (error) {
    console.error(`Rank Math SEO HTML fallback failed for "${path}":`, error);
    return null;
  }
}

export async function fallbackMetadata(
  path: string,
  title?: string,
  description?: string,
  image?: string
): Promise<Metadata> {
  const publicSiteUrl = await getRequestSiteUrl();
  const url = absolutePublicUrl(path, publicSiteUrl);
  return {
    title: title || "DXB VIP",
    description: description || undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: title || "DXB VIP",
      description: description || undefined,
      url,
      images: asImages(publicSiteUrl, image),
    },
  };
}

export async function getRequestSiteUrl(): Promise<string> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || requestHeaders.get("host");
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || (host?.startsWith("localhost") ? "http" : "https");

  if (host) return `${protocol}://${host}`;

  // Build-time fallback only. At request time the actual host always wins.
  return WORDPRESS_SITE_URL ?? "http://localhost:3000";
}

export function rewriteSeoUrls(value: string, publicSiteUrl: string): string {
  return rewriteWordPressUrl(value, publicSiteUrl);
}
