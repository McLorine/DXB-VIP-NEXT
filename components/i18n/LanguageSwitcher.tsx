"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Front-page translations can come back from WPGraphQL as an absolute URL
 * (e.g. "https://dxb-vip.local/ru/") instead of a relative path. Always
 * normalize to a relative path so next/link routes internally instead of
 * navigating to the actual WordPress site.
 */
function toRelativePath(uri: string): string {
  try {
    const url = new URL(uri);
    return url.pathname + url.search + url.hash;
  } catch {
    return uri; // already relative
  }
}

export default function LanguageSwitcher() {
  const { currentLanguage, translations } = useLanguage();

  if (!currentLanguage || translations.length === 0) return null;

  return (
    <nav aria-label="Language" className="flex items-center gap-3">
      <span className="text-sm font-medium uppercase text-white/90">
        {currentLanguage.slug}
      </span>
      {translations.map((t) => (
        <Link
          key={t.language.slug}
          href={toRelativePath(t.uri)}
          className="text-sm uppercase text-white/60 transition-colors hover:text-white"
        >
          {t.language.slug}
        </Link>
      ))}
    </nav>
  );
}