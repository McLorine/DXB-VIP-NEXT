"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, CalendarCheck } from "lucide-react";

import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import type { ThemeSettings } from "@/lib/wordpress/themeSettings";

function getLanguageFromPath(pathname: string) {
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (firstSegment === "ru" || firstSegment === "fr" || firstSegment === "en") {
    return firstSegment;
  }

  return "en";
}

type MobileBarProps = {
  themeSettingsByLanguage: Record<string, ThemeSettings>;
};

export default function MobileBar({ themeSettingsByLanguage }: MobileBarProps) {
  const pathname = usePathname();
  const activeLanguage = getLanguageFromPath(pathname);
  const themeSettings = themeSettingsByLanguage[activeLanguage] ?? themeSettingsByLanguage.en;
  
  const hasPhone = !!themeSettings?.phoneNumber;
  const hasWhatsapp = !!themeSettings?.whatsappNumber;

  if (!hasPhone && !hasWhatsapp) {
    // Keep it clean: if there is no contact options, don't show the bar at all
    // or keep only the Book link if they want it.
    // Let's keep it visible with the Book link if the page has it, but it's cleaner to show the bar only if something exists.
    // Wait, the Book link is always valid since it is an internal route. Let's render the bar.
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 lg:hidden">
      <div className="glass flex items-center justify-around rounded-full px-3 py-2.5 shadow-[0_20px_40px_-20px_rgba(26,26,26,0.4)]">
        {/* Call */}
        {hasPhone && (
          <a
            href={`tel:${themeSettings.phoneNumber}`}
            className="flex flex-col items-center gap-1 px-4 text-charcoal"
          >
            <Phone
              className="h-5 w-5 text-gold-deep"
              strokeWidth={1.5}
            />

            <span className="text-[0.62rem] uppercase tracking-[0.14em]">
              Call
            </span>
          </a>
        )}

        {/* WhatsApp */}
        {hasWhatsapp && (
          <a
            href={
              themeSettings.whatsappNumber.startsWith("http")
                ? themeSettings.whatsappNumber
                : `https://wa.me/${themeSettings.whatsappNumber.replace(/[^0-9]/g, "")}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 px-4 text-charcoal"
          >
            <WhatsAppIcon className="h-5 w-5 text-gold-deep" />

            <span className="text-[0.62rem] uppercase tracking-[0.14em]">
              WhatsApp
            </span>
          </a>
        )}

        {/* Book */}
        <Link
          href="/contact#consultation"
          className="flex flex-col items-center gap-1 px-2"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-charcoal shadow-[0_10px_24px_-10px_rgba(197,160,89,0.9)]">
            <CalendarCheck
              className="h-5 w-5"
              strokeWidth={1.6}
            />
          </span>

          <span className="text-[0.62rem] uppercase tracking-[0.14em] text-charcoal">
            Book
          </span>
        </Link>
      </div>
    </div>
  );
}