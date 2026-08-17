export interface HeroStat {
  value: string;
  label: string;
}

type ACFLink = {
  url: string;
  title: string | null;
  target: string | null;
} | null;

export interface HeroBlock {
  __typename: "PageContentPageBuilderHeroLayout";
  heroEyebrow: string;
  heroHeadingWhite: string;
  heroHeadingGold: string;
  heroDescription: string;
  heroPrimaryButtonLink: ACFLink;
  heroSecondaryButtonLink: ACFLink;
  heroBackgroundImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  heroStatistics: HeroStat[] | null;
}
