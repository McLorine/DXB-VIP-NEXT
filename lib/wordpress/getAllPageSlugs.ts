// ============================================================================
// Fetches every published page's URI, paginated. Used by generateStaticParams
// so known pages are pre-rendered at build time. New pages published later
// don't need this — dynamicParams handles those on first request.
// ============================================================================

import { fetchGraphQL } from "./client";

const ALL_PAGE_URIS_QUERY = /* GraphQL */ `
  query AllPageUris($after: String) {
    pages(first: 100, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        uri
      }
    }
  }
`;

export async function getAllPageSlugs(): Promise<string[]> {
  const uris: string[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data: any = await fetchGraphQL(ALL_PAGE_URIS_QUERY, { after });
    uris.push(...data.pages.nodes.map((n: { uri: string }) => n.uri));
    hasNextPage = data.pages.pageInfo.hasNextPage;
    after = data.pages.pageInfo.endCursor;
  }

  return uris;
}