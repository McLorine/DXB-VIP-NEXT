"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { WPLanguage, WPTranslation } from "@/lib/wordpress/types";

interface LanguageContextValue {
  currentLanguage: WPLanguage | null;
  translations: WPTranslation[];
  setTranslations: (current: WPLanguage | null, translations: WPTranslation[]) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<WPLanguage | null>(null);
  const [translations, setTranslationsState] = useState<WPTranslation[]>([]);

  const setTranslations = useCallback(
    (current: WPLanguage | null, next: WPTranslation[]) => {
      setCurrentLanguage(current);
      setTranslationsState(next);
    },
    []
  );

  return (
    <LanguageContext.Provider value={{ currentLanguage, translations, setTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}