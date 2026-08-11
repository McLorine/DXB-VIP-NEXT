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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesItems.map((service, i) => (
            <Reveal key={`${service.serviceTitle}-${i}`} delay={(i % 4) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}