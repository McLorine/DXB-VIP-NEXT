// ============================================================================
// GRAPHQL FRAGMENT — Reviews section
// ============================================================================

export const REVIEWS_TYPENAME = "PageContentPageBuilderReviewsLayout";

export const REVIEWS_FRAGMENT = /* GraphQL */ `
  fragment ReviewsFragment on ${REVIEWS_TYPENAME} {
    reviewsEyebrow
    reviewsHeading
    reviewsDescription
    reviewsRatingValue
    reviewsCountLabel
    reviewsItems {
      reviewerName
      reviewerRole
      reviewerRating
      reviewerDate
      reviewerText
    }
  }
`;

export const REVIEWS_INLINE_SPREAD = /* GraphQL */ `
  ... on ${REVIEWS_TYPENAME} {
    ...ReviewsFragment
  }
`;