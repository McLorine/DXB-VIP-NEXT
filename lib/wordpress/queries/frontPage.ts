// ============================================================================
// FRONT PAGE BY LANGUAGE QUERY
// Polylang's translated front pages (e.g. "/ru/") have a uri that doesn't
// correspond to their actual slug, and both nodeByUri and page(idType: URI)
// fail to resolve them (a WPGraphQL core bug). This query finds a language's
// front page directly via isFrontPage + language, bypassing URI resolution.
// ============================================================================

import { ALL_FRAGMENTS, ALL_INLINE_SPREADS } from "../fragments";

export const LANGUAGES_QUERY = /* GraphQL */ `
  query Languages {
    languages {
      code
      slug
      name
      locale
    }
  }
`;

export const FRONT_PAGES_QUERY = /* GraphQL */ `
  query FrontPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        databaseId
        title
        uri
        isFrontPage

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
    }
  }

  ${ALL_FRAGMENTS}
`;