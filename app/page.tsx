"use client";
import React, { useEffect, useState } from "react";
import { base44 } from "../api/base44Client";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import Jurisdictions from "@/components/home/Jurisdictions";
import GoldButton from "@/components/common/GoldButton";
import WhyChoose from "@/components/home/WhyChoose";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import CeoSection from "@/components/home/CeoSection";
import BlogPreview from "@/components/home/BlogPreview";
import ConsultationSection from "@/components/common/ConsultationSection";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/common/CtaBand";

type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  read_minutes: number;
  cover_url: string;
  published_on: string;
  body: string;
  id: number;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    base44.entities.Article.list("-published_on", 3 as any).then((res: Article[]) => setArticles(res));
  }, []);

  return (
    <>
      <Hero />
      <ServicesGrid />
     <Jurisdictions />
     <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">Cost Estimator</span>
            <h2 className="mt-4 text-[1.9rem] md:text-[2.7rem] leading-[1.1]">See your setup cost in 60 seconds</h2>
            <p className="mt-5 text-slatewarm max-w-lg">
              Pick your business type, jurisdiction and add-ons — your all-inclusive estimate updates live. No email required until you want the confirmed price.
            </p>
            <div className="mt-8">
              <GoldButton to="/estimate">Estimate my cost</GoldButton>
            </div>
          </div>
          <div className="glass rounded-[20px] p-8 grid grid-cols-2 gap-6">
            {[
              { v: "AED 11,900", l: "Free Zone from" },
              { v: "AED 15,400", l: "Mainland from" },
              { v: "5 days", l: "Fastest license" },
              { v: "0%", l: "Personal income tax" }
            ].map((x) => (
              <div key={x.l}>
                <div className="font-heading text-xl md:text-2xl text-charcoal">{x.v}</div>
                <div className="mt-1 text-[0.66rem] uppercase tracking-[0.16em] text-slatewarm/80">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
     <WhyChoose />
     <HowItWorks />
      <Benefits />
      <CeoSection />
    <BlogPreview articles={articles} />
      <ConsultationSection sourcePage="home" />
      <FaqSection />
            <CtaBand />
    </>
  );
}