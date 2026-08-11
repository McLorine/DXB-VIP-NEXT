// ============================================================================
// GRAPHQL FRAGMENT — CTA Band section
// ============================================================================

export const CTA_BAND_TYPENAME = "PageContentPageBuilderCtaBandLayout";

export const CTA_BAND_FRAGMENT = /* GraphQL */ `
  fragment CtaBandFragment on ${CTA_BAND_TYPENAME} {
    ctaEyebrow
    ctaHeading
    ctaDescription
    ctaBackgroundImage {
      node { sourceUrl altText }
    }
    ctaPrimaryButtonText
    ctaPrimaryButtonLink
    ctaSecondaryButtonText
    ctaSecondaryButtonLink
  }
`;

export const CTA_BAND_INLINE_SPREAD = /* GraphQL */ `
  ... on ${CTA_BAND_TYPENAME} {
    ...CtaBandFragment
  }
`;
