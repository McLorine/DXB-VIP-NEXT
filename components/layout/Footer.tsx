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
} from "react-icons/fa";

import { CONTACT, SERVICES, SOCIAL } from "@/lib/siteData";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Media & Insights", to: "/media" },
      { label: "Contact", to: "/contact" },
      {
        label: "Book a Consultation",
        to: "/contact#consultation",
      },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Trade Licenses", to: "/trade-licenses" },
      { label: "Business Setup", to: "/business-setup" },
      {
        label: "Additional Services",
        to: "/additional-services",
      },
      {
        label: "Golden Visa",
        to: "/additional-services#golden-visa",
      },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: SOCIAL.linkedin,
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: SOCIAL.instagram,
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: SOCIAL.facebook,
    icon: FaFacebookF,
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-charcoal pb-28 text-white/70 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 lg:grid-cols-4 lg:px-10">

        {/* Brand */}
        <div className="space-y-5">
          <Link
            href="/"
            className="font-heading text-2xl tracking-wide text-white"
          >
            DXB<span className="text-gold">-</span>VIP
          </Link>

          <p className="text-sm leading-relaxed">
            Dubai&apos;s concierge business setup consultancy.
            Licensing, residency, banking and compliance for
            international founders.
          </p>

          <div className="flex gap-3 pt-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
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
            ))}
          </div>
        </div>

        {/* Navigation columns */}
        {cols.map((column) => (
          <div
            key={column.title}
            className="space-y-4"
          >
            <h4 className="eyebrow">
              {column.title}
            </h4>

            <ul className="space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.to}
                    className="transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="eyebrow">
            Contact
          </h4>

          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Phone
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={1.5}
              />

              <a
                href={CONTACT.phoneHref}
                className="hover:text-gold"
              >
                {CONTACT.phone}
              </a>
            </li>

            <li className="flex gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={1.5}
              />

              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-gold"
              >
                {CONTACT.email}
              </a>
            </li>

            <li className="flex gap-3">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={1.5}
              />

              <span>
                {CONTACT.address}
              </span>
            </li>

            <li className="flex gap-3">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={1.5}
              />

              <span>
                {CONTACT.hours}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs sm:flex-row lg:px-10">
          <p>
            © {new Date().getFullYear()} DXB-VIP Business Setup
            Consultants. Dubai, UAE.
          </p>

          <div className="flex flex-wrap gap-6">
            {SERVICES.slice(0, 2).map((service) => (
              <Link
                key={service.slug}
                href={`/${service.hub}/${service.slug}`}
                className="transition-colors hover:text-gold"
              >
                {service.title}
              </Link>
            ))}

            <Link
              href="/contact"
              className="transition-colors hover:text-gold"
            >
              Privacy & Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

