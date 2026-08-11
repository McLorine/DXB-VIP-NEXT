import { getPageBySlug } from "@/lib/wordpress/getPage";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default async function Home() {
  const page = await getPageBySlug("/"); // or "/home/" — see note below
  if (!page) return <p>Page not found.</p>;

  return (
    <>
      <SectionRenderer blocks={page.pageContent?.pageBuilder ?? []} />
    </>
  );
}