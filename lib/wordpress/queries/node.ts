// ============================================================================
// NODE QUERY
// Resolves a flat URI to either a Page or a Post, since both types can live
// at root-level (or language-prefixed) permalinks, e.g. "/hello-world-2/" or
// "/ru/new-year-ru/". Reuses ALL_INLINE_SPREADS / ALL_FRAGMENTS so it never
// needs manual edits when adding new page-builder sections.
// ============================================================================

import { ALL_FRAGMENTS, ALL_INLINE_SPREADS } from "../fragments";

export const NODE_BY_URI_QUERY = /* GraphQL */ `
  query NodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        databaseId
        title
        uri
        language {
          code
          slug
          name
          locale
        }
        translations {
          uri
          language {
            code
            slug
            name
            locale
          }
        }
        pageContent {
          pageBuilder {
            __typename
            ${ALL_INLINE_SPREADS}
          }
        }
      }
      ... on Post {
        databaseId
        title
        slug
        uri
        date
        excerpt
        content
        language {
          code
          slug
          name
          locale
        }
        translations {
          uri
          language {
            code
            slug
            name
            locale
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            databaseId
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
  ${ALL_FRAGMENTS}
`;