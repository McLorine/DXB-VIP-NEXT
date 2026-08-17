import { getContentByUri } from "./getNodeByUri";
import { getPageBySlug } from "./getPage";
import type { WPLanguage } from "./types";

export async function getDocumentLanguage(pathname: string): Promise<WPLanguage | null> {
  try {
    const path = pathname.split("?")[0].split("#")[0];

    if (path === "/" || !path) {
      return (await getPageBySlug("/"))?.language ?? null;
    }

    const result = await getContentByUri(path.replace(/^\/+|\/+$/g, ""));
    if (!result) return null;

    return result.type === "page"
      ? result.page.language ?? null
      : result.post.language ?? null;
  } catch (error) {
    console.error(`Unable to resolve document language for "${pathname}":`, error);
    return null;
  }
}
