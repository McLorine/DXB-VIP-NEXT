
import React from "react";
import Link from "next/link";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/common/Reveal";

export default function ArticleCard({ article, index = 0 }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link href={article.href} className="monolith group block h-full overflow-hidden">
        <Image src={article.cover_url} alt={article.title} className="h-52 w-full" />
        <div className="p-7">
          <span className="eyebrow">{article.category}</span>
          <h3 className="mt-3 text-[1.15rem] leading-snug group-hover:text-gold-deep transition-colors">{article.title}</h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-slatewarm">{article.excerpt}</p>
          <span className="mt-5 block text-[0.72rem] uppercase tracking-[0.16em] text-slatewarm/70">{article.read_minutes} min read</span>
        </div>
      </Link>
    </Reveal>
  );
}