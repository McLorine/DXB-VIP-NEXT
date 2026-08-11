import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import { Image } from "@/components/ui/image";

type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  read_minutes: number;
  cover_url: string;
  published_on: string;
  body: string;
  id?: number;
};

export default function BlogPreview({ articles = [] }: { articles?: Article[] }) {
  if (!articles || !articles.length) return null;
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Media & Insights" title="Guidance from the desk" />
          <Reveal>
            <Link href="/media" className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
              All articles <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.09}>
              <Link href={`/media/${a.slug}`} className="monolith group block overflow-hidden">
                <Image src={a.cover_url} alt={a.title} className="h-52 w-full" />
                <div className="p-7">
                  <span className="eyebrow">{a.category}</span>
                  <h3 className="mt-3 text-[1.15rem] leading-snug group-hover:text-gold-deep transition-colors">{a.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-slatewarm">{a.excerpt}</p>
                  <span className="mt-5 block text-[0.72rem] uppercase tracking-[0.16em] text-slatewarm/70">{a.read_minutes} min read</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}