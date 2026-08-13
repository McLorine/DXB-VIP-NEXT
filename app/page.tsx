import { getPageBySlug } from "@/lib/wordpress/getPage";
import SectionRenderer from "@/components/sections/SectionRenderer";
import SyncTranslations from "@/components/i18n/SyncTranslations";

export default async function Home() {
  const page = await getPageBySlug("/");
  if (!page) return <p>Page not found.</p>;

  return (
    <>
      <SyncTranslations currentLanguage={page.language} translations={page.translations} />
      <SectionRenderer blocks={page.pageContent?.pageBuilder ?? []} latestPosts={page.latestPosts} />
    </>
  );
}