import { rewriteSeoUrls } from "@/lib/wordpress/seo";

export const revalidate = 300;

export async function GET(request: Request) {
  const wordpressUrl = process.env.WORDPRESS_SITE_URL?.replace(/\/$/, "");
  const publicUrl = new URL(request.url).origin;

  if (wordpressUrl) {
    try {
      const response = await fetch(`${wordpressUrl}/robots.txt`, {
        next: { revalidate, tags: ["seo:robots"] },
      });

      if (response.ok) {
        const robots = rewriteSeoUrls(await response.text(), publicUrl).replace(
          `${publicUrl}/sitemap_index.xml`,
          `${publicUrl}/sitemap.xml`
        );
        return new Response(robots, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    } catch (error) {
      console.error("Unable to proxy WordPress robots.txt:", error);
    }
  }

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${publicUrl}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
