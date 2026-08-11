import React from "react";
import Reveal from "@/components/common/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, intro, align = "left", light = false }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <Reveal className={`flex flex-col gap-5 max-w-3xl ${alignCls}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`text-[2.1rem] md:text-[3.1rem] leading-[1.08] ${light ? "text-white" : "text-charcoal"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`text-[1.05rem] leading-relaxed ${light ? "text-white/70" : "text-slatewarm"}`}>{intro}</p>
      )}
    </Reveal>
  );
}