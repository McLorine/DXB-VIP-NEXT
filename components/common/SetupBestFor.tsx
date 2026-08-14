"use client"
import React from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import type { IsItRightForYouBlock } from "@/lib/wordpress/types";

export default function SetupBestFor({
  bestForEyebrow,
  bestForTitle,
  bestForIntro,
  bestForPoints,
  bestForImage,
  bestForButtonText,
  bestForButtonLink,
}: IsItRightForYouBlock) {
  if (!bestForPoints?.length) return null;
  return (
    <section className="py-24 md:py-32 bg-sand">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={bestForEyebrow}
          title={`Who a ${bestForTitle} is best suited for`}
          intro={bestForIntro}
          align="center"
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="space-y-4">
            {bestForPoints.map((b, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-gold/20 bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Check className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <p className="text-[0.98rem] text-charcoal leading-relaxed pt-1.5">{b.pointText}</p>
              </div>
            ))}
            <div className="pt-3">
              <GoldButton to={bestForButtonLink}>{bestForButtonText}</GoldButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-[20px] border border-gold/20">
            {bestForImage?.node && (
              <Image src={bestForImage.node.sourceUrl} alt={bestForImage.node.altText || bestForTitle} className="h-[420px] w-full" />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}