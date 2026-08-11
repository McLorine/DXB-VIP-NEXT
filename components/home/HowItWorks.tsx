import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import { STEPS } from "@/lib/siteData";

export default function HowItWorks() {
  return (
    <section className="bg-charcoal py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          light
          eyebrow="The Process"
          title="How it works"
          intro="Four steps, one advisor, no surprises. Most clients move from first call to licensed company in under three weeks."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-heading text-4xl text-gold">0{i + 1}</span>
                <span className="h-px flex-1 bg-gold/30" />
              </div>
              <h3 className="mt-5 text-[1.2rem] text-white">{s.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-white/60">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}