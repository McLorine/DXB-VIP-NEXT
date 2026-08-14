// ============================================================================
// POSTS QUERY
// Used only by the Blog Preview section, which shows real WordPress posts
// rather than ACF-authored content. Kept separate from PAGE_BY_SLUG_QUERY so
// every page load doesn't pay for a posts fetch it doesn't need.
//
// NOTE: there is no built-in "read time" field in WPGraphQL. Read time is
// computed client-side in getPage.ts from the post excerpt/content length
// instead of being queried — don't add a `readMinutes` field here unless
// you've actually registered one (e.g. via ACF with show_in_graphql on the
// post type), or the whole query will fail.
// ============================================================================

export const LATEST_POSTS_QUERY = /* GraphQL */ `
  query LatestPosts($first: Int!, $categoryId: Int) {
    posts(
      first: $first
      where: { categoryId: $categoryId, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        __typename
        databaseId
        title
        slug
        date
        excerpt
        featuredImage {
          node { sourceUrl altText }
        }
        categories {
          nodes { databaseId name slug }
        }
      }
    }
  }
`;

export const POST_BY_URI_QUERY = /* GraphQL */ `
  query PostByUri($uri: ID!) {
    post(id: $uri, idType: URI) {
      databaseId
      title
      slug
      uri
      date
      excerpt
      content

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
    }
  }
`;

export const POST_BY_SLUG_AND_LANGUAGE_QUERY = /* GraphQL */ `
  query PostBySlugAndLanguage(
    $slug: String!
    $language: LanguageCodeFilterEnum!
  ) {
    posts(
      first: 1
      where: {
        name: $slug
        language: $language
        status: PUBLISH
      }
    ) {
      nodes {
        databaseId
        title
        slug
        uri
        date
        excerpt
        content

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
      }
    }
  }
`;