"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Languages } from "lucide-react";
import FranceFlag from "country-flag-icons/react/1x1/FR";
import RussiaFlag from "country-flag-icons/react/1x1/RU";
import UnitedKingdomFlag from "country-flag-icons/react/1x1/GB";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { WPLanguage } from "@/lib/wordpress/types";

const LANGUAGE_META: Record<string, { label: string }> = {
  en: { label: "English" },
  fr: { label: "Français" },
  ru: { label: "Русский" },
};

function languageKey(language: WPLanguage) {
  return (language.slug || language.code).toLowerCase();
}

function getLanguageMeta(language: WPLanguage) {
  const key = languageKey(language);
  return LANGUAGE_META[key] ?? {
    label: language.name || language.code.toUpperCase(),
  };
}

function FlagIcon({ language }: { language: WPLanguage }) {
  const key = languageKey(language);

  if (key === "en") return <UnitedKingdomFlag className="block h-full w-full" aria-hidden="true" />;
  if (key === "fr") return <FranceFlag className="block h-full w-full" aria-hidden="true" />;
  if (key === "ru") return <RussiaFlag className="block h-full w-full" aria-hidden="true" />;

  return <Languages className="h-4 w-4 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />;
}

/** Keep WPGraphQL's absolute WordPress URLs inside the Next.js app. */
function toRelativePath(uri: string): string {
  try {
    const url = new URL(uri);
    return url.pathname + url.search + url.hash;
  } catch {
    return uri;
  }
}

export default function LanguageSwitcher({ dark = true }: { dark?: boolean }) {
  const { currentLanguage, translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  if (!currentLanguage || translations.length === 0) return null;

  const currentKey = languageKey(currentLanguage);
  const currentMeta = getLanguageMeta(currentLanguage);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={`Change language. Current language: ${currentMeta.label}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`group flex h-12 items-center gap-2 rounded-full border px-3 transition-all duration-300 ${
          dark
            ? "border-white/30 bg-white/[0.06] text-white hover:border-gold/70 hover:bg-white/[0.12]"
            : "border-gold/30 bg-white/70 text-charcoal shadow-sm hover:border-gold hover:bg-gold/10"
        } ${isOpen ? "border-gold bg-gold/10" : ""}`}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/10" aria-hidden="true">
          <FlagIcon language={currentLanguage} />
        </span>
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em]">{currentKey}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>

      <div
        role="menu"
        aria-label="Choose language"
        className={`absolute right-0 top-[calc(100%+0.65rem)] w-52 origin-top-right overflow-hidden rounded-2xl border border-gold/25 bg-[#171717]/95 p-1.5 shadow-[0_22px_60px_-18px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-200 ${
          isOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <div className="mb-1 flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/45">
          <Languages className="h-3.5 w-3.5 text-gold" strokeWidth={1.6} aria-hidden="true" />
          Select language
        </div>

        <div className="space-y-0.5">
          <div role="menuitem" aria-current="true" className="flex items-center gap-3 rounded-xl bg-gold/[0.12] px-3 py-2.5 text-white">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-white/10" aria-hidden="true">
              <FlagIcon language={currentLanguage} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{currentMeta.label}</span>
              <span className="block text-[0.58rem] uppercase tracking-[0.14em] text-gold">Current</span>
            </span>
            <Check className="h-4 w-4 text-gold" strokeWidth={2} aria-hidden="true" />
          </div>

          {translations.map((translation) => {
            const key = languageKey(translation.language);
            const meta = getLanguageMeta(translation.language);

            return (
              <Link
                key={key}
                href={toRelativePath(translation.uri)}
                role="menuitem"
                hrefLang={translation.language.locale.replace("_", "-")}
                onClick={() => setIsOpen(false)}
                className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:bg-white/[0.08] focus-visible:text-white focus-visible:outline-none"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-white/10 transition-transform group-hover/item:scale-105" aria-hidden="true">
                  <FlagIcon language={translation.language} />
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium">{meta.label}</span>
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/35 group-hover/item:text-gold">{key}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
