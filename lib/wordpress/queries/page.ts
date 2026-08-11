// ============================================================================
// PAGE QUERY
// Fetches a page by slug with every registered section's fields included.
// Never needs manual edits when adding sections — it reads from fragments/index.ts.
// ============================================================================

import { ALL_FRAGMENTS, ALL_INLINE_SPREADS } from "../fragments";

export const PAGE_BY_SLUG_QUERY = /* GraphQL */ `
  query PageBySlug($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      pageContent {
        pageBuilder {
          __typename
          ${ALL_INLINE_SPREADS}
        }
      }
    }
  }
  ${ALL_FRAGMENTS}
`;
