"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useSvg } from "@/hooks/useSvg";

type Item = {
  id: string;
  to: string;
  title: string;
  desc: string;
  icon?: string | null;
};

type Props = {
  intro?: string;
  hubPath: string;
  hubLabel: string;
  items: Item[];
  dark?: boolean;
};

function InlineSvgIcon({
  src,
  dark,
}: {
  src?: string | null;
  dark: boolean;
}) {
  const { svg, isSvg } = useSvg(src);

  const iconBorder = dark
    ? "border-white/25 text-gold group-hover:border-gold group-hover:bg-gold/15"
    : "border-gold/30 text-gold group-hover:border-gold group-hover:bg-gold/10";

  // Determine what to render inside the icon container
  let iconContent: React.ReactNode;

  if (isSvg && svg) {
    // SVG from WordPress — render inline
    iconContent = (
      <span
        className="
          flex
          h-5
          w-5
          items-center
          justify-center
          [&>svg]:h-5
          [&>svg]:w-5
          [&>svg]:max-h-5
          [&>svg]:max-w-5
        "
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      />
    );
  } else if (src && !isSvg) {
    // Non-SVG image URL (png, jpg, webp, etc.) — render as <img>
    iconContent = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className="h-5 w-5 object-contain"
      />
    );
  } else {
    // No icon provided — small dot fallback
    iconContent = (
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
    );
  }

  return (
    <span
      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${iconBorder}`}
    >
      {iconContent}
    </span>
  );
}

export default function MegaMenu({
  intro,
  hubPath,
  hubLabel,
  items,
  dark = false,
}: Props) {
  const bg = dark ? "glass-dark" : "glass";

  const borderColor = dark
    ? "border-white/15"
    : "border-gold/20";

  const introText = dark
    ? "text-white/70"
    : "text-slatewarm";

  const linkText = dark
    ? "text-white hover:text-gold"
    : "text-charcoal hover:text-gold-deep";

  const itemTitle = dark
    ? "text-white"
    : "text-charcoal";

  const itemDesc = dark
    ? "text-white/60"
    : "text-slatewarm/90";

  const itemHoverBg = dark
    ? "hover:bg-white/10"
    : "hover:bg-white/70";

  return (
    <div
      className={`${bg} rounded-2xl p-8 shadow-[0_40px_80px_-40px_rgba(26,26,26,0.35)]`}
    >
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">

        {/* Left column */}
        <div
          className={`flex flex-col justify-between gap-6 md:border-r ${borderColor} md:pr-8`}
        >
          <div className="space-y-3">
            <span className="eyebrow">
              {hubLabel}
            </span>

            {intro && (
              <p
                className={`text-sm leading-relaxed ${introText}`}
              >
                {intro}
              </p>
            )}
          </div>

          <Link
            href={hubPath}
            className={`inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors ${linkText}`}
          >
            View all

            <ArrowUpRight
              className="h-4 w-4"
              strokeWidth={1.6}
            />
          </Link>
        </div>

        {/* Menu items */}
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.to}
              className={`group flex items-start gap-3 rounded-xl p-3.5 transition-colors ${itemHoverBg}`}
            >
              {/* WordPress SVG */}
              <InlineSvgIcon
                src={item.icon}
                dark={dark}
              />

              {/* Text */}
              <span className="min-w-0">
                <span
                  className={`block text-[0.95rem] ${itemTitle}`}
                >
                  {item.title}
                </span>

                {item.desc && (
                  <span
                    className={`block text-[0.8rem] leading-snug ${itemDesc}`}
                  >
                    {item.desc}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}