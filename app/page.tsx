import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/wordpress/getPage";
import { fallbackMetadata, getRankMathSeo } from "@/lib/wordpress/seo";
import SectionRenderer from "@/components/sections/SectionRenderer";
import SyncTranslations from "@/components/i18n/SyncTranslations";
import RankMathSchema from "@/components/common/RankMathSchema";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getRankMathSeo("/"), getPageBySlug("/")]);
  return seo?.metadata ?? fallbackMetadata("/", page?.title);
}

export default async function Home() {
  const [page, seo] = await Promise.all([getPageBySlug("/"), getRankMathSeo("/")]);
  if (!page) return <p>Page not found.</p>;

  return (
    <>
      <RankMathSchema schemas={seo?.jsonLd ?? []} />
      <SyncTranslations currentLanguage={page.language} translations={page.translations} />
      <SectionRenderer blocks={page.pageContent?.pageBuilder ?? []} latestPosts={page.latestPosts} />
    </>
  );
}
