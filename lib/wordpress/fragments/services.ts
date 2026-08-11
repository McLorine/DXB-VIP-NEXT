// ============================================================================
// GRAPHQL FRAGMENT — Services section
// ============================================================================

export const SERVICES_TYPENAME = "PageContentPageBuilderServicesLayout";

export const SERVICES_FRAGMENT = /* GraphQL */ `
  fragment ServicesFragment on ${SERVICES_TYPENAME} {
    servicesSectionLabel
    servicesSectionTitle
    servicesSectionDescription
    servicesItems {
      serviceIcon {
        node { sourceUrl altText }
      }
      serviceTitle
      serviceDescription
      serviceLink { url title target }
      serviceLinkText
    }
  }
`;

export const SERVICES_INLINE_SPREAD = /* GraphQL */ `
  ... on ${SERVICES_TYPENAME} {
    ...ServicesFragment
  }
`;
