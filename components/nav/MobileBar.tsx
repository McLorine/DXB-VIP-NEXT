import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";

import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { CONTACT } from "@/lib/siteData";

export default function MobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 lg:hidden">
      <div className="glass flex items-center justify-around rounded-full px-3 py-2.5 shadow-[0_20px_40px_-20px_rgba(26,26,26,0.4)]">
        {/* Call */}
        <a
          href={CONTACT.phoneHref}
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

        {/* WhatsApp */}
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 px-4 text-charcoal"
        >
          <WhatsAppIcon className="h-5 w-5 text-gold-deep" />

          <span className="text-[0.62rem] uppercase tracking-[0.14em]">
            WhatsApp
          </span>
        </a>

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