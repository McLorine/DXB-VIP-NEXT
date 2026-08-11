"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import MegaMenu from "@/components/nav/MegaMenu";
import GoldButton from "@/components/common/GoldButton";
import Logo from "@/components/common/Logo";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { SETUPS, ADDITIONAL_SERVICES } from "@/lib/siteData";

type MenuItem = { to: string; title: string; desc: string; icon?: string };
type Menu = { label: string; path: string; intro?: string; items: MenuItem[] };

const MENUS: Record<string, Menu> = {
  "business-setup": {
    label: "Business Setup",
    path: "/business-setup",
    intro: "Choose the right jurisdiction for your company.",
    items: SETUPS.map((s) => ({
      to: `/business-setup/${s.slug}`,
      title: s.title,
      desc: `${s.lead.slice(0, 62)}…`,
      icon: "Building2",
    })),
  },

  "corporate-services": {
    label: "Corporate Services",
    path: "/additional-services",
    intro: "Residency, banking, tax and compliance support.",
    items: ADDITIONAL_SERVICES.slice(0, 6).map((s) => ({
      to: `/additional-services#${s.slug}`,
      title: s.title,
      desc: `${s.desc.slice(0, 62)}…`,
      icon: s.icon,
    })),
  },
};

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMobile(false);
    setOpen(null);
  }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  const linkColor = transparent
    ? "text-white hover:text-gold"
    : "text-charcoal hover:text-gold-deep";

  const iconBtn = transparent
    ? "border-white/40 text-white hover:border-white hover:bg-white/10"
    : "border-gold/30 text-charcoal hover:border-gold hover:bg-gold/10 hover:text-gold-deep";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      onMouseLeave={() => setOpen(null)}
    >
      <div
        className={`transition-all duration-500 ${
          transparent
            ? "glass-dark"
            : "glass shadow-[0_10px_40px_-24px_rgba(26,26,26,0.35)]"
        } border-x-0 border-t-0`}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <Logo className="h-9" light={transparent} />

          {/* Desktop navigation */}
          <nav className="hidden items-center flex-nowrap gap-3 whitespace-nowrap lg:flex xl:gap-4">
            {Object.entries(MENUS).map(([key, menu]) => (
              <button
                key={key}
                type="button"
                onMouseEnter={() => setOpen(key)}
                onClick={() =>
                  setOpen(open === key ? null : key)
                }
                className={`flex items-center gap-1 text-[0.66rem] uppercase tracking-[0.08em] transition-colors ${
                  open === key ? "text-gold-deep" : linkColor
                }`}
              >
                {menu.label}

                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    open === key ? "rotate-180" : ""
                  }`}
                  strokeWidth={1.6}
                />
              </button>
            ))}

            {[
              ["About", "/about"],
              ["Blog", "/media"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`gold-path text-[0.66rem] uppercase tracking-[0.08em] transition-colors ${linkColor}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <GoldButton
              to="/estimate"
              className="h-12 whitespace-nowrap px-4 text-[0.66rem]"
            >
              Cost Calculator
            </GoldButton>

            <a
              href="tel:+971524940085"
              title="+971 52 494 0085"
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${iconBtn}`}
            >
              <Phone
                className="h-4 w-4"
                strokeWidth={1.6}
              />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=971524940085"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${iconBtn}`}
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`transition-colors lg:hidden ${
              transparent ? "text-white" : "text-charcoal"
            }`}
            onClick={() => setMobile(!mobile)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
          >
            {mobile ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mx-auto hidden max-w-7xl px-6 pt-3 lg:block lg:px-10"
            onMouseEnter={() => setOpen(open)}
          >
            <MegaMenu
              dark={transparent}
              hubLabel={MENUS[open].label}
              hubPath={MENUS[open].path}
              intro={MENUS[open].intro}
              items={MENUS[open].items}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden glass lg:hidden"
          >
            <div className="space-y-5 px-6 py-6">
              {Object.values(MENUS).map((menu) => (
                <div key={menu.path} className="space-y-2">
                  <Link
                    href={menu.path}
                    className="block text-[0.78rem] font-bold uppercase tracking-[0.18em] text-gold-deep"
                  >
                    {menu.label}
                  </Link>

                  <div className="space-y-1.5 pl-1">
                    {menu.items.map((item) => (
                      <Link
                        key={item.to}
                        href={item.to}
                        className="block text-[0.92rem] text-charcoal"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-2 border-t border-gold/20 pt-2">
                {[
                  ["About", "/about"],
                  ["Blog", "/media"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-[0.92rem] text-charcoal"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}