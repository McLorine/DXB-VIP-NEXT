"use client"
import React from "react";
import SectionHeading from "@/components/common/SectionHeading";
import FaqAccordion from "@/components/home/FaqAccordion";
import GoldButton from "@/components/common/GoldButton";
import Reveal from "@/components/common/Reveal";
import type { FaqBlock } from "@/lib/wordpress/types";

export default function FaqSection({
  faqEyebrow,
  faqHeading,
  faqDescription,
  faqButtonText,
  faqButtonLink,
  faqItems,
}: FaqBlock) {

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={faqEyebrow} title={faqHeading} intro={faqDescription} />
          <Reveal delay={0.15} className="mt-9">
            <GoldButton to={faqButtonLink} variant="outline">
              {faqButtonText}
            </GoldButton>
          </Reveal>
        </div>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}
