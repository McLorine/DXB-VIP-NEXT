"use client"
import React from "react";
import { Quote } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import RichText from "@/components/common/RichText";
import GoldButton from "@/components/common/GoldButton";
import { Image } from "@/components/ui/image";
import type { FoundersBlock } from "@/lib/wordpress/types";

export default function Founders({
  foundersEyebrow,
  foundersHeading,
  foundersDescription,
  foundersItems,
  foundersButtonText,
  foundersButtonLink,
}: FoundersBlock) {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={foundersEyebrow}
          title={foundersHeading}
          intro={foundersDescription}
          align="center"
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {foundersItems.map((f, i) => (
            <Reveal
              key={f.founderName}
              delay={i * 0.12}
              className="monolith grid grid-cols-[auto_1fr] overflow-hidden rounded-[20px] bg-white"
            >
              {f.founderPhoto?.node && (
                <div className="w-32 sm:w-44 shrink-0 overflow-hidden">
                  <Image
                    src={f.founderPhoto.node.sourceUrl}
                    alt={f.founderPhoto.node.altText || f.founderName}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <Quote className="h-5 w-5 text-gold/60" strokeWidth={1.4} />
                <div className="mt-3 text-[0.92rem] leading-relaxed text-slatewarm">
                  <div
                    dangerouslySetInnerHTML={{ __html: f.founderBio }}
                  />
                </div>
                <>
                  <h3 className="text-[1.1rem]">{f.founderName}</h3>
                  <span className="text-[0.68rem] uppercase tracking-[0.18em] text-gold-deep">
                    {f.founderRole}
                  </span>
                </>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <GoldButton to={foundersButtonLink}>{foundersButtonText}</GoldButton>
        </Reveal>
      </div>
    </section>
  );
}
