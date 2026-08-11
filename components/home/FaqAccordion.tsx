import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  items: { q: string; a: string }[];
};

export default function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="divide-y divide-gold/20 border-y border-gold/20">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
            >
              <span className={`font-heading text-[1.08rem] md:text-[1.25rem] transition-colors ${isOpen ? "text-gold-deep" : "text-charcoal group-hover:text-gold-deep"}`}>
                {it.q}
              </span>
              <Plus
                className={`mt-1 w-5 h-5 shrink-0 text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                strokeWidth={1.4}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-10 max-w-3xl text-slatewarm leading-relaxed">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}