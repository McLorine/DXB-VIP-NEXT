import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import type { MapSectionBlock } from "@/lib/wordpress/types";

export default function MapSection({
  mapEyebrow,
  mapTitle,
  mapAddress,
  mapLocation,
  mapLinkText,
}: MapSectionBlock) {
  const hasCoords = mapLocation?.latitude != null && mapLocation?.longitude != null;

  // No Google Maps API key needed for this embed style — only the ACF
  // admin picker (for editors dropping the pin) requires one, configured
  // separately under ACF → Settings → Google Maps in WP admin.
  const embedSrc = hasCoords
    ? `https://maps.google.com/maps?q=${mapLocation!.latitude},${mapLocation!.longitude}&z=${mapLocation!.zoom ?? 15}&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;

  const openInMapsHref = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${mapLocation!.latitude},${mapLocation!.longitude}${
        mapLocation!.placeId ? `&query_place_id=${mapLocation!.placeId}` : ""
      }`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="monolith grid overflow-hidden rounded-[20px] md:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col justify-center gap-4 bg-white p-8 md:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 text-gold">
              <MapPin className="w-5 h-5" strokeWidth={1.4} />
            </span>
            <span className="eyebrow">{mapEyebrow}</span>
            <h3 className="text-[1.6rem] leading-tight text-charcoal">{mapTitle}</h3>
            <p className="text-[0.95rem] leading-relaxed text-slatewarm">{mapAddress}</p>
            <a
              href={openInMapsHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold-deep hover:text-gold transition-colors"
            >
              {mapLinkText}
              <ExternalLink className="w-4 h-4" strokeWidth={1.6} />
            </a>
          </div>
          <div className="min-h-[360px] md:min-h-[480px]">
            <iframe
              src={embedSrc}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={mapTitle}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
