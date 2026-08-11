// ============================================================================
// GRAPHQL FRAGMENT — Why Choose section
// Type name confirmed via GraphiQL introspection. If ACF field/layout names
// change, re-run introspection before editing this — don't guess.
// ============================================================================

export const WHY_CHOOSE_TYPENAME = "PageContentPageBuilderWhyChooseLayout";

export const WHY_CHOOSE_FRAGMENT = /* GraphQL */ `
  fragment WhyChooseFragment on ${WHY_CHOOSE_TYPENAME} {
    whyChooseImage {
      node { sourceUrl altText }
    }
    whyChooseBadgeValue
    whyChooseBadgeLabel
    whyChooseEyebrow
    whyChooseHeading
    whyChooseDescription
    whyChoosePoints {
      pointTitle
      pointDescription
    }
    whyChooseButtonText
    whyChooseButtonLink
  }
`;

export const WHY_CHOOSE_INLINE_SPREAD = /* GraphQL */ `
  ... on ${WHY_CHOOSE_TYPENAME} {
    ...WhyChooseFragment
  }
`;
