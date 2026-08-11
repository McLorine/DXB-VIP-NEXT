import React from "react";
import SectionHeading from "@/components/common/SectionHeading";
import FaqAccordion from "@/components/home/FaqAccordion";
import GoldButton from "@/components/common/GoldButton";
import Reveal from "@/components/common/Reveal";
import { FAQS } from "@/lib/siteData";

export default function FaqSection() {
  return (
    <section className="bg-sand py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Answers"
            title="Frequently asked questions"
            intro="The questions we're asked on almost every first call — answered plainly."
          />
          <Reveal delay={0.15} className="mt-9">
            <GoldButton to="/contact#consultation" variant="outline">Ask us directly</GoldButton>
          </Reveal>
        </div>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}