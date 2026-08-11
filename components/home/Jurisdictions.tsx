"use client"
import Link from "next/link";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/common/Reveal";
import GoldButton from "@/components/common/GoldButton";
import type { JurisdictionsBlock } from "@/lib/wordpress/types";

export default function Jurisdictions({
  jurisdictionsSectionLabel,
  jurisdictionsSectionTitle,
  jurisdictionsSectionDescription,
  jurisdictionsCards,
  jurisdictionsCtaButtonText,
  jurisdictionsCtaButtonLink,
  jurisdictionsSecondaryLinkText,
  jurisdictionsSecondaryLinkUrl,
}: JurisdictionsBlock) {
  return (
    <section className="bg-sand py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <span className="eyebrow">{jurisdictionsSectionLabel}</span>

          <h2 className="text-[2.1rem] leading-[1.08] md:text-[3.1rem]">
            {jurisdictionsSectionTitle}
          </h2>

          <p className="text-[1.05rem] leading-relaxed text-slatewarm">
            {jurisdictionsSectionDescription}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {jurisdictionsCards.map((card, index) => (
            <Reveal key={card.cardTitle} delay={index * 0.12}>
              <Link
                href={card.cardLink?.url ?? "#"}
                target={card.cardLink?.target ?? undefined}
                className="group relative block overflow-hidden rounded-[20px]"
              >
                <div className="relative h-[460px] md:h-[520px]">

                  {card.cardBackgroundImage?.node && (
                    <Image
                      src={card.cardBackgroundImage.node.sourceUrl}
                      alt={card.cardBackgroundImage.node.altText || card.cardTitle}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105 w-full h-full"
                      style={{ objectPosition: "50% 40%" }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/10" />

                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="text-[0.66rem] uppercase tracking-[0.2em] text-gold">
                      {card.cardBadge}
                    </span>

                    <h3 className="mt-2 text-[1.8rem] text-white md:text-[2.1rem]">
                      {card.cardTitle}
                    </h3>

                    <p className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-white/70">
                      {card.cardDescription}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-gold">
                      {card.cardLinkText}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex flex-col items-center gap-4">
          <GoldButton to={jurisdictionsCtaButtonLink}>
            {jurisdictionsCtaButtonText}
          </GoldButton>

          <Link
            href={jurisdictionsSecondaryLinkUrl}
            className="text-[0.92rem] text-charcoal underline-offset-4 transition-colors hover:text-gold-deep hover:underline"
          >
            {jurisdictionsSecondaryLinkText}
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
