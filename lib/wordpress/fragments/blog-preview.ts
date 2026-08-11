// ============================================================================
// GRAPHQL FRAGMENT — Blog Preview section
// This only covers the section's chrome (heading, "view all" link, how many
// posts to pull). The actual articles are real WP posts, fetched separately
// — see GET_LATEST_POSTS_QUERY in queries/posts.ts and getLatestPosts() in
// getPage.ts. SectionRenderer merges the two by matching __typename.
// ============================================================================

export const BLOG_PREVIEW_TYPENAME = "PageContentPageBuilderBlogPreviewLayout";

export const BLOG_PREVIEW_FRAGMENT = /* GraphQL */ `
  fragment BlogPreviewFragment on ${BLOG_PREVIEW_TYPENAME} {
    blogPreviewEyebrow
    blogPreviewHeading
    blogPreviewViewAllText
    blogPreviewViewAllLink
    blogPreviewPostsCount
    blogPreviewCategory {
      nodes {
        __typename
        ... on Category {
          databaseId
          name
          slug
        }
      }
    }
  }
`;

export const BLOG_PREVIEW_INLINE_SPREAD = /* GraphQL */ `
  ... on ${BLOG_PREVIEW_TYPENAME} {
    ...BlogPreviewFragment
  }
`;
