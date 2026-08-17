"use client";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { WPLanguage, WPTranslation } from "@/lib/wordpress/types";
import { toHtmlLang } from "@/lib/i18n/htmlLang";

export default function SyncTranslations({
  currentLanguage,
  translations,
}: {
  currentLanguage: WPLanguage | null | undefined;
  translations: WPTranslation[] | null | undefined;
}) {
  const { setTranslations } = useLanguage();

  useEffect(() => {
    setTranslations(currentLanguage ?? null, translations ?? []);
    document.documentElement.lang = toHtmlLang(currentLanguage);
    return () => setTranslations(null, []);
  }, [currentLanguage, translations, setTranslations]);

  return null;
}
