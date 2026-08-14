import React from "react";
import Link from "next/link";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/common/Reveal";

export default function FeaturedBento({ articles }) {
  if (!articles || articles.length < 3) return null;
  const [big, ...rest] = articles;

  return (
    <div className="grid gap-7 md:grid-cols-3">
      <Reveal className="h-full md:col-span-2 md:row-span-2">
        <Link
          href={big.href}
          className="group relative block h-full min-h-[460px] overflow-hidden rounded-2xl"
        >
          <Image src={big.cover_url} alt={big.title} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <span className="eyebrow text-gold-soft">{big.category}</span>
            <h3 className="mt-3 max-w-xl text-[1.6rem] leading-tight text-white transition-colors group-hover:text-gold-soft md:text-[2.05rem]">
              {big.title}
            </h3>
            <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/75">{big.excerpt}</p>
            <span className="mt-5 block text-[0.72rem] uppercase tracking-[0.16em] text-white/60">
              {big.read_minutes} min read
            </span>
          </div>
        </Link>
      </Reveal>

      {rest.slice(0, 2).map((art, i) => (
        <Reveal key={art.id} delay={0.1 + i * 0.08} className="h-full md:row-span-1">
          <Link
            href={art.href}
            className="monolith group flex h-full min-h-[220px] flex-col overflow-hidden"
          >
            <Image src={art.cover_url} alt={art.title} className="h-44 w-full" />
            <div className="flex flex-1 flex-col p-6">
              <span className="eyebrow">{art.category}</span>
              <h3 className="mt-2 text-[1.1rem] leading-snug transition-colors group-hover:text-gold-deep">
                {art.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[0.85rem] leading-relaxed text-slatewarm">{art.excerpt}</p>
              <span className="mt-auto pt-4 text-[0.7rem] uppercase tracking-[0.16em] text-slatewarm/70">
                {art.read_minutes} min read
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}