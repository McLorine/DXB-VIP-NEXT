"use client"
import React, { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import type { ReviewsBlock } from "@/lib/wordpress/types";

function GoogleG({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

const AVATAR_COLORS = ["#C5A059", "#1A1A1A", "#A98844", "#4A4A4A", "#8a6d3b", "#6b5b3e"];

const initials = (name: string) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

function ReviewCard({
    name, role, rating, date, text, index,
}: {
    name: string; role: string; rating: number; date: string; text: string; index: number;
}) {
    return (
        <article className="monolith flex h-full flex-col p-7">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GoogleG className="w-5 h-5" />
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-slatewarm">Posted on Google</span>
                </div>
                <Quote className="w-7 h-7 text-gold/25" strokeWidth={1} />
            </div>
            <div className="mt-5 flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" strokeWidth={0} />
                ))}
            </div>
            <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-slatewarm">&ldquo;{text}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3 border-t border-gold/15 pt-5">
                <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[0.8rem] font-semibold text-white"
                    style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                >
                    {initials(name)}
                </span>
                <div>
                    <div className="text-[0.9rem] font-medium text-charcoal">{name}</div>
                    <div className="text-[0.72rem] text-slatewarm">{role} · {date}</div>
                </div>
            </div>
        </article>
    );
}

export default function Reviews({
    reviewsEyebrow,
    reviewsHeading,
    reviewsDescription,
    reviewsRatingValue,
    reviewsCountLabel,
    reviewsItems,
}: ReviewsBlock) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const update = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 10);
        setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    const scroll = (dir: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const card = el.querySelector("[data-card]") as HTMLElement | null;
        const w = card ? card.offsetWidth + 24 : 360;
        el.scrollBy({ left: dir * w, behavior: "smooth" });
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    if (!reviewsItems.length) return null;

    return (
        <section className="py-24 md:py-32 bg-charcoal">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                    <SectionHeading
                        light
                        eyebrow="Client Stories"
                        title="Founders rate us 4.9 on Google"
                        intro="Real reviews from real businesses we've set up across the UAE — unedited and unpaid."
                    />          <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="font-heading text-5xl text-white">{reviewsRatingValue}</span>
                            <div className="flex flex-col">
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-gold text-gold" strokeWidth={0} />
                                    ))}
                                </div>
                                <span className="text-[0.72rem] text-white/60">{reviewsCountLabel}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll(-1)}
                                disabled={!canPrev}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-white transition-all hover:border-gold hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Previous reviews"
                            >
                                <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
                            </button>
                            <button
                                onClick={() => scroll(1)}
                                disabled={!canNext}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-white transition-all hover:border-gold hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Next reviews"
                            >
                                <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {reviewsItems.map((r, i) => (
                        <div key={i} data-card className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                            <ReviewCard
                                name={r.reviewerName}
                                role={r.reviewerRole}
                                rating={r.reviewerRating}
                                date={r.reviewerDate}
                                text={r.reviewerText}
                                index={i}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}