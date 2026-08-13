"use client";

import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import { Image } from "@/components/ui/image";
import { useSvg } from "@/hooks/useSvg";
import type { BenefitsBlock } from "@/lib/wordpress/types";

export default function Benefits({
  benefitsEyebrow,
  benefitsHeading,
  benefitsDescription,
  benefitsItems,
}: BenefitsBlock) {
  return (
    <section className="py-24 md:py-36 bg-sand">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={benefitsEyebrow}
          title={benefitsHeading}
          intro={benefitsDescription}
          align="center"
        />

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefitsItems.map((b, i) => {
            const iconUrl = b.benefitIcon?.node?.sourceUrl;
            const iconAlt =
              b.benefitIcon?.node?.altText || b.benefitTitle;

            const { svg, isSvg } = useSvg(iconUrl);

            return (
              <Reveal
                key={b.benefitTitle}
                delay={i * 0.06}
                className="flex gap-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                  {iconUrl && (
                    <>
                      {isSvg && svg ? (
                        <span
                          className="
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            [&>svg]:h-5
                            [&>svg]:w-5
                            [&>svg]:max-h-5
                            [&>svg]:max-w-5
                          "
                          dangerouslySetInnerHTML={{
                            __html: svg,
                          }}
                        />
                      ) : (
                        <Image
                          src={iconUrl}
                          alt={iconAlt}
                          className="h-5 w-5 object-contain"
                        />
                      )}
                    </>
                  )}
                </span>

                <div>
                  <h3 className="text-[1.1rem]">
                    {b.benefitTitle}
                  </h3>

                  <p className="mt-2 text-[0.92rem] leading-relaxed text-slatewarm">
                    {b.benefitDescription}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}