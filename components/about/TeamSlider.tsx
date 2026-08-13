"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { Image } from "@/components/ui/image";
import type { TeamBlock } from "@/lib/wordpress/types";

const GAP = 24;

export default function TeamSlider({
  teamEyebrow,
  teamHeading,
  teamDescription,
  teamMembers,
}: TeamBlock) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [perView, setPerView] = useState(1);

  const count = teamMembers.length;
  const dotCount = Math.max(1, count - perView + 1);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 300;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    return card ? card.offsetWidth + GAP : 300;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setMaxScroll(track.scrollWidth - track.clientWidth);
    const s = step();
    setPerView(s > 0 ? Math.max(1, Math.round(track.clientWidth / s)) : 1);
  }, [step]);

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const id = setTimeout(measure, 350);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(id);
    };
  }, [measure]);

  const scrollToCard = useCallback(
    (i: number) => {
      trackRef.current?.scrollTo({ left: Math.min(i * step(), maxScroll), behavior: "smooth" });
    },
    [step, maxScroll]
  );

  const scrollByCards = useCallback(
    (dir: number) => trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" }),
    [step]
  );

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / step()));
  }, [step]);

  if (!teamMembers.length) return null;

  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading align="center" eyebrow={teamEyebrow} title={teamHeading} intro={teamDescription} />

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {teamMembers.map((m, i) => (
            <article
              key={i}
              data-card
              className="relative aspect-[3/4] w-full shrink-0 snap-start overflow-hidden rounded-[20px] border border-gold/20 bg-charcoal shadow-[0_28px_60px_-30px_rgba(26,26,26,0.4)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              {m.memberPhoto?.node && (
                <Image
                  src={m.memberPhoto.node.sourceUrl}
                  alt={`${m.memberName} — ${m.memberRole}`}
                  fittingType="fit"
                  className="h-full w-full"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent p-6 pt-20">
                <h3 className="text-[1.3rem] text-white">{m.memberName}</h3>
                <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  {m.memberRole}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Previous team member"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-charcoal transition hover:bg-gold/20"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-gold-deep" : "w-3 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Next team member"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-charcoal transition hover:bg-gold/20"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
}