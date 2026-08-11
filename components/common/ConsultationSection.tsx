import React from "react";
import Reveal from "@/components/common/Reveal";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/siteData";

export default function ConsultationSection({ sourcePage = "home", compact = false }) {
  return (
    <section id="consultation" className="relative overflow-hidden scroll-mt-24 py-24 md:py-32">
      <div className="absolute inset-0">
        <Image src={IMAGES.stillLife} alt="Fountain pen and leather portfolio on a marble desk" className="h-full w-full" />
        <div className="absolute inset-0 bg-alabaster/85" />
      </div>
      <div className={`relative mx-auto px-6 lg:px-10 ${compact ? "max-w-3xl" : "max-w-4xl"}`}>
        <Reveal>
          <ConsultationForm sourcePage={sourcePage} />
        </Reveal>
      </div>
    </section>
  );
}