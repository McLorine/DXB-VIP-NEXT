import React from "react";
import type { PartnersBlock, PartnerItem } from "@/lib/wordpress/types";

function isSvg(item: PartnerItem): boolean {
  return item.partnerLogo?.node.mimeType === "image/svg+xml";
}

/**
 * Fetches raw SVG markup for inlining. Falls back to null (caller renders
 * a normal <img> instead) if the fetch fails for any reason — a broken
 * logo should never crash the whole marquee.
 */
async function fetchSvgMarkup(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1hr
    if (!res.ok) return null;
    const text = await res.text();
    return text.includes("<svg") ? text : null;
  } catch {
    return null;
  }
}

function PartnerLogo({ item, svgMarkup }: { item: PartnerItem; svgMarkup: string | null }) {
  const name = item.partnerName || item.partnerLogo?.node.altText || "Partner";

  if (svgMarkup) {
    return (
      <span
        role="img"
        aria-label={name}
        className="[&_svg]:h-12 [&_svg]:w-auto [&_svg]:max-w-[240px] [&_svg]:fill-current text-charcoal/55 transition-colors duration-300 hover:text-gold-deep"
        // Markup is fetched server-side from a trusted WordPress media URL,
        // not user input at request time — same trust boundary as any other
        // WP-hosted asset already rendered on the page.
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    );
  }

  if (item.partnerLogo?.node.sourceUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.partnerLogo.node.sourceUrl}
        alt={name}
        className="h-12 w-auto max-w-[240px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />
    );
  }

  // No logo uploaded at all — fall back to the text label so a missing
  // asset doesn't leave a silent gap in the marquee.
  return (
    <span className="font-heading text-[1.35rem] tracking-wide text-charcoal/55 transition-colors duration-300 hover:text-gold-deep">
      {name}
    </span>
  );
}

export default async function Partners({ partnersEyebrow, partnersItems }: PartnersBlock) {
  if (!partnersItems.length) return null;

  // Pre-fetch SVG markup for every SVG logo, in parallel, once per render.
  const svgMarkups = await Promise.all(
    partnersItems.map((item) => (isSvg(item) ? fetchSvgMarkup(item.partnerLogo!.node.sourceUrl) : null))
  );

  const items = [...partnersItems, ...partnersItems]; // duplicated for the seamless marquee loop
  const markups = [...svgMarkups, ...svgMarkups];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-gold/15">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center eyebrow mb-10">{partnersEyebrow}</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track gap-24 px-7">
          {items.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-14 whitespace-nowrap">
              <PartnerLogo item={item} svgMarkup={markups[i]} />
              <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}