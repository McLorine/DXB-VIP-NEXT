// ============================================================================
// GRAPHQL FRAGMENT — FAQ section
// ============================================================================

export const FAQ_TYPENAME = "PageContentPageBuilderFaqLayout";

export const FAQ_FRAGMENT = /* GraphQL */ `
  fragment FaqFragment on ${FAQ_TYPENAME} {
    faqEyebrow
    faqHeading
    faqDescription
    faqButtonText
    faqButtonLink
    faqItems {
      question
      answer
    }
  }
`;

export const FAQ_INLINE_SPREAD = /* GraphQL */ `
  ... on ${FAQ_TYPENAME} {
    ...FaqFragment
  }
`;
