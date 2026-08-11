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
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0 opacity-35">
        {ctaBackgroundImage?.node && (
          <Image
            src={ctaBackgroundImage.node.sourceUrl}
            alt={ctaBackgroundImage.node.altText || ""}
            className="h-full w-full"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
      <Reveal className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <span className="eyebrow">{ctaEyebrow}</span>
        <h2 className="mt-4 max-w-2xl text-[1.9rem] md:text-[2.8rem] leading-[1.1] text-white">
          {ctaHeading}
        </h2>
        <p className="mt-5 max-w-xl text-white/70">{ctaDescription}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <GoldButton to={ctaPrimaryButtonLink}>{ctaPrimaryButtonText}</GoldButton>
          <GoldButton href={ctaSecondaryButtonLink} variant="light" target="_blank" rel="noreferrer">
            {ctaSecondaryButtonText}
          </GoldButton>
        </div>
      </Reveal>
    </section>
  );
}
