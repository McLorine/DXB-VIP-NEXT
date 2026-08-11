// ============================================================================
// GRAPHQL FRAGMENT — Hero section
// Type name confirmed via GraphiQL introspection. If ACF field/layout names
// change, re-run introspection before editing this — don't guess.
// ============================================================================

export const HERO_TYPENAME = "PageContentPageBuilderHeroLayout";

export const HERO_FRAGMENT = /* GraphQL */ `
  fragment HeroFragment on ${HERO_TYPENAME} {
    heroEyebrow
    heroHeadingWhite
    heroHeadingGold
    heroDescription
    heroPrimaryButtonText
    heroPrimaryButtonLink
    heroSecondaryButtonText
    heroSecondaryButtonLink
    heroBackgroundImage {
      node { sourceUrl altText }
    }
    heroStatistics { value label }
  }
`;

export const HERO_INLINE_SPREAD = /* GraphQL */ `
  ... on ${HERO_TYPENAME} {
    ...HeroFragment
  }
`;
