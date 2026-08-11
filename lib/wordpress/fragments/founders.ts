// ============================================================================
// GRAPHQL FRAGMENT — Founders section
// ============================================================================

export const FOUNDERS_TYPENAME = "PageContentPageBuilderFoundersLayout";

export const FOUNDERS_FRAGMENT = /* GraphQL */ `
  fragment FoundersFragment on ${FOUNDERS_TYPENAME} {
    foundersEyebrow
    foundersHeading
    foundersDescription
    foundersItems {
      founderPhoto {
        node { sourceUrl altText }
      }
      founderBio
      founderName
      founderRole
    }
    foundersButtonText
    foundersButtonLink
  }
`;

export const FOUNDERS_INLINE_SPREAD = /* GraphQL */ `
  ... on ${FOUNDERS_TYPENAME} {
    ...FoundersFragment
  }
`;
