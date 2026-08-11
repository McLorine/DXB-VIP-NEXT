import React from "react";
import Reveal from "@/components/common/Reveal";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import { CONTACT, IMAGES } from "@/lib/siteData";

type Props = {
  title?: string;
  copy?: string;
};

export default function CtaBand({
  title = "Ready to start? Let's find your structure.",
  copy = "One 30-minute call with a senior advisor, and you'll know exactly what your Dubai company will cost and how long it will take."
}: Props) {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0 opacity-35">
        <Image src={IMAGES.museum} alt="Dubai architecture at golden hour" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
      <Reveal className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <span className="eyebrow">Next Step</span>
        <h2 className="mt-4 max-w-2xl text-[1.9rem] md:text-[2.8rem] leading-[1.1] text-white">{title}</h2>
        <p className="mt-5 max-w-xl text-white/70">{copy}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <GoldButton to="/contact#consultation">Book a Free Consultation</GoldButton>
          <GoldButton href={CONTACT.whatsapp} variant="light" target="_blank" rel="noreferrer">WhatsApp Us</GoldButton>
        </div>
      </Reveal>
    </section>
  );
}