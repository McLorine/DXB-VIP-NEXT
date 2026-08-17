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
import { useSvg } from "@/hooks/useSvg";
import type { ThemeSettings } from "@/lib/wordpress/themeSettings";
import LanguageSwitcher from "../i18n/LanguageSwitcher";

type MenuItem = {
  id: string;
  to: string;
  title: string;
  desc: string;
  icon?: string;
};

type Menu = {
  id: string;
  label: string;
  path: string;
  intro?: string;
  items: MenuItem[];
};

type NavbarProps = {
  menusByLanguage: Record<string, Record<string, Menu>>;
  themeSettingsByLanguage: Record<string, ThemeSettings>;
};

function getLanguageFromPath(pathname: string) {
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (firstSegment === "ru" || firstSegment === "fr" || firstSegment === "en") {
    return firstSegment;
  }

  return "en";
}

function NavbarIcon({
  src,
  fallback,
}: {
  src?: string | null;
  fallback: React.ReactNode;
}) {
  const { svg, isSvg } = useSvg(src);

  if (isSvg && svg) {
    return (
      <span
        className="
          flex
          h-5
          w-5
          items-center
          justify-center
          [&>svg]:h-5
          [&>svg]:w-5
          [&>svg]:max-h-5
          [&>svg]:max-w-5
        "
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      />
    );
  }

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className="h-5 w-5 object-contain"
      />
    );
  }

  return <>{fallback}</>;
}

export default function Navbar({ menusByLanguage, themeSettingsByLanguage }: NavbarProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const activeLanguage = getLanguageFromPath(pathname);
  const menus = menusByLanguage[activeLanguage] ?? menusByLanguage.en ?? {};
  const themeSettings = themeSettingsByLanguage[activeLanguage] ?? themeSettingsByLanguage.en;

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

  const hasDarkHero = true;
  const transparent = hasDarkHero && !scrolled;

  const linkColor = transparent
    ? "text-white hover:text-gold"
    : "text-charcoal hover:text-gold-deep";

  const iconBtn = transparent
    ? "border-white/40 text-white hover:border-white hover:bg-white/10"
    : "border-gold/30 text-charcoal hover:border-gold hover:bg-gold/10 hover:text-gold-deep";

  const activeMenu = open ? menus[open] : null;

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
          {themeSettings?.logoUrl && (
            <Logo className="h-9" gold src={themeSettings.logoUrl} />
          )}

          {/* Desktop navigation */}
          <nav className="hidden items-center flex-nowrap gap-3 whitespace-nowrap lg:flex xl:gap-4">
            {Object.entries(menus).map(([key, menu]) => {
              const hasChildren = menu.items.length > 0;

              // Regular menu item without children
              if (!hasChildren) {
                return (
                  <Link
                    key={key}
                    href={menu.path}
                    className={`gold-path text-[0.66rem] uppercase tracking-[0.08em] transition-colors ${linkColor}`}
                  >
                    {menu.label}
                  </Link>
                );
              }

              // Dropdown menu item
              return (
                <button
                  key={key}
                  type="button"
                  onMouseEnter={() => setOpen(key)}
                  onClick={() =>
                    setOpen(open === key ? null : key)
                  }
                  className={`flex items-center gap-1 text-[0.66rem] uppercase tracking-[0.08em] transition-colors ${
                    open === key
                      ? "text-gold-deep"
                      : linkColor
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
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <LanguageSwitcher dark={transparent} />
            {themeSettings?.headerCta?.url && (
              <GoldButton
                to={themeSettings.headerCta.url}
                target={themeSettings.headerCta.target || undefined}
                className="h-12 whitespace-nowrap px-4 text-[0.66rem]"
              >
                {themeSettings.headerCta.title || "Cost Calculator"}
              </GoldButton>
            )}

            {themeSettings?.phoneNumber && (
              <a
                href={`tel:${themeSettings.phoneNumber}`}
                title={themeSettings.phoneNumber}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${iconBtn}`}
              >
                <NavbarIcon
                  src={themeSettings.phoneIcon?.sourceUrl}
                  fallback={<Phone className="h-4 w-4" strokeWidth={1.6} />}
                />
              </a>
            )}

            {themeSettings?.whatsappNumber && (
              <a
                href={
                  themeSettings.whatsappNumber.startsWith("http")
                    ? themeSettings.whatsappNumber
                    : `https://wa.me/${themeSettings.whatsappNumber.replace(/[^0-9]/g, "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${iconBtn}`}
              >
                <NavbarIcon
                  src={themeSettings.whatsappIcon?.sourceUrl}
                  fallback={<WhatsAppIcon className="h-3.5 w-3.5" />}
                />
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`transition-colors lg:hidden ${
              transparent
                ? "text-white"
                : "text-charcoal"
            }`}
            onClick={() => setMobile(!mobile)}
            aria-label={
              mobile ? "Close menu" : "Open menu"
            }
            aria-expanded={mobile}
          >
            {mobile ? (
              <X
                className="h-6 w-6"
                strokeWidth={1.5}
              />
            ) : (
              <Menu
                className="h-6 w-6"
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {activeMenu && activeMenu.items.length > 0 && (
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
              hubLabel={activeMenu.label}
              hubPath={activeMenu.path}
              intro={activeMenu.intro}
              items={activeMenu.items}
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
              {Object.values(menus).map((menu) => {
                const hasChildren =
                  menu.items.length > 0;

                return (
                  <div
                    key={menu.id}
                    className="space-y-2"
                  >
                    {/* Parent */}
                    <Link
                      href={menu.path}
                      className={`block ${
                        hasChildren
                          ? "text-[0.78rem] font-bold uppercase tracking-[0.18em] text-gold-deep"
                          : "text-[0.92rem] text-charcoal"
                      }`}
                    >
                      {menu.label}
                    </Link>

                    {/* Children */}
                    {hasChildren && (
                      <div className="space-y-1.5 pl-1">
                        {menu.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.to}
                            className="block text-[0.92rem] text-charcoal"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
