// ============================================================================
// GRAPHQL FRAGMENT — How It Works section
// Type name confirmed via GraphiQL introspection. If ACF field/layout names
// change, re-run introspection before editing this — don't guess.
// ============================================================================

export const HOW_IT_WORKS_TYPENAME = "PageContentPageBuilderHowItWorksLayout";

export const HOW_IT_WORKS_FRAGMENT = /* GraphQL */ `
  fragment HowItWorksFragment on ${HOW_IT_WORKS_TYPENAME} {
    howItWorksEyebrow
    howItWorksHeading
    howItWorksDescription
    howItWorksSteps {
      stepTitle
      stepDescription
    }
  }
`;

export const HOW_IT_WORKS_INLINE_SPREAD = /* GraphQL */ `
  ... on ${HOW_IT_WORKS_TYPENAME} {
    ...HowItWorksFragment
  }
`;
