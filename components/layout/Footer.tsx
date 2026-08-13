import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaPinterestP,
  FaGlobe,
} from "react-icons/fa";

import { CONTACT, SOCIAL } from "@/lib/siteData";
import type { WordPressMenuItem } from "@/lib/wordpress/menu";
import type { ThemeSettings } from "@/lib/wordpress/themeSettings";
import Logo from "@/components/common/Logo";

type FooterProps = {
  menuItems: WordPressMenuItem[];
  bottomMenuItems: WordPressMenuItem[];
  themeSettings?: ThemeSettings;
};

export default function Footer({
  menuItems,
  bottomMenuItems = [],
  themeSettings,
}: FooterProps) {
  const topLevelItems = menuItems.filter(
    (item) => !item.parentId
  );

  const getChildren = (parentId: string) =>
    menuItems.filter(
      (item) => item.parentId === parentId
    );

  const socialLinks = [];

  if (themeSettings?.socialLinkedin) {
    socialLinks.push({
      label: "LinkedIn",
      href: themeSettings.socialLinkedin,
      icon: FaLinkedinIn,
    });
  }
  if (themeSettings?.socialInstagram) {
    socialLinks.push({
      label: "Instagram",
      href: themeSettings.socialInstagram,
      icon: FaInstagram,
    });
  }
  if (themeSettings?.socialFacebook) {
    socialLinks.push({
      label: "Facebook",
      href: themeSettings.socialFacebook,
      icon: FaFacebookF,
    });
  }
  if (themeSettings?.socialYoutube) {
    socialLinks.push({
      label: "YouTube",
      href: themeSettings.socialYoutube,
      icon: FaYoutube,
    });
  }
  if (themeSettings?.socialTiktok) {
    socialLinks.push({
      label: "TikTok",
      href: themeSettings.socialTiktok,
      icon: FaTiktok,
    });
  }
  if (themeSettings?.socialX) {
    socialLinks.push({
      label: "X (Twitter)",
      href: themeSettings.socialX,
      icon: FaTwitter,
    });
  }
  if (themeSettings?.socialPinterest) {
    socialLinks.push({
      label: "Pinterest",
      href: themeSettings.socialPinterest,
      icon: FaPinterestP,
    });
  }

  if (themeSettings?.customSocials) {
    themeSettings.customSocials.forEach((social) => {
      if (social.name && social.url) {
        socialLinks.push({
          label: social.name,
          href: social.url,
          icon: FaGlobe,
        });
      }
    });
  }

  return (
    <footer className="border-t-2 border-gold bg-charcoal pb-28 text-white/70 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-10">

        {/* Brand */}
        <div className="space-y-5">
          {themeSettings?.logoUrl ? (
            <Logo className="h-9" gold src={themeSettings.logoUrl} />
          ) : (
            <Link
              href="/"
              className="font-heading text-2xl tracking-wide text-white"
            >
              DXB<span className="text-gold">-</span>VIP
            </Link>
          )}

          {themeSettings?.footerDescription && (
            <p className="text-sm leading-relaxed">
              {themeSettings.footerDescription}
            </p>
          )}

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map(
                ({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-charcoal"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              )}
            </div>
          )}
        </div>

        {/* WordPress Footer Navigation */}
        {topLevelItems.map((column) => {
          const children = getChildren(column.id);

          return (
            <div
              key={column.id}
              className="space-y-4"
            >
              <h4 className="eyebrow">
                {column.label}
              </h4>

              {/* Optional top-level description */}
              {column.navigationMenuItemSettings
                ?.description && (
                <p className="text-sm leading-relaxed text-white/50">
                  {
                    column.navigationMenuItemSettings
                      .description
                  }
                </p>
              )}

              {/* Child links */}
              {children.length > 0 && (
                <ul className="space-y-2.5 text-sm">
                  {children.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={normalizeMenuUrl(item.url)}
                        className="transition-colors hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Top-level item without children */}
              {children.length === 0 && (
                <Link
                  href={normalizeMenuUrl(column.url)}
                  className="text-sm transition-colors hover:text-gold"
                >
                  {column.label}
                </Link>
              )}
            </div>
          );
        })}

        {/* Contact */}
        {(themeSettings?.phoneNumber ||
          themeSettings?.emailAddress ||
          themeSettings?.footerAddress ||
          themeSettings?.footerWorkingHours) && (
          <div className="space-y-4">
            <h4 className="eyebrow">
              Contact
            </h4>

            <ul className="space-y-3 text-sm">
              {themeSettings?.phoneNumber && (
                <li className="flex gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />

                  <a
                    href={`tel:${themeSettings.phoneNumber}`}
                    className="hover:text-gold"
                  >
                    {themeSettings.phoneNumber}
                  </a>
                </li>
              )}

              {themeSettings?.emailAddress && (
                <li className="flex gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />

                  <a
                    href={`mailto:${themeSettings.emailAddress}`}
                    className="hover:text-gold"
                  >
                    {themeSettings.emailAddress}
                  </a>
                </li>
              )}

              {themeSettings?.footerAddress && (
                <li className="flex gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />

                  <span>
                    {themeSettings.footerAddress}
                  </span>
                </li>
              )}

              {themeSettings?.footerWorkingHours && (
                <li className="flex gap-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />

                  <span>
                    {themeSettings.footerWorkingHours}
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs sm:flex-row lg:px-10">

          {/* Copyright */}
          <p>
            {themeSettings?.copyrightText || (
              <>
                © {new Date().getFullYear()} DXB-VIP Business Setup Consultants. Dubai, UAE.
              </>
            )}
          </p>

          {/* Bottom WordPress Menu */}
          {bottomMenuItems.length > 0 && (
            <nav aria-label="Footer secondary navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {bottomMenuItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={normalizeMenuUrl(item.url)}
                      className="transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}

function normalizeMenuUrl(url: string) {
  if (!url) return "#";

  try {
    const parsed = new URL(url);

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

