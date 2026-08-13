"use client"
import React from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import RichText from "@/components/common/RichText";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import type { WhyChooseBlock } from "@/lib/wordpress/types";

export default function WhyChoose({
  whyChooseImage,
  whyChooseBadgeValue,
  whyChooseBadgeLabel,
  whyChooseEyebrow,
  whyChooseHeading,
  whyChooseDescription,
  whyChoosePoints,
  whyChooseButtonText,
  whyChooseButtonLink,
}: WhyChooseBlock) {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[20px]">
            {whyChooseImage?.node && (
              <Image
                src={whyChooseImage.node.sourceUrl}
                alt={whyChooseImage.node.altText || whyChooseHeading}
                className="h-[420px] md:h-[540px] w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            )}
          </div>
          <div className="glass absolute -bottom-6 left-6 right-6 rounded-2xl px-6 py-5 md:left-10 md:right-auto md:w-64">
            <div className="font-heading text-3xl text-charcoal">{whyChooseBadgeValue}</div>
            <div className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-slatewarm/80">
              {whyChooseBadgeLabel}
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow={whyChooseEyebrow}
            title={whyChooseHeading}
            intro={whyChooseDescription}
          />
          <ul className="mt-10 space-y-7">
            {whyChoosePoints.map((p, i) => (
              <Reveal key={p.pointTitle} delay={i * 0.08} className="flex gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                  <Check className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-[1.08rem]">{p.pointTitle}</h3>
                  <div className="mt-1.5 text-[0.92rem] leading-relaxed text-slatewarm">
                    <div
                      className="mt-1.5 text-[0.92rem] leading-relaxed text-slatewarm"
                      dangerouslySetInnerHTML={{ __html: p.pointDescription }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-11">
            <GoldButton to={whyChooseButtonLink}>{whyChooseButtonText}</GoldButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
