// ============================================================================
// GRAPHQL FRAGMENT — Partners / Logo Marquee section
// mimeType is required here (not just sourceUrl) — the component uses it to
// decide whether to inline the SVG markup or render a normal <img>.
// ============================================================================

export const PARTNERS_TYPENAME = "PageContentPageBuilderPartnersLayout";

export const PARTNERS_FRAGMENT = /* GraphQL */ `
  fragment PartnersFragment on ${PARTNERS_TYPENAME} {
    partnersEyebrow
    partnersItems {
      partnerLogo {
        node { sourceUrl altText mimeType }
      }
      partnerName
    }
  }
`;

export const PARTNERS_INLINE_SPREAD = /* GraphQL */ `
  ... on ${PARTNERS_TYPENAME} {
    ...PartnersFragment
  }
`;