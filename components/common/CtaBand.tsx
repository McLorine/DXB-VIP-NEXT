"use client"
import React from "react";
import Reveal from "@/components/common/Reveal";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import type { CtaBandBlock } from "@/lib/wordpress/types";

export default function CtaBand({
  ctaEyebrow,
  ctaHeading,
  ctaDescription,
  ctaBackgroundImage,
  ctaPrimaryButtonText,
  ctaPrimaryButtonLink,
  ctaSecondaryButtonText,
  ctaSecondaryButtonLink,
}: CtaBandBlock) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="absolute inset-0 opacity-[0.07]">
        {ctaBackgroundImage?.node && (
          <Image
            src={ctaBackgroundImage.node.sourceUrl}
            alt={ctaBackgroundImage.node.altText || ""}
            className="h-full w-full"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-sand via-sand/85 to-sand/50" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <span className="eyebrow">{ctaEyebrow}</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
          <h2 className="mt-6 text-[2rem] leading-[1.08] text-charcoal md:text-[3rem]">
            {ctaHeading}
          </h2>
          <p className="mt-5 text-slatewarm">{ctaDescription}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <GoldButton to={ctaPrimaryButtonLink}>{ctaPrimaryButtonText}</GoldButton>
            <GoldButton
              href={ctaSecondaryButtonLink}
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              {ctaSecondaryButtonText}
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
