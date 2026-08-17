// ============================================================================
// GRAPHQL FRAGMENT — Contact Form + Info section
// contactFormCf7FormId is a plain text field (same convention as the
// standalone Consultation layout) — no sub-selection needed.
// ============================================================================

export const CONTACT_FORM_INFO_TYPENAME = "PageContentPageBuilderContactFormInfoLayout";

export const CONTACT_FORM_INFO_FRAGMENT = /* GraphQL */ `
  fragment ContactFormInfoFragment on ${CONTACT_FORM_INFO_TYPENAME} {
    contactFormEyebrow
    contactFormHeading
    contactFormDescription
    contactFormSourcePage
    contactFormFormType
    contactFormCf7FormId
    contactFormCustomFields {
      fieldLabel
      fieldName
      fieldType
      fieldRequired
      fieldOptions {
        optionLabel
      }
    }
    contactFormSubmitButtonText
    contactFormShowPrivacyNote
    contactFormPrivacyText
    contactFormInfoItems {
      icon
      label
      value
      link
    }
  }
`;

export const CONTACT_FORM_INFO_INLINE_SPREAD = /* GraphQL */ `
  ... on ${CONTACT_FORM_INFO_TYPENAME} {
    ...ContactFormInfoFragment
  }
`;
