import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/common/Icon";

type Item = {
  to: string;
  title: string;
  desc: string;
  icon?: string;
};

type Props = {
  intro?: string;
  hubPath: string;
  hubLabel: string;
  items: Item[];
  dark?: boolean;
};

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

  const iconBorder = dark
    ? "border-white/25 text-gold group-hover:border-gold group-hover:bg-gold/15"
    : "border-gold/30 text-gold group-hover:border-gold group-hover:bg-gold/10";

  return (
    <div
      className={`${bg} rounded-2xl p-8 shadow-[0_40px_80px_-40px_rgba(26,26,26,0.35)]`}
    >
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <div
          className={`flex flex-col justify-between gap-6 md:border-r ${borderColor} md:pr-8`}
        >
          <div className="space-y-3">
            <span className="eyebrow">
              {hubLabel}
            </span>

            <p
              className={`text-sm leading-relaxed ${introText}`}
            >
              {intro}
            </p>
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

        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`group flex items-start gap-3 rounded-xl p-3.5 transition-colors ${itemHoverBg}`}
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${iconBorder}`}
              >
                <Icon
                  name={item.icon}
                  className="h-4 w-4"
                />
              </span>

              <span>
                <span
                  className={`block text-[0.95rem] ${itemTitle}`}
                >
                  {item.title}
                </span>

                <span
                  className={`block text-[0.8rem] leading-snug ${itemDesc}`}
                >
                  {item.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}