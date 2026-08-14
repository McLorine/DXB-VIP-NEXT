"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type {
  BlogCategory,
} from "@/lib/wordpress/types";


interface MediaFiltersProps {
  lang: string;
  categories: BlogCategory[];
  activeCategory?: string;
  initialSearch?: string;
}


const TEXT = {
  en: {
    all: "All",
    searchPlaceholder: "Search articles...",
    searchButton: "Search",
    clear: "Clear",
  },

  ru: {
    all: "Все",
    searchPlaceholder: "Поиск статей...",
    searchButton: "Поиск",
    clear: "Очистить",
  },

  fr: {
    all: "Tout",
    searchPlaceholder: "Rechercher des articles...",
    searchButton: "Rechercher",
    clear: "Effacer",
  },
} as const;


function getText(lang: string) {
  return TEXT[lang as keyof typeof TEXT] ?? TEXT.en;
}


export default function MediaFilters({
  lang,
  categories,
  activeCategory,
  initialSearch,
}: MediaFiltersProps) {
  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] =
    useState(initialSearch ?? "");

  const t = getText(lang);


  // Keep input synchronized with URL navigation.
  useEffect(() => {
    setSearchValue(initialSearch ?? "");
  }, [initialSearch]);


  // ============================================================
  // NAVIGATION
  // ============================================================

  function navigate(
    updates: Record<string, string | null>
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const query = params.toString();

    const href = query
      ? `${pathname}?${query}`
      : pathname;

    router.push(href);
  }


  // ============================================================
  // CATEGORY
  // ============================================================

  function handleCategory(
    categorySlug?: string
  ) {
    navigate({
      category: categorySlug ?? null,

      // IMPORTANT:
      // new filter = start again from page 1
      page: null,
    });
  }


  // ============================================================
  // SEARCH
  // ============================================================

  function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    navigate({
      search:
        searchValue.trim() || null,

      // IMPORTANT:
      // new search = page 1
      page: null,
    });
  }


  // ============================================================
  // CLEAR SEARCH
  // ============================================================

  function clearSearch() {
    setSearchValue("");

    navigate({
      search: null,
      page: null,
    });
  }


  return (
    <div className="space-y-6">

      {/* ======================================================
          SEARCH
      ======================================================= */}

      <form
        onSubmit={handleSearch}
        className="flex w-full gap-3"
      >

        <div className="relative flex-1">

          <input
            type="search"
            value={searchValue}
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
            placeholder={t.searchPlaceholder}
            className="
              h-12
              w-full
              rounded-lg
              border
              border-black/10
              bg-white
              px-4
              pr-24
              text-sm
              outline-none
              transition
              placeholder:text-slatewarm/60
              focus:border-black/30
            "
          />

          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-xs
                text-slatewarm
                transition-colors
                hover:text-charcoal
              "
            >
              {t.clear}
            </button>
          )}

        </div>


        <button
          type="submit"
          className="
            h-12
            shrink-0
            rounded-lg
            bg-charcoal
            px-6
            text-sm
            font-medium
            text-white
            transition-opacity
            hover:opacity-90
          "
        >
          {t.searchButton}
        </button>

      </form>


      {/* ======================================================
          CATEGORIES
      ======================================================= */}

      <div className="flex flex-wrap gap-2">

        {/* ALL */}

        <button
          type="button"
          onClick={() =>
            handleCategory()
          }
          className={`
            rounded-full
            border
            px-5
            py-2.5
            text-sm
            transition-colors

            ${
              !activeCategory
                ? "border-charcoal bg-charcoal text-white"
                : "border-black/10 bg-white text-charcoal hover:border-black/30"
            }
          `}
        >
          {t.all}
        </button>


        {/* WORDPRESS CATEGORIES */}

        {categories.map((category) => {
          const active =
            category.slug === activeCategory;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() =>
                handleCategory(category.slug)
              }
              className={`
                rounded-full
                border
                px-5
                py-2.5
                text-sm
                transition-colors

                ${
                  active
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-black/10 bg-white text-charcoal hover:border-black/30"
                }
              `}
            >

              {category.name}

              {category.count > 0 && (
                <span className="ml-1.5 opacity-60">
                  {category.count}
                </span>
              )}

            </button>
          );
        })}

      </div>

    </div>
  );
}