import React from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import RichText from "@/components/common/RichText";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import { WHY_POINTS, IMAGES } from "@/lib/siteData";

export default function WhyChoose() {
  return (
    <section className="py-24 md:py-36 bg-sand">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[20px]">
            <Image src={IMAGES.lobby} alt="Professionals arriving in a modern Dubai office lobby" className="h-[420px] md:h-[540px] w-full" />
          </div>
          <div className="glass absolute -bottom-6 left-6 right-6 rounded-2xl px-6 py-5 md:left-10 md:right-auto md:w-64">
            <div className="font-heading text-3xl text-charcoal">18 yrs</div>
            <div className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-slatewarm/80">Advising founders in the UAE</div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Why DXB-VIP"
            title="A consultancy built for people who value their time"
            intro="Most founders don't need more options — they need the right one, priced honestly and delivered on schedule. That is the whole of our work."
          />
          <ul className="mt-10 space-y-7">
            {WHY_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="flex gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                  <Check className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-[1.08rem]">{p.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-slatewarm">
                    <RichText text={p.desc} />
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-11">
            <GoldButton to="/contact#consultation">Get My Free Structure Plan</GoldButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}