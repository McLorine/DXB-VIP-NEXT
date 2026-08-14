export const BUSINESS_SETUP_TYPENAME = "PageContentPageBuilderBusinessSetupLayout";

export const BUSINESS_SETUP_FRAGMENT = /* GraphQL */ `
  fragment BusinessSetupFragment on ${BUSINESS_SETUP_TYPENAME} {
    businessSetupEyebrow
    businessSetupTitle
    businessSetupContent
    businessSetupTimeline
    businessSetupPriceFrom
    businessSetupConsultationForm {
      consultationEyebrow
      consultationHeading
      consultationDescription
      consultationSourcePage
      consultationFormType
      consultationCf7FormId
      consultationCustomFields {
        fieldLabel
        fieldName
        fieldType
        fieldRequired
        fieldOptions {
          optionLabel
        }
      }
      consultationSubmitButtonText
      consultationPrivacyText
    }
  }
`;

export const BUSINESS_SETUP_INLINE_SPREAD = /* GraphQL */ `
  ... on ${BUSINESS_SETUP_TYPENAME} {
    ...BusinessSetupFragment
  }
`;