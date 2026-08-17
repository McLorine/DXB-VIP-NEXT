// ============================================================================
// WORDPRESS PAGE BUILDER — TYPES
// ============================================================================
// One interface per ACF flexible-content layout, named `<Section>Block`.
// Field names must match WPGraphQL's camelCase output exactly.
//
// TO ADD A NEW SECTION:
//   1. Add its interface below, next to the others.
//   2. Add it to the PageBuilderBlock union at the bottom of this file.
//   3. TypeScript will then force you to handle it in registry.tsx.
// ============================================================================

type ACFImage = {
  node: { sourceUrl: string; altText: string };
} | null;

type ACFLink = {
  url: string;
  title: string | null;
  target: string | null;
} | null;

// ---- Hero -------------------------------------------------------------

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
  heroBackgroundImage: ACFImage;
  heroStatistics: HeroStat[] | null;
}

// ---- Services -----------------------------------------------------------

export interface ServiceItem {
  serviceIcon: ACFImage;
  serviceTitle: string;
  serviceDescription: string;
  serviceLink: ACFLink;
  serviceLinkText: string;
}

export interface ServicesBlock {
  __typename: "PageContentPageBuilderServicesLayout";
  servicesSectionLabel: string;
  servicesSectionTitle: string;
  servicesSectionDescription: string;
  servicesItems: ServiceItem[];
}

// ---- Jurisdictions --------------------------------------------------------

export interface JurisdictionCard {
  cardBackgroundImage: ACFImage;
  cardBadge: string;
  cardTitle: string;
  cardDescription: string;
  cardLink: ACFLink;
  cardLinkText: string;
}

export interface JurisdictionsBlock {
  __typename: "PageContentPageBuilderJurisdictionsLayout";
  jurisdictionsSectionLabel: string;
  jurisdictionsSectionTitle: string;
  jurisdictionsSectionDescription: string;
  jurisdictionsCards: JurisdictionCard[];
  jurisdictionsCtaButtonText: string;
  jurisdictionsCtaButtonLink: string;
  jurisdictionsSecondaryLinkText: string;
  jurisdictionsSecondaryLinkUrl: string;
}

// ---- Why Choose -----------------------------------------------------------

export interface WhyChoosePoint {
  pointTitle: string;
  /** Rendered HTML string from ACF wysiwyg — may contain <strong> tags */
  pointDescription: string;
}

export interface WhyChooseBlock {
  __typename: "PageContentPageBuilderWhyChooseLayout";
  whyChooseImage: ACFImage;
  whyChooseBadgeValue: string;
  whyChooseBadgeLabel: string;
  whyChooseEyebrow: string;
  whyChooseHeading: string;
  whyChooseDescription: string;
  whyChoosePoints: WhyChoosePoint[];
  whyChooseButtonText: string;
  whyChooseButtonLink: string;
}

// ---- How It Works -----------------------------------------------------

export interface HowItWorksStep {
  stepTitle: string;
  stepDescription: string;
}

export interface HowItWorksBlock {
  __typename: "PageContentPageBuilderHowItWorksLayout";
  howItWorksEyebrow: string;
  howItWorksHeading: string;
  howItWorksDescription: string;
  howItWorksSteps: HowItWorksStep[];
}

// ---- Benefits -----------------------------------------------------------

export interface BenefitItem {
  benefitIcon: ACFImage;
  benefitTitle: string;
  benefitDescription: string;
}

export interface BenefitsBlock {
  __typename: "PageContentPageBuilderBenefitsLayout";
  benefitsEyebrow: string;
  benefitsHeading: string;
  benefitsDescription: string;
  benefitsItems: BenefitItem[];
}

// ---- Founders -----------------------------------------------------------

export interface FounderItem {
  founderPhoto: ACFImage;
  /** Rendered HTML string from ACF wysiwyg */
  founderBio: string;
  founderName: string;
  founderRole: string;
}

export interface FoundersBlock {
  __typename: "PageContentPageBuilderFoundersLayout";
  foundersEyebrow: string;
  foundersHeading: string;
  foundersDescription: string;
  foundersItems: FounderItem[];
  foundersButtonText: string;
  foundersButtonLink: string;
}

// ---- Blog Preview -----------------------------------------------------

/**
 * NOTE: this block only carries section chrome. Actual posts are fetched
 * separately from real WordPress posts (see getLatestPosts in getPage.ts)
 * and merged in at render time by SectionRenderer, matched on __typename.
 */
export interface BlogPreviewBlock {
  __typename: "PageContentPageBuilderBlogPreviewLayout";
  blogPreviewEyebrow: string;
  blogPreviewHeading: string;
  blogPreviewViewAllText: string;
  blogPreviewViewAllLink: string;
  blogPreviewPostsCount: number;
  /** ACF taxonomy field — always a connection in WPGraphQL, even with return_format: id. */
  blogPreviewCategory: {
    nodes: { databaseId: number; name: string; slug: string }[];
  } | null;
}

// ---- Consultation Form -----------------------------------------------------

export type ConsultationFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select";

export interface ConsultationCustomField {
  fieldLabel: string;
  fieldName: string;
  fieldType: ConsultationFieldType;
  fieldRequired: boolean;
  fieldOptions: { optionLabel: string }[] | null;
}

export interface ConsultationBlock {
  __typename: "PageContentPageBuilderConsultationLayout";
  consultationEyebrow: string;
  consultationHeading: string;
  consultationDescription: string;
  consultationBackgroundImage: ACFImage;
  consultationSourcePage: string;
  consultationFormType: "cf7" | "custom";
  /** Plain-text numeric CF7 form ID entered by the editor. Only meaningful when formType === "cf7" */
  consultationCf7FormId: string | null;
  consultationCustomFields: ConsultationCustomField[];
  consultationSubmitButtonText: string;
  consultationPrivacyText: string;
}

// ---- FAQ ------------------------------------------------------------------

export interface FaqItem {
  question: string;
  /** Rendered HTML string from ACF wysiwyg */
  answer: string;
}

export interface FaqBlock {
  __typename: "PageContentPageBuilderFaqLayout";
  faqEyebrow: string;
  faqHeading: string;
  faqDescription: string;
  faqButtonText: string;
  faqButtonLink: string;
  faqItems: FaqItem[];
}

// ---- CTA Band -----------------------------------------------------------

export interface CtaBandBlock {
  __typename: "PageContentPageBuilderCtaBandLayout";
  ctaEyebrow: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaBackgroundImage: ACFImage;
  ctaPrimaryButtonText: string;
  ctaPrimaryButtonLink: string;
  ctaSecondaryButtonText: string;
  ctaSecondaryButtonLink: string;
}

// ---- ⬇ ADD NEW SECTION INTERFACES ABOVE THIS LINE ⬇ -----------------------

// ---- Reviews -----------------------------------------------------------

export interface ReviewItem {
  reviewerName: string;
  reviewerRole: string;
  reviewerRating: number;
  reviewerDate: string;
  reviewerText: string;
}

export interface ReviewsBlock {
  __typename: "PageContentPageBuilderReviewsLayout";
  reviewsEyebrow: string;
  reviewsHeading: string;
  reviewsDescription: string;
  reviewsRatingValue: string;
  reviewsCountLabel: string;
  reviewsItems: ReviewItem[];
}

export interface PartnerItem {
  partnerLogo: {
    node: { sourceUrl: string; altText: string; mimeType: string };
  } | null;
  partnerName: string;
}

export interface PartnersBlock {
  __typename: "PageContentPageBuilderPartnersLayout";
  partnersEyebrow: string;
  partnersItems: PartnerItem[];
}

// ---- Text ---------------------------------------------------------------

export interface TextBlock {
  __typename: "PageContentPageBuilderTextLayout";
  /** Raw HTML from the ACF wysiwyg field. */
  textEditor: string;
}

// ---- Our Office -----------------------------------------------------------

export interface OfficeGalleryImage {
  galleryImage: {
    node: { sourceUrl: string; altText: string };
  } | null;
  galleryLabel: string;
}

export interface FamilyCompany {
  companyName: string;
  companyDescription: string;
  companyUrl: string | null;
}

export interface OurOfficeBlock {
  __typename: "PageContentPageBuilderOurOfficeLayout";
  officeEyebrow: string;
  officeHeading: string;
  officeDescription: string;
  officeParagraphTwo: string;
  officeParagraphThree: string;
  officeGallery: OfficeGalleryImage[];
  officeBadgeLabel: string;
  officeBadgeLocation: string;
  officeFamilyCompanies: FamilyCompany[];
}

// ---- Team -----------------------------------------------------------------

export interface TeamMember {
  memberPhoto: {
    node: { sourceUrl: string; altText: string };
  } | null;
  memberName: string;
  memberRole: string;
}

export interface TeamBlock {
  __typename: "PageContentPageBuilderTeamLayout";
  teamEyebrow: string;
  teamHeading: string;
  teamDescription: string;
  teamMembers: TeamMember[];
}

// ---- Business Setup --------------------------------------------------------

// ---- shared shape used by any inline ConsultationForm instance -------------

export interface ConsultationFormFields {
  consultationEyebrow: string;
  consultationHeading: string;
  consultationDescription: string;
  consultationSourcePage: string;
  consultationFormType: "cf7" | "custom";
  consultationCf7FormId: string | null;
  consultationCustomFields: ConsultationCustomField[];
  consultationSubmitButtonText: string;
  consultationPrivacyText: string;
}

export interface ConsultationBlock extends ConsultationFormFields {
  __typename: "PageContentPageBuilderConsultationLayout";
  consultationBackgroundImage: ACFImage;
}

export interface BusinessSetupParagraph {
  paragraphText: string;
}

export interface BusinessSetupBlock {
  __typename: "PageContentPageBuilderBusinessSetupLayout";
  businessSetupEyebrow: string;
  businessSetupTitle: string;
  businessSetupContent: string; // HTML from WYSIWYG, multiple <p> paragraphs
  businessSetupTimeline: string;
  businessSetupPriceFrom: string;
  businessSetupConsultationForm: ConsultationFormFields;
}

// ---- Is It Right For You ----------------------------------------------------

export interface BestForPoint {
  pointText: string;
}

export interface IsItRightForYouBlock {
  __typename: "PageContentPageBuilderIsItRightForYouLayout";
  bestForEyebrow: string;
  bestForTitle: string;
  bestForIntro: string;
  bestForPoints: BestForPoint[];
  bestForImage: {
    node: { sourceUrl: string; altText: string };
  } | null;
  bestForButtonText: string;
  bestForButtonLink: string;
}

// ========  News  ====================================================================

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  href: string;
  excerpt: string;
  category: string;
  read_minutes: number;
  cover_url: string;
  published_on: string;
  body: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface BlogListingResult {
  articles: BlogArticle[];
  total: number;
  categories: BlogCategory[];
}

// ---- Contact Form + Info ---------------------------------------------------

export type ContactFormFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select";

export interface ContactFormCustomField {
  fieldLabel: string;
  fieldName: string;
  fieldType: ContactFormFieldType;
  fieldRequired: boolean;
  fieldOptions: { optionLabel: string }[] | null;
}

export type ContactInfoIcon =
  | "phone"
  | "whatsapp"
  | "email"
  | "location"
  | "clock"
  | "globe";

export interface ContactFormInfoItem {
  icon: ContactInfoIcon;
  label: string;
  value: string;
  link: string;
}

export interface ContactFormInfoBlock {
  __typename: "PageContentPageBuilderContactFormInfoLayout";
  contactFormEyebrow: string;
  contactFormHeading: string;
  contactFormDescription: string;
  contactFormSourcePage: string;
  contactFormFormType: "cf7" | "custom";
  contactFormCf7FormId: string | null;
  contactFormCustomFields: ContactFormCustomField[];
  contactFormSubmitButtonText: string;
  contactFormShowPrivacyNote: boolean;
  contactFormPrivacyText: string;
  contactFormInfoItems: ContactFormInfoItem[];
}

// ---- Map Section ------------------------------------------------------------

/**
 * ACF google_map field shape as exposed by WPGraphQL for ACF. VERIFY via
 * introspection after import — object-type ACF fields (like taxonomy/
 * post_object earlier) sometimes resolve differently than expected and
 * need a sub-selection adjustment. Query:
 *   { __type(name: "PageContentPageBuilderMapSectionLayout") { fields { name type { name kind } } } }
 */
export interface MapLocation {
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  postCode: string | null;
  country: string | null;
  countryShort: string | null;
  latitude: number | null;
  longitude: number | null;
  zoom: number | null;
  placeId: string | null;
}

export interface MapSectionBlock {
  __typename: "PageContentPageBuilderMapSectionLayout";
  mapEyebrow: string;
  mapTitle: string;
  mapAddress: string;
  mapLocation: MapLocation | null;
  mapLinkText: string;
}


export type EstimatorOptionIcon =
  | "none" | "store" | "briefcase" | "shopping_cart" | "factory"
  | "building" | "landmark" | "ship" | "circle";

export interface EstimatorOption {
  optionId: string;
  optionIcon: EstimatorOptionIcon | EstimatorOptionIcon[]; // WPGraphQL returns array
  optionLabel: string;
  optionDescription: string;
  optionBadge: string;
  optionDefaultOn: boolean;
}

export type EstimatorStepType = "single_select_cards" | "multi_select_toggles" | "contact_form";

export interface EstimatorStep {
  stepKey: string;
  stepType: EstimatorStepType | EstimatorStepType[]; // WPGraphQL returns array
  stepTitle: string;
  stepSubtitle: string;
  stepBodyText: string;
  stepRequired: boolean;
  stepOptions: EstimatorOption[];
}

export interface CostEstimatorBlock {
  __typename: "PageContentPageBuilderCostEstimatorLayout";
  estimatorSectionEyebrow: string;
  estimatorSectionHeading: string;
  estimatorSteps: EstimatorStep[];
  estimatorContinueText: string;
  estimatorBackText: string;
  estimatorSubmitText: string;
  estimatorSubmittingText: string;
  estimatorErrorText: string;
  estimatorSummaryTitle: string;
  estimatorNextStepsTitle: string;
  estimatorNextStepsText: string;
  estimatorSuccessHeading: string;
  estimatorSuccessMessage: string;
  estimatorSuccessCallText: string;
  estimatorSuccessWhatsappText: string;
  estimatorSourcePage: string;
  estimatorPhoneHref: string;
  estimatorWhatsappHref: string;
}

// ---- Union -------------------------------------------------------------

/** Every possible block that can appear in a page's flexible content. */
export type PageBuilderBlock =
  | HeroBlock
  | ServicesBlock
  | JurisdictionsBlock
  | WhyChooseBlock
  | HowItWorksBlock
  | BenefitsBlock
  | FoundersBlock
  | BlogPreviewBlock
  | ConsultationBlock
  | FaqBlock
  | CtaBandBlock
  | ReviewsBlock
  | PartnersBlock
  | TextBlock
  | OurOfficeBlock
  | TeamBlock
  | BusinessSetupBlock
  | IsItRightForYouBlock
  | ContactFormInfoBlock
  | MapSectionBlock
  | CostEstimatorBlock;


// ---- Posts (separate from the page builder blocks) ------------------------

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  categoryName: string;
  coverUrl: string;
  coverAlt: string;
  publishedOn: string;
  language?: WPLanguage;
  translations?: WPTranslation[];
}

export interface WPLanguage {
  code: string;
  slug: string;
  name: string;
  locale: string;
}

export interface WPTranslation {
  uri: string;
  language: WPLanguage;
}

export interface WPPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryName: string;
  readMinutes: number;
  coverUrl: string;
  publishedOn: string;
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  categoryName: string;
  coverUrl: string;
  coverAlt: string;
  publishedOn: string;
  language?: WPLanguage;
  translations?: WPTranslation[];
}

export interface WPPage {
  title: string;
  pageContent: { pageBuilder: any[] };
  latestPosts?: WPPostSummary[];
  language?: WPLanguage;
  translations?: WPTranslation[];
  databaseId: number;
  uri?: string;
}
