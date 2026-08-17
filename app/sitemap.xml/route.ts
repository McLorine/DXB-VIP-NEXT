import { getAllContentSlugs } from "@/lib/wordpress/getAllContentSlugs";
import { rewriteSeoUrls } from "@/lib/wordpress/seo";

export const revalidate = 300;

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character]!);
}

async function flattenRankMathSitemap(indexXml: string): Promise<string | null> {
  const childUrls = [...indexXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);

  if (!childUrls.length || !/<sitemapindex\b/i.test(indexXml)) return indexXml;

  const childResponses = await Promise.all(
    childUrls.map(async (url) => {
      try {
        const response = await fetch(url, { next: { revalidate, tags: ["seo:sitemap"] } });
        return response.ok ? response.text() : "";
      } catch {
        return "";
      }
    })
  );

  const urlEntries = childResponses.flatMap((xml) => xml.match(/<url>[\s\S]*?<\/url>/gi) ?? []);
  if (!urlEntries.length) return null;

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries.join("\n")}\n</urlset>`;
}

async function fallbackSitemap(siteUrl: string): Promise<string> {
  let slugs: string[] = [];
  try {
    slugs = await getAllContentSlugs();
  } catch (error) {
    console.error("Unable to build the fallback WordPress sitemap:", error);
  }
  const paths = ["", ...slugs];
  const entries = paths.map((slug) => {
    const url = slug ? `${siteUrl}/${slug.replace(/^\/+|\/+$/g, "")}/` : `${siteUrl}/`;
    return `  <url><loc>${escapeXml(url)}</loc></url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;
}

export async function GET(request: Request) {
  const wordpressUrl = process.env.WORDPRESS_SITE_URL?.replace(/\/$/, "");
  const publicSiteUrl = new URL(request.url).origin;
  let xml: string | null = null;

  if (wordpressUrl) {
    try {
      const response = await fetch(`${wordpressUrl}/sitemap_index.xml`, {
        next: { revalidate, tags: ["seo:sitemap"] },
      });
      if (response.ok) xml = await flattenRankMathSitemap(await response.text());
    } catch (error) {
      console.error("Unable to proxy Rank Math sitemap:", error);
    }
  }

  xml = rewriteSeoUrls(xml ?? (await fallbackSitemap(publicSiteUrl)), publicSiteUrl);
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
