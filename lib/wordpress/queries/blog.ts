// ============================================================================
// BLOG LISTING QUERIES
// Uses WPGraphQL's built-in offsetPagination (core feature, not a plugin) so
// we can render real numbered page buttons (1, 2, 3…) instead of only
// next/prev cursor navigation.
// ============================================================================

export const BLOG_POSTS_QUERY = /* GraphQL */ `
  query BlogPosts($search: String, $categoryName: String, $offset: Int!, $size: Int!) {
    posts(
      where: {
        search: $search
        categoryName: $categoryName
        orderby: { field: DATE, order: DESC }
        offsetPagination: { offset: $offset, size: $size }
      }
    ) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        databaseId
        title
        slug
        date
        excerpt
        featuredImage {
          node { sourceUrl altText }
        }
        categories(first: 1) {
          nodes { name slug }
        }
      }
    }
  }
`;

export const BLOG_CATEGORIES_QUERY = /* GraphQL */ `
  query BlogCategories {
    categories(where: { hideEmpty: true }, first: 100) {
      nodes {
        databaseId
        name
        slug
        count
      }
    }
  }
`;
