'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const LOGO_URL =
  "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/9004751bf_dxbvipcom_logo.svg";

interface LogoProps {
  className?: string;
  light?: boolean;
  gold?: boolean;
  src?: string | null;
}

export default function Logo({
  className = "h-9",
  light = false,
  gold = false,
  src,
}: LogoProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (typeof src !== "string" || !src) {
      setSvgContent(null);
      return;
    }

    const trimmed = src.trim();

    // If admin already provided inline SVG markup
    if (trimmed.startsWith("<svg")) {
      setSvgContent(trimmed);
      return;
    }

    // If src is a URL to an .svg file, fetch it client-side and inline it
    try {
      const url = new URL(trimmed, typeof window !== "undefined" ? window.location.href : undefined);
      if (url.pathname.toLowerCase().endsWith(".svg")) {
        fetch(url.href)
          .then((r) => r.text())
          .then((text) => {
            // Prefer CSS `color` by converting fills to `currentColor` when possible
            const processed = text.replace(/fill="(?!currentColor)[^\"]*"/gi, 'fill="currentColor"');
            setSvgContent(processed);
          })
          .catch(() => setSvgContent(null));
        return;
      }
    } catch (e) {
      // not a valid URL — fallthrough
    }

    setSvgContent(null);
  }, [src]);

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="DXB-VIP home"
    >
      {svgContent ? (
        <span
          className={`flex items-center justify-center ${className}`}
          style={{ color: "rgb(169 136 68)" }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <img
          src={src || LOGO_URL}
          alt="DXB-VIP Business Setup Consultants"
          className={`h-full w-auto transition-all duration-500 ${
            light ? "brightness-0 invert" : ""
          }`}
          style={
            gold
              ? {
                  filter:
                    "brightness(0) saturate(100%) invert(67%) sepia(35%) saturate(1131%) hue-rotate(351deg) brightness(96%) contrast(87%)",
                }
              : undefined
          }
        />
      )}
    </Link>
  );
}