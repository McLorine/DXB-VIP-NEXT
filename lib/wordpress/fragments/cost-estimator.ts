// ============================================================================
// GRAPHQL FRAGMENT — Cost Estimator section
// ============================================================================

export const COST_ESTIMATOR_TYPENAME = "PageContentPageBuilderCostEstimatorLayout";

export const COST_ESTIMATOR_FRAGMENT = /* GraphQL */ `
  fragment CostEstimatorFragment on ${COST_ESTIMATOR_TYPENAME} {
    estimatorSectionEyebrow
    estimatorSectionHeading
    estimatorSteps {
      stepKey
      stepType
      stepTitle
      stepSubtitle
      stepBodyText
      stepRequired
      stepOptions {
        optionId
        optionIcon
        optionLabel
        optionDescription
        optionBadge
        optionDefaultOn
      }
    }
    estimatorContinueText
    estimatorBackText
    estimatorSubmitText
    estimatorSubmittingText
    estimatorErrorText
    estimatorSummaryTitle
    estimatorNextStepsTitle
    estimatorNextStepsText
    estimatorSuccessHeading
    estimatorSuccessMessage
    estimatorSuccessCallText
    estimatorSuccessWhatsappText
    estimatorSourcePage
    estimatorPhoneHref
    estimatorWhatsappHref
  }
`;

export const COST_ESTIMATOR_INLINE_SPREAD = /* GraphQL */ `
  ... on ${COST_ESTIMATOR_TYPENAME} {
    ...CostEstimatorFragment
  }
`;
