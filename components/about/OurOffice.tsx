"use client";

import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import { Image } from "@/components/ui/image";

type OfficeImage = {
    sourceUrl: string | null;
    altText: string | null;
};

type OfficeCompany = {
    companyName: string | null;
    companyDescription: string | null;
};

type OurOfficeProps = {
    officeEyebrow?: string | null;
    officeHeading?: string | null;
    officeDescription?: string | null;

    officeGallery?: {
        nodes?: OfficeImage[] | null;
    } | null;

    officeBadgeLabel?: string | null;

    officeBadgeLocation?: OfficeCompany[] | null;
};

const OFFICE_LABELS = [
    "Our workspace in Business Bay",
    "The reception and client lounge",
    "Meeting rooms for advisory sessions",
    "Detail in every corner",
];

function OfficeGallery({
    images,
}: {
    images: OfficeImage[];
}) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(id);
    }, [images.length]);

    if (!images.length) {
        return null;
    }

    return (
        <div className="relative overflow-hidden rounded-[20px]">
            <div className="relative h-[420px] w-full md:h-[520px]">
                {images.map((image, i) => {
                    if (!image.sourceUrl) return null;

                    return (
                        <Image
                            key={`${image.sourceUrl}-${i}`}
                            src={image.sourceUrl}
                            alt={
                                image.altText ||
                                OFFICE_LABELS[i] ||
                                `Office image ${i + 1}`
                            }
                            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 object-cover ${i === active ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    );
                })}
            </div>

            {images.length > 1 && (
                <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`View office image ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === active
                                    ? "w-8 bg-white"
                                    : "w-3 bg-white/50 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function OurOffice({
    officeEyebrow,
    officeHeading,
    officeDescription,
    officeGallery,
    officeBadgeLabel,
    officeBadgeLocation,
}: OurOfficeProps) {
    const images = officeGallery?.nodes ?? [];
    const companies = officeBadgeLocation ?? [];

    return (
        <section className="bg-white py-24 md:py-32">
            <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
                {/* LEFT — Office Gallery */}
                <Reveal className="relative">
                    <OfficeGallery images={images} />

                    <div className="glass absolute -bottom-6 left-6 right-6 rounded-2xl px-6 py-5 md:left-10 md:right-auto md:w-72">
                        <div className="flex items-center gap-2 text-gold-deep">
                            <MapPin
                                className="h-4 w-4"
                                strokeWidth={1.6}
                            />

                            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
                                {officeBadgeLabel || "Headquarters"}
                            </span>
                        </div>

                        {companies.length > 0 && companies[0]?.companyName && (
                            <div className="mt-1.5 text-[0.95rem] text-charcoal">
                                {companies[0].companyName}
                            </div>
                        )}
                    </div>
                </Reveal>

                {/* RIGHT — Content */}
                <div>
                    <SectionHeading
                        eyebrow={officeEyebrow || "Our Office"}
                        title={officeHeading || "Our Office"}
                        intro={officeDescription || ""}
                    />

                    {/* Company list */}
                    {companies.length > 0 && (
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {companies.map((company, index) => (
                                <Reveal
                                    key={`${company.companyName || "company"}-${index}`}
                                    className="monolith p-5"
                                >
                                    {company.companyUrl ? (
                                        <a
                                            href={company.companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block"
                                        >
                                            {company.companyName && (
                                                <h3 className="text-[1rem] text-charcoal transition-colors group-hover:text-gold-deep">
                                                    {company.companyName}
                                                </h3>
                                            )}

                                            {company.companyDescription && (
                                                <p className="mt-1 text-[0.82rem] text-slatewarm">
                                                    {company.companyDescription}
                                                </p>
                                            )}
                                        </a>
                                    ) : (
                                        <>
                                            {company.companyName && (
                                                <h3 className="text-[1rem] text-charcoal">
                                                    {company.companyName}
                                                </h3>
                                            )}

                                            {company.companyDescription && (
                                                <p className="mt-1 text-[0.82rem] text-slatewarm">
                                                    {company.companyDescription}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}