import React from "react";
import { Check } from "lucide-react";
import type { EstimatorOption } from "@/lib/wordpress/types";
import { ICON_MAP } from "./defaults";

interface Props {
  option: EstimatorOption;
  selected: boolean;
  onClick: () => void;
}

export default function EstimatorOptionCard({ option, selected, onClick }: Props) {
  const Icon = option.optionIcon !== "none" ? ICON_MAP[option.optionIcon] : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition-all ${
        selected
          ? "border-charcoal ring-1 ring-charcoal"
          : "border-gold/20 bg-white hover:border-gold/50"
      }`}
    >
      {option.optionBadge && (
        <span className="absolute -top-3 right-4 rounded-full bg-gold-deep px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white">
          {option.optionBadge}
        </span>
      )}

      {Icon && (
        <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold">
          <Icon className="h-5 w-5" strokeWidth={1.4} />
        </span>
      )}

      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-[1.02rem] text-charcoal">{option.optionLabel}</span>
        {selected && <Check className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={2.2} />}
      </div>
      {option.optionDescription && (
        <span className="text-[0.85rem] text-slatewarm">{option.optionDescription}</span>
      )}
    </button>
  );
}
