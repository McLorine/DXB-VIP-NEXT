import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import { CEOS } from "@/lib/siteData";

export default function CeoSection() {
  return (
    <section className="bg-sand py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet our CEOs"
          intro="You will speak with senior people. Both founders remain personally involved in structuring decisions."
        />
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {CEOS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.12} className="flex flex-col gap-6 sm:flex-row">
              <div className="w-full sm:w-48 shrink-0 overflow-hidden rounded-2xl">
                <Image src={c.image} alt={`${c.name}, ${c.role}`} className="h-64 sm:h-60 w-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[1.35rem]">{c.name}</h3>
                <span className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-gold-deep">{c.role}</span>
                <p className="mt-4 text-[0.93rem] leading-relaxed text-slatewarm">{c.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-14">
          <GoldButton to="/contact#consultation">Speak with a founder</GoldButton>
        </Reveal>
      </div>
    </section>
  );
}