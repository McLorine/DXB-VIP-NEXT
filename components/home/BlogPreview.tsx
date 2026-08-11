import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import { Image } from "@/components/ui/image";
import type { BlogPreviewBlock, WPPostSummary } from "@/lib/wordpress/types";

type Props = BlogPreviewBlock & { articles?: WPPostSummary[] };

export default function BlogPreview({
  blogPreviewEyebrow,
  blogPreviewHeading,
  blogPreviewViewAllText,
  blogPreviewViewAllLink,
  articles = [],
}: Props) {
  if (!articles.length) return null;

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={blogPreviewEyebrow} title={blogPreviewHeading} />
          <Reveal>
            <Link
              href={blogPreviewViewAllLink}
              className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold-deep"
            >
              {blogPreviewViewAllText} <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.09}>
              <Link href={`/media/${a.slug}`} className="monolith group block overflow-hidden">
                <Image src={a.coverUrl} alt={a.title} className="h-52 w-full" />
                <div className="p-7">
                  <span className="eyebrow">{a.categoryName}</span>
                  <h3 className="mt-3 text-[1.15rem] leading-snug group-hover:text-gold-deep transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-slatewarm">{a.excerpt}</p>
                 
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
