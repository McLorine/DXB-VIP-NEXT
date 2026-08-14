import ArticleCard from "@/components/news/ArticleCard";
import MediaFilters from "@/components/news/MediaFilters";
import Pagination from "@/components/news/Pagination";

import {
  getBlogPosts,
} from "@/lib/wordpress/getBlogPosts";


interface NewsArchiveProps {
  lang: string;

  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}


const TEXT = {
  en: {
    eyebrow: "News & Insights",
    title: "Latest News",
    description:
      "Explore the latest property news, market updates and insights.",
    articles: "articles",
    noResults: "No articles found.",
    error: "We couldn't load the articles right now.",
  },

  ru: {
    eyebrow: "Новости и аналитика",
    title: "Последние новости",
    description:
      "Последние новости недвижимости, обновления рынка и аналитика.",
    articles: "статей",
    noResults: "Статьи не найдены.",
    error: "Не удалось загрузить статьи.",
  },

  fr: {
    eyebrow: "Actualités et analyses",
    title: "Dernières actualités",
    description:
      "Découvrez les dernières actualités immobilières, tendances du marché et analyses.",
    articles: "articles",
    noResults: "Aucun article trouvé.",
    error: "Impossible de charger les articles.",
  },
} as const;


function getText(lang: string) {
  return TEXT[lang as keyof typeof TEXT] ?? TEXT.en;
}


export default async function NewsArchive({
  lang,
  searchParams,
}: NewsArchiveProps) {
  const params = await searchParams;

  // ============================================================
  // QUERY PARAMETERS
  // ============================================================

  const parsedPage = Number(params.page);

  const page =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? Math.floor(parsedPage)
      : 1;

  const search =
    params.search?.trim() || undefined;

  const category =
    params.category?.trim() || undefined;


  // ============================================================
  // WORDPRESS REST REQUEST
  // ============================================================

  const result = await getBlogPosts({
    page,
    lang,
    search,
    category,
  });


  const t = getText(lang);


  // ============================================================
  // ERROR
  // ============================================================

  if (!result.ok) {
    return (
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-center text-slatewarm">
              {t.error}
            </p>
          </div>
        </section>
      </main>
    );
  }


  const {
    articles,
    categories,
    total,
    totalPages,
  } = result;


  return (
    <main>

      {/* ======================================================
          HEADER
      ======================================================= */}

      <section className="pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="max-w-3xl">
            <span className="eyebrow">
              {t.eyebrow}
            </span>

            <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slatewarm md:text-lg">
              {t.description}
            </p>
          </div>

        </div>
      </section>


      {/* ======================================================
          FILTERS
      ======================================================= */}

      <section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <MediaFilters
            lang={lang}
            categories={categories}
            activeCategory={category}
            initialSearch={search}
          />

        </div>
      </section>


      {/* ======================================================
          RESULTS
      ======================================================= */}

      <section className="pt-8">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <p className="text-sm text-slatewarm">
            {total} {t.articles}
          </p>

        </div>
      </section>


      {/* ======================================================
          ARTICLES
      ======================================================= */}

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          {articles.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                />
              ))}

            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-slatewarm">
                {t.noResults}
              </p>
            </div>
          )}

        </div>
      </section>


      {/* ======================================================
          PAGINATION
      ======================================================= */}

      {totalPages > 1 && (
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              lang={lang}
            />

          </div>
        </section>
      )}

    </main>
  );
}