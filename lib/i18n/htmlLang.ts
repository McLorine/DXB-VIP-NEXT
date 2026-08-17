import type { WPLanguage } from "@/lib/wordpress/types";

/** Converts WordPress locales such as en_US or uk_UA to valid BCP 47 tags. */
export function toHtmlLang(language?: WPLanguage | null): string {
  const value = language?.locale || language?.code || language?.slug || "en";
  const parts = value.replace(/_/g, "-").split("-").filter(Boolean);

  if (!parts.length) return "en";

  return parts
    .map((part, index) => {
      if (index === 0) return part.toLowerCase();
      if (/^[a-z]{2}$/i.test(part)) return part.toUpperCase();
      if (/^[a-z]{4}$/i.test(part)) {
        return `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}`;
      }
      return part;
    })
    .join("-");
}
