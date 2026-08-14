export const IS_IT_RIGHT_FOR_YOU_TYPENAME = "PageContentPageBuilderIsItRightForYouLayout";

export const IS_IT_RIGHT_FOR_YOU_FRAGMENT = /* GraphQL */ `
  fragment IsItRightForYouFragment on ${IS_IT_RIGHT_FOR_YOU_TYPENAME} {
    bestForEyebrow
    bestForTitle
    bestForIntro
    bestForPoints {
      pointText
    }
    bestForImage {
      node { sourceUrl altText }
    }
    bestForButtonText
    bestForButtonLink
  }
`;

export const IS_IT_RIGHT_FOR_YOU_INLINE_SPREAD = /* GraphQL */ `
  ... on ${IS_IT_RIGHT_FOR_YOU_TYPENAME} {
    ...IsItRightForYouFragment
  }
`;