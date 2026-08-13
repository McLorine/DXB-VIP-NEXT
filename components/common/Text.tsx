"use client"
import React from "react";
import Reveal from "@/components/common/Reveal";
import type { TextBlock } from "@/lib/wordpress/types";

export default function Text({ textEditor }: TextBlock) {
  if (!textEditor) return null;

  return (
    <section className="py-24 md:py-36 bg-sand">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <div
            className="space-y-6 text-[1.05rem] leading-relaxed text-slatewarm [&_p]:mb-0 [&_h2]:text-[1.6rem] [&_h2]:text-charcoal [&_h2]:mb-2 [&_h3]:text-[1.2rem] [&_h3]:text-charcoal [&_strong]:text-charcoal [&_a]:text-gold-deep [&_a]:underline [&_a]:underline-offset-4"
            dangerouslySetInnerHTML={{ __html: textEditor }}
          />
        </Reveal>
      </div>
    </section>
  );
}