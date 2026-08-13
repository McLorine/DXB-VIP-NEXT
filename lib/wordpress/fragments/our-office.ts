export const OUR_OFFICE_TYPENAME = "PageContentPageBuilderOurOfficeLayout";

export const OUR_OFFICE_FRAGMENT = /* GraphQL */ `
  fragment OurOfficeFragment on ${OUR_OFFICE_TYPENAME} {
    officeEyebrow
    officeHeading
    officeDescription

    officeGallery {
      nodes {
        sourceUrl
        altText
      }
    }

    officeBadgeLabel

    officeBadgeLocation {
      companyName
      companyDescription
      companyUrl
    }
  }
`;

export const OUR_OFFICE_INLINE_SPREAD = /* GraphQL */ `
  ... on ${OUR_OFFICE_TYPENAME} {
    ...OurOfficeFragment
  }
`;