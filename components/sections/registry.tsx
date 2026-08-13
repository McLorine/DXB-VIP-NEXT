// ============================================================================
// SECTION REGISTRY
// Maps each WPGraphQL __typename to the React component that renders it.
//
// TO ADD A NEW SECTION (after wiring its fragment + type, see fragments/index.ts):
//   1. Import the component below.
//   2. Add one line to SECTION_REGISTRY.
// SectionRenderer and app/page.tsx never need to change.
// ============================================================================

import type { ComponentType } from "react";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import Jurisdictions from "@/components/home/Jurisdictions";
import WhyChoose from "@/components/home/WhyChoose";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import Founders from "@/components/home/Founders";
import BlogPreview from "@/components/home/BlogPreview";
import ConsultationSection from "@/components/common/ConsultationSection";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/common/CtaBand";
import Reviews from "@/components/home/Reviews";
import Partners from "@/components/home/Partners";
import Text from "@/components/common/Text";
import OurOffice from "@/components/about/OurOffice";
import TeamSlider from "@/components/about/TeamSlider";

export const SECTION_REGISTRY: Record<string, ComponentType<any>> = {
  PageContentPageBuilderHeroLayout: Hero,
  PageContentPageBuilderServicesLayout: ServicesGrid,
  PageContentPageBuilderJurisdictionsLayout: Jurisdictions,
  PageContentPageBuilderWhyChooseLayout: WhyChoose,
  PageContentPageBuilderHowItWorksLayout: HowItWorks,
  PageContentPageBuilderBenefitsLayout: Benefits,
  PageContentPageBuilderFoundersLayout: Founders,
  PageContentPageBuilderBlogPreviewLayout: BlogPreview,
  PageContentPageBuilderConsultationLayout: ConsultationSection,
  PageContentPageBuilderFaqLayout: FaqSection,
  PageContentPageBuilderCtaBandLayout: CtaBand,
  PageContentPageBuilderReviewsLayout: Reviews,
  PageContentPageBuilderPartnersLayout: Partners,
  PageContentPageBuilderTextLayout: Text,
  PageContentPageBuilderOurOfficeLayout: OurOffice,
  PageContentPageBuilderTeamLayout: TeamSlider, 
  // ⬅ add new "<Typename>": Component here
};
