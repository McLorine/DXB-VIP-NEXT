// ============================================================================
// FRAGMENT REGISTRY
// Every section's fragment gets combined here into what the page query sends.
//
// TO ADD A NEW SECTION:
//   1. Create fragments/<section>.ts (copy hero.ts or services.ts as a template).
//   2. Import its FRAGMENT and INLINE_SPREAD exports below.
//   3. Push them into ALL_FRAGMENTS and ALL_INLINE_SPREADS.
// That's it — queries/page.ts and getPage.ts never need to change.
// ============================================================================

import { HERO_FRAGMENT, HERO_INLINE_SPREAD } from "./hero";
import { SERVICES_FRAGMENT, SERVICES_INLINE_SPREAD } from "./services";
import {
  JURISDICTIONS_FRAGMENT,
  JURISDICTIONS_INLINE_SPREAD,
} from "./jurisdictions";
import { WHY_CHOOSE_FRAGMENT, WHY_CHOOSE_INLINE_SPREAD } from "./why-choose";
import {
  HOW_IT_WORKS_FRAGMENT,
  HOW_IT_WORKS_INLINE_SPREAD,
} from "./how-it-works";
import { BENEFITS_FRAGMENT, BENEFITS_INLINE_SPREAD } from "./benefits";
import { FOUNDERS_FRAGMENT, FOUNDERS_INLINE_SPREAD } from "./founders";
import {
  BLOG_PREVIEW_FRAGMENT,
  BLOG_PREVIEW_INLINE_SPREAD,
} from "./blog-preview";
import {
  CONSULTATION_FRAGMENT,
  CONSULTATION_INLINE_SPREAD,
} from "./consultation";
import { FAQ_FRAGMENT, FAQ_INLINE_SPREAD } from "./faq";
import { CTA_BAND_FRAGMENT, CTA_BAND_INLINE_SPREAD } from "./cta-band";
import { REVIEWS_FRAGMENT, REVIEWS_INLINE_SPREAD } from "./reviews";
import { PARTNERS_FRAGMENT, PARTNERS_INLINE_SPREAD } from "./partners";
import { TEXT_FRAGMENT, TEXT_INLINE_SPREAD } from "./text";
import { OUR_OFFICE_FRAGMENT, OUR_OFFICE_INLINE_SPREAD } from "./our-office";
import { TEAM_FRAGMENT, TEAM_INLINE_SPREAD } from "./team";
import {
  BUSINESS_SETUP_FRAGMENT,
  BUSINESS_SETUP_INLINE_SPREAD,
} from "./business-setup";
import {
  IS_IT_RIGHT_FOR_YOU_FRAGMENT,
  IS_IT_RIGHT_FOR_YOU_INLINE_SPREAD,
} from "./is-it-right-for-you";
import {
  CONTACT_FORM_INFO_FRAGMENT,
  CONTACT_FORM_INFO_INLINE_SPREAD,
} from "./contact-form-info";
import { MAP_SECTION_FRAGMENT, MAP_SECTION_INLINE_SPREAD } from "./map-section";
import {
  COST_ESTIMATOR_FRAGMENT,
  COST_ESTIMATOR_INLINE_SPREAD,
} from "./cost-estimator";

// ---- ⬇ ADD NEW IMPORTS ABOVE THIS LINE ⬇ -----------------------------------

export const ALL_FRAGMENTS = [
  HERO_FRAGMENT,
  SERVICES_FRAGMENT,
  JURISDICTIONS_FRAGMENT,
  WHY_CHOOSE_FRAGMENT,
  HOW_IT_WORKS_FRAGMENT,
  BENEFITS_FRAGMENT,
  FOUNDERS_FRAGMENT,
  BLOG_PREVIEW_FRAGMENT,
  CONSULTATION_FRAGMENT,
  FAQ_FRAGMENT,
  CTA_BAND_FRAGMENT,
  REVIEWS_FRAGMENT,
  PARTNERS_FRAGMENT,
  TEXT_FRAGMENT,
  OUR_OFFICE_FRAGMENT,
  TEAM_FRAGMENT,
  BUSINESS_SETUP_FRAGMENT,
  IS_IT_RIGHT_FOR_YOU_FRAGMENT,
  CONTACT_FORM_INFO_FRAGMENT,
  MAP_SECTION_FRAGMENT,
  COST_ESTIMATOR_FRAGMENT,

  // ⬅ add new *_FRAGMENT here
].join("\n");

export const ALL_INLINE_SPREADS = [
  HERO_INLINE_SPREAD,
  SERVICES_INLINE_SPREAD,
  JURISDICTIONS_INLINE_SPREAD,
  WHY_CHOOSE_INLINE_SPREAD,
  HOW_IT_WORKS_INLINE_SPREAD,
  BENEFITS_INLINE_SPREAD,
  FOUNDERS_INLINE_SPREAD,
  BLOG_PREVIEW_INLINE_SPREAD,
  CONSULTATION_INLINE_SPREAD,
  FAQ_INLINE_SPREAD,
  CTA_BAND_INLINE_SPREAD,
  REVIEWS_INLINE_SPREAD,
  PARTNERS_INLINE_SPREAD,
  TEXT_INLINE_SPREAD,
  OUR_OFFICE_INLINE_SPREAD,
  TEAM_INLINE_SPREAD,
  BUSINESS_SETUP_INLINE_SPREAD,
  IS_IT_RIGHT_FOR_YOU_INLINE_SPREAD,
  CONTACT_FORM_INFO_INLINE_SPREAD,
  MAP_SECTION_INLINE_SPREAD,
  COST_ESTIMATOR_INLINE_SPREAD,

  // ⬅ add new *_INLINE_SPREAD here
].join("\n");

// Typenames worth knowing outside the fragments themselves
export { BLOG_PREVIEW_TYPENAME } from "./blog-preview";
