// ============================================================================
// POSTS QUERY
// Used only by the Blog Preview section, which shows real WordPress posts
// rather than ACF-authored content. Kept separate from PAGE_BY_SLUG_QUERY so
// every page load doesn't pay for a posts fetch it doesn't need.
// ============================================================================

export const LATEST_POSTS_QUERY = /* GraphQL */ `
  query LatestPosts($first: Int!, $categoryId: Int) {
    posts(
      first: $first
      where: { categoryId: $categoryId, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        categories(first: 1) {
          nodes { name }
        }
        featuredImage {
          node { sourceUrl altText }
        }
      
      }
    }
  }
`;
