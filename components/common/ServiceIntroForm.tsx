"use client"
import React from "react";
import { Clock, Wallet } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import ConsultationForm from "@/components/forms/ConsultationForm";
import type { BusinessSetupBlock } from "@/lib/wordpress/types";

export default function ServiceIntroForm({
  businessSetupEyebrow,
  businessSetupTitle,
  businessSetupContent,
  businessSetupTimeline,
  businessSetupPriceFrom,
  businessSetupConsultationForm,
}: BusinessSetupBlock) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-12 lg:gap-16 lg:grid-cols-[1fr_1fr] lg:items-stretch">
        <Reveal className="space-y-6">
          <span className="eyebrow">{businessSetupEyebrow}</span>
          <h2 className="text-[1.9rem] md:text-[2.3rem] leading-tight max-w-xl">
            {businessSetupTitle}: a smart choice for founders
          </h2>
          <div
            className="space-y-6 max-w-xl [&_p]:text-slatewarm [&_p]:text-[1.02rem] [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: businessSetupContent }}
          />
          <div className="pt-2 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white px-4 py-2 text-[0.85rem] text-charcoal">
              <Clock className="w-4 h-4 text-gold" strokeWidth={1.6} /> Typical timeline: {businessSetupTimeline}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white px-4 py-2 text-[0.85rem] text-charcoal">
              <Wallet className="w-4 h-4 text-gold" strokeWidth={1.6} /> Starting from {businessSetupPriceFrom}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:sticky lg:top-28 h-full">
          <ConsultationForm block={businessSetupConsultationForm} />
        </Reveal>
      </div>
    </section>
  );
}