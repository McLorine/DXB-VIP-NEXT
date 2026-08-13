"use client";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { WPLanguage, WPTranslation } from "@/lib/wordpress/types";

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
    return () => setTranslations(null, []);
  }, [currentLanguage, translations, setTranslations]);

  return null;
}