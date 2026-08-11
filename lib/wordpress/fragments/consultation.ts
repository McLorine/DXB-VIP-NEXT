// ============================================================================
// GRAPHQL FRAGMENT — Consultation Form section
// consultationCf7FormId is a plain ACF text field holding the numeric CF7
// form ID (e.g. "123") — deliberately NOT a post_object field, because the
// wpcf7_contact_form post type isn't registered in WPGraphQL by default,
// which would otherwise force a sub-selection against a type that can't
// actually resolve. A plain string sidesteps that entirely.
// ============================================================================

export const CONSULTATION_TYPENAME = "PageContentPageBuilderConsultationLayout";

export const CONSULTATION_FRAGMENT = /* GraphQL */ `
  fragment ConsultationFragment on ${CONSULTATION_TYPENAME} {
    consultationEyebrow
    consultationHeading
    consultationDescription
    consultationBackgroundImage {
      node { sourceUrl altText }
    }
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
`;

export const CONSULTATION_INLINE_SPREAD = /* GraphQL */ `
  ... on ${CONSULTATION_TYPENAME} {
    ...ConsultationFragment
  }
`;
