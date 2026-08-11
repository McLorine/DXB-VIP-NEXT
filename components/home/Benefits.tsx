import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import Icon from "@/components/common/Icon";
import { BENEFITS } from "@/lib/siteData";

export default function Benefits() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why Dubai"
          title="Benefits of owning a business in Dubai"
          intro="A jurisdiction engineered for founders — favourable tax, open ownership and a location that reaches most of the world before lunch."
          align="center"
        />
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06} className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon name={b.icon} className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-[1.1rem]">{b.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-slatewarm">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}