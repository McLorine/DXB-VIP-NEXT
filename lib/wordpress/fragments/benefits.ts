// ============================================================================
// GRAPHQL FRAGMENT — Benefits section
// ============================================================================

export const BENEFITS_TYPENAME = "PageContentPageBuilderBenefitsLayout";

export const BENEFITS_FRAGMENT = /* GraphQL */ `
  fragment BenefitsFragment on ${BENEFITS_TYPENAME} {
    benefitsEyebrow
    benefitsHeading
    benefitsDescription
    benefitsItems {
      benefitIcon {
        node { sourceUrl altText }
      }
      benefitTitle
      benefitDescription
    }
  }
`;

export const BENEFITS_INLINE_SPREAD = /* GraphQL */ `
  ... on ${BENEFITS_TYPENAME} {
    ...BenefitsFragment
  }
`;
