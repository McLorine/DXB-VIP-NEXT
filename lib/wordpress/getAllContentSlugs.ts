// ============================================================================
// Fetches every published page AND post uri, paginated, for
// generateStaticParams on the merged [...slug] route.
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

const ALL_POST_URIS_QUERY = /* GraphQL */ `
  query AllPostUris($after: String) {
    posts(first: 100, after: $after, where: { status: PUBLISH }) {
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

export async function getAllContentSlugs(): Promise<string[]> {
  const slugs: string[] = [];

  let afterPages: string | null = null;
  let hasNextPages = true;
  while (hasNextPages) {
    const data: any = await fetchGraphQL(ALL_PAGE_URIS_QUERY, { after: afterPages });
    data.pages.nodes.forEach((n: { uri: string | null }) => {
      if (!n.uri) return;
      const trimmed = n.uri.replace(/^\/|\/$/g, "");
      if (trimmed) slugs.push(trimmed);
    });
    hasNextPages = data.pages.pageInfo.hasNextPage;
    afterPages = data.pages.pageInfo.endCursor;
  }

  let afterPosts: string | null = null;
  let hasNextPosts = true;
  while (hasNextPosts) {
    const data: any = await fetchGraphQL(ALL_POST_URIS_QUERY, { after: afterPosts });
    data.posts.nodes.forEach((n: { uri: string | null }) => {
      if (!n.uri) return;
      const trimmed = n.uri.replace(/^\/|\/$/g, "");
      if (trimmed) slugs.push(trimmed);
    });
    hasNextPosts = data.posts.pageInfo.hasNextPage;
    afterPosts = data.posts.pageInfo.endCursor;
  }

  return Array.from(new Set(slugs));
}