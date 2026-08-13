export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroBlock {
  __typename: "PageContentPageBuilderHeroLayout";
  heroEyebrow: string;
  heroHeadingWhite: string;
  heroHeadingGold: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  heroPrimaryButtonLink: string;
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;
  heroBackgroundImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  heroStatistics: HeroStat[] | null;
}