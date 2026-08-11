import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import ServiceCard from "@/components/home/ServiceCard";
import { SERVICES } from "@/lib/siteData";

export default function ServicesGrid() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything your UAE company needs"
          intro="Licensing, jurisdiction selection, residency and compliance — handled under one roof by one advisor."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.08}>
              <ServiceCard to={s.hub === "additional-services" ? `/additional-services#${s.slug}` : `/${s.hub}/${s.slug}`} icon={s.icon} title={s.title} desc={s.desc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}