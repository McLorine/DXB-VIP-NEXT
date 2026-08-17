// ============================================================================
// GRAPHQL FRAGMENT — Map section
// mapLocation is an ACF google_map field. Like taxonomy/post_object fields
// earlier, it does NOT resolve as a scalar — it needs an object
// sub-selection. Unlike those, it's a plain object type (not a connection),
// so no `{ nodes { ... } }` wrapper — just the fields directly.
//
// VERIFY the exact field names via introspection after import — WPGraphQL
// for ACF's google_map mapping has varied slightly between versions:
//   { __type(name: "PageContentPageBuilderMapSectionLayout") {
//       fields { name type { name kind ofType { name kind } } }
//   } }
// then drill into the mapLocation field's type the same way we did for
// blogPreviewCategory earlier in this conversation.
// ============================================================================

export const MAP_SECTION_TYPENAME = "PageContentPageBuilderMapSectionLayout";

export const MAP_SECTION_FRAGMENT = /* GraphQL */ `
  fragment MapSectionFragment on ${MAP_SECTION_TYPENAME} {
    mapEyebrow
    mapTitle
    mapAddress
    mapLocation {
      streetAddress
      city
      state
      postCode
      country
      countryShort
      latitude
      longitude
      zoom
      placeId
    }
    mapLinkText
  }
`;

export const MAP_SECTION_INLINE_SPREAD = /* GraphQL */ `
  ... on ${MAP_SECTION_TYPENAME} {
    ...MapSectionFragment
  }
`;
