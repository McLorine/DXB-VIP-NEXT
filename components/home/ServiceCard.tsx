import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/common/Icon";

type Props = {
  to: string;
  icon: string;
  title: string;
  desc: string;
};

export default function ServiceCard({ to, icon, title, desc }: Props) {
  return (
    <Link
      href={to}
      className="monolith group flex flex-col gap-4 p-7"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 text-gold transition-colors group-hover:bg-gold/10">
        <Icon name={icon} className="w-5 h-5" />
      </span>

      <h3 className="text-[1.15rem] leading-snug">
        {title}
      </h3>

      <p className="text-[0.9rem] leading-relaxed text-slatewarm">
        {desc}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
        Explore

        <ArrowUpRight
          className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          strokeWidth={1.8}
        />
      </span>
    </Link>
  );
}