"use client";

import Link from "next/link";

import {
  usePathname,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lang: string;
}

const translations: Record<
  string,
  {
    previous: string;
    next: string;
  }
> = {
  en: {
    previous: "Previous",
    next: "Next",
  },

  ru: {
    previous: "Назад",
    next: "Далее",
  },

  fr: {
    previous: "Précédent",
    next: "Suivant",
  },
};

function getTranslations(lang: string) {
  return translations[lang] ?? translations.en;
}

export default function Pagination({
  currentPage,
  totalPages,
  lang,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = getTranslations(lang);

  if (totalPages <= 1) {
    return null;
  }

  function getPageHref(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    // Page 1 doesn't need ?page=1
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();

    return query
      ? `${pathname}?${query}`
      : pathname;
  }

  // Don't render hundreds of page buttons.
  const pages = getVisiblePages(
    currentPage,
    totalPages
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {/* PREVIOUS */}

      {currentPage > 1 && (
        <Link
          href={getPageHref(currentPage - 1)}
          scroll={false}
          className="
            rounded-lg
            border
            border-black/10
            px-4
            py-2.5
            text-sm
            transition-colors
            hover:border-black/30
          "
        >
          {t.previous}
        </Link>
      )}

      {/* PAGE NUMBERS */}

      {pages.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-slatewarm"
            >
              …
            </span>
          );
        }

        const pageNumber = item;

        const active =
          pageNumber === currentPage;

        return (
          <Link
            key={pageNumber}
            href={getPageHref(pageNumber)}
            scroll={false}
            aria-current={
              active ? "page" : undefined
            }
            className={`
              flex
              h-10
              min-w-10
              items-center
              justify-center
              rounded-lg
              border
              px-3
              text-sm
              transition-colors

              ${
                active
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-black/10 bg-white text-charcoal hover:border-black/30"
              }
            `}
          >
            {pageNumber}
          </Link>
        );
      })}

      {/* NEXT */}

      {currentPage < totalPages && (
        <Link
          href={getPageHref(currentPage + 1)}
          scroll={false}
          className="
            rounded-lg
            border
            border-black/10
            px-4
            py-2.5
            text-sm
            transition-colors
            hover:border-black/30
          "
        >
          {t.next}
        </Link>
      )}
    </nav>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number
): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      "...",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}