import React from "react";
import { ClipboardList, Sparkles } from "lucide-react";

interface SummaryItem {
  label: string;
  value: string | null;
}

interface Props {
  title: string;
  items: SummaryItem[];
  addOns: string[];
  nextStepsTitle: string;
  nextStepsText: string;
}

export default function EstimatorSummary({ title, items, addOns, nextStepsTitle, nextStepsText }: Props) {
  return (
    <div className="glass rounded-[20px] p-6 md:p-8">
      <div className="flex items-center gap-2 text-gold-deep">
        <ClipboardList className="h-4 w-4" strokeWidth={1.6} />
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em]">{title}</span>
      </div>

      <div className="mt-5 divide-y divide-gold/10">
        {items.map((it) => (
          <div key={it.label} className="flex items-center justify-between gap-3 py-3">
            <span className="text-[0.68rem] uppercase tracking-[0.14em] text-slatewarm/70">
              {it.label}
            </span>
            <span className="text-right text-[0.9rem] text-charcoal">{it.value ?? "—"}</span>
          </div>
        ))}
      </div>

      {addOns.length > 0 && (
        <div className="mt-2 border-t border-gold/10 pt-4">
          <span className="text-[0.68rem] uppercase tracking-[0.14em] text-slatewarm/70">
            Add-on Services
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {addOns.map((a) => (
              <span
                key={a}
                className="rounded-full border border-gold/30 px-3 py-1.5 text-[0.78rem] text-charcoal"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-gold/20 bg-white/60 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.6} />
          <span className="text-[0.85rem] font-semibold text-charcoal">{nextStepsTitle}</span>
        </div>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-slatewarm">{nextStepsText}</p>
      </div>
    </div>
  );
}
