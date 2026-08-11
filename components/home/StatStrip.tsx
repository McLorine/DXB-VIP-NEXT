import React from "react";
import { TRUST_STATS } from "@/lib/siteData";

export default function StatStrip({ dark = false }) {
  return (
    <div className={`${dark ? "glass-dark" : "glass"} rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y divide-x md:divide-y-0 divide-gold/20`}>
      {TRUST_STATS.map((s) => (
        <div key={s.label} className="px-6 py-6 text-center first:border-l-0">
          <div className={`font-heading text-2xl md:text-3xl ${dark ? "text-white" : "text-charcoal"}`}>{s.value}</div>
          <div className={`mt-1.5 text-[0.65rem] uppercase tracking-[0.18em] ${dark ? "text-white/60" : "text-slatewarm/80"}`}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}