"use client"
import React from "react";
import Reveal from "@/components/common/Reveal";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { Image } from "@/components/ui/image";
import type { ConsultationBlock } from "@/lib/wordpress/types";

export default function ConsultationSection(block: ConsultationBlock) {
  const { consultationBackgroundImage } = block;

  return (
    <section id="consultation" className="relative overflow-hidden scroll-mt-24 py-24 md:py-32">
      <div className="absolute inset-0">
        {consultationBackgroundImage?.node && (
          <Image
            src={consultationBackgroundImage.node.sourceUrl}
            alt={consultationBackgroundImage.node.altText || ""}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-alabaster/70" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <ConsultationForm block={block} />
        </Reveal>
      </div>
    </section>
  );
}
