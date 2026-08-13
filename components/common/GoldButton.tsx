import Link from "next/link";
import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] transition-all duration-500";

type Variant = "gold" | "outline" | "light";

const styles: Record<Variant, string> = {
  gold: "bg-gold-deep text-white hover:bg-gold hover:shadow-[0_18px_40px_-18px_rgba(197,160,89,0.8)]",
  outline:
    "border border-gold/50 text-charcoal hover:border-gold hover:bg-gold/10",
  light: "border border-white/40 text-white hover:bg-white/10",
};

type Props = React.PropsWithChildren<{
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  [key: string]: any;
}>;

export default function GoldButton({
  to,
  href,
  variant = "gold",
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link href={to} className={cls} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as any)}>
      {children}
    </button>
  );
}