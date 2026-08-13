"use client"
import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import ServiceCard from "./ServiceCard";
import type { ServicesBlock } from "@/lib/wordpress/types";

export default function ServicesGrid(props: ServicesBlock) {
  const {
    servicesSectionLabel,
    servicesSectionTitle,
    servicesSectionDescription,
    servicesItems,
  } = props;

  if (!servicesItems?.length) return null;

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={servicesSectionLabel}
          title={servicesSectionTitle}
          intro={servicesSectionDescription}
        />
        <div 
          className="mt-14 grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))" }}
        >
          {servicesItems.map((service, i) => (
            <Reveal key={`${service.serviceTitle}-${i}`} delay={(i % 4) * 0.08} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}