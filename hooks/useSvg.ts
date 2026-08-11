"use client";

import { useEffect, useState } from "react";

export function useSvg(src?: string | null) {
  const [svg, setSvg] = useState<string | null>(null);

  const isSvg = !!src && (
    src.toLowerCase().endsWith(".svg") ||
    src.toLowerCase().includes(".svg?")
  );

  useEffect(() => {
    if (!src || !isSvg) {
      setSvg(null);
      return;
    }

    let cancelled = false;

    const loadSvg = async () => {
      try {
        const response = await fetch(src);

        if (!response.ok) {
          throw new Error(
            `Failed to load SVG: ${response.status}`
          );
        }

        const text = await response.text();

        if (cancelled) return;

        const parser = new DOMParser();

        const document = parser.parseFromString(
          text,
          "image/svg+xml"
        );

        const svgElement = document.querySelector("svg");

        if (!svgElement) {
          setSvg(null);
          return;
        }

        // Remove potentially dangerous elements.
        document
          .querySelectorAll("script")
          .forEach((element) => element.remove());

        // Remove inline event handlers.
        document.querySelectorAll("*").forEach((element) => {
          [...element.attributes].forEach((attribute) => {
            if (
              attribute.name
                .toLowerCase()
                .startsWith("on")
            ) {
              element.removeAttribute(attribute.name);
            }
          });
        });

        svgElement.removeAttribute("width");
        svgElement.removeAttribute("height");

        svgElement.setAttribute(
          "preserveAspectRatio",
          "xMidYMid meet"
        );

        setSvg(svgElement.outerHTML);
      } catch (error) {
        console.error("Failed to load SVG:", error);
        setSvg(null);
      }
    };

    loadSvg();

    return () => {
      cancelled = true;
    };
  }, [src, isSvg]);

  return {
    svg,
    isSvg,
  };
}