// ============================================================================
// GRAPHQL FRAGMENT — Text section
// A single ACF wysiwyg field. No sub-selection needed — wysiwyg resolves
// as a plain HTML string, not a connection (unlike taxonomy/post_object).
// ============================================================================

export const TEXT_TYPENAME = "PageContentPageBuilderTextLayout";

export const TEXT_FRAGMENT = /* GraphQL */ `
  fragment TextFragment on ${TEXT_TYPENAME} {
    textEditor
  }
`;

export const TEXT_INLINE_SPREAD = /* GraphQL */ `
  ... on ${TEXT_TYPENAME} {
    ...TextFragment
  }
`;