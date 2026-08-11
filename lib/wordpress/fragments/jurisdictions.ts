// ============================================================================
// GRAPHQL FRAGMENT — Jurisdictions section
// ============================================================================

export const JURISDICTIONS_TYPENAME = "PageContentPageBuilderJurisdictionsLayout";

export const JURISDICTIONS_FRAGMENT = /* GraphQL */ `
  fragment JurisdictionsFragment on ${JURISDICTIONS_TYPENAME} {
    jurisdictionsSectionLabel
    jurisdictionsSectionTitle
    jurisdictionsSectionDescription
    jurisdictionsCards {
      cardBackgroundImage {
        node { sourceUrl altText }
      }
      cardBadge
      cardTitle
      cardDescription
      cardLink { url title target }
      cardLinkText
    }
    jurisdictionsCtaButtonText
    jurisdictionsCtaButtonLink
    jurisdictionsSecondaryLinkText
    jurisdictionsSecondaryLinkUrl
  }
`;

export const JURISDICTIONS_INLINE_SPREAD = /* GraphQL */ `
  ... on ${JURISDICTIONS_TYPENAME} {
    ...JurisdictionsFragment
  }
`;
