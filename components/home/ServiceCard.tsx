"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/lib/wordpress/types";
import { useSvg } from "@/hooks/useSvg";

export default function ServiceCard({
  service,
}: {
  service: ServiceItem;
}) {
  const {
    serviceIcon,
    serviceTitle,
    serviceDescription,
    serviceLink,
    serviceLinkText,
  } = service;

  const iconUrl = serviceIcon?.node?.sourceUrl;
  const altText = serviceIcon?.node?.altText || "";

  const { svg, isSvg } = useSvg(iconUrl);

  return (
    <Link
      href={serviceLink?.url ?? "#"}
      className="monolith group flex flex-col gap-4 p-7"
    >
      {iconUrl && (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 text-gold transition-colors group-hover:bg-gold/10">
          {isSvg && svg ? (
            /* Inline SVG */
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                [&>svg]:h-5
                [&>svg]:w-5
                [&>svg]:max-h-5
                [&>svg]:max-w-5
              "
              dangerouslySetInnerHTML={{
                __html: svg,
              }}
            />
          ) : (
            /* Regular image */
            <img
              src={iconUrl}
              alt={altText}
              className="h-5 w-5 object-contain"
            />
          )}
        </span>
      )}

      <h3 className="text-[1.15rem] leading-snug">
        {serviceTitle}
      </h3>

      <p className="text-[0.9rem] leading-relaxed text-slatewarm">
        {serviceDescription}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
        {serviceLinkText || "Explore"}

        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          strokeWidth={1.8}
        />
      </span>
    </Link>
  );
}