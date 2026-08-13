export const TEAM_TYPENAME = "PageContentPageBuilderTeamLayout";

export const TEAM_FRAGMENT = /* GraphQL */ `
  fragment TeamFragment on ${TEAM_TYPENAME} {
    teamEyebrow
    teamHeading
    teamDescription
    teamMembers {
      memberPhoto {
        node { sourceUrl altText }
      }
      memberName
      memberRole
    }
  }
`;

export const TEAM_INLINE_SPREAD = /* GraphQL */ `
  ... on ${TEAM_TYPENAME} {
    ...TeamFragment
  }
`;