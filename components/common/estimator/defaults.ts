import { Store, Briefcase, ShoppingCart, Factory, Building2, Landmark, Ship, Circle } from "lucide-react";
import type { EstimatorStep, EstimatorOptionIcon } from "@/lib/wordpress/types";

export const ICON_MAP: Partial<Record<EstimatorOptionIcon, React.ComponentType<{ className?: string; strokeWidth?: number }>>> = {
  store: Store,
  briefcase: Briefcase,
  shopping_cart: ShoppingCart,
  factory: Factory,
  building: Building2,
  landmark: Landmark,
  ship: Ship,
  circle: Circle,
};

function opt(
  optionId: string,
  optionLabel: string,
  optionDescription: string,
  optionIcon: EstimatorOptionIcon = "none",
  optionBadge = "",
  optionDefaultOn = false
) {
  return { optionId, optionIcon, optionLabel, optionDescription, optionBadge, optionDefaultOn };
}

/**
 * Complete 7-step default flow matching the reference screenshots exactly.
 * Used automatically whenever the ACF `estimatorSteps` repeater is empty —
 * drop the Cost Estimator block onto a page and it works immediately with
 * zero configuration. Once an editor adds even one row to the ACF repeater,
 * this default is ignored entirely in favor of the CMS data.
 */
export const DEFAULT_ESTIMATOR_STEPS: EstimatorStep[] = [
  {
    stepKey: "business",
    stepType: "single_select_cards",
    stepTitle: "What business are you planning?",
    stepSubtitle: "Choose the activity closest to yours",
    stepBodyText: "",
    stepRequired: true,
    stepOptions: [
      opt("commercial_trading", "Commercial Trading", "Buy, sell, import or export goods", "store"),
      opt("professional_services", "Professional Services", "Consultancy, agency, IT or design", "briefcase"),
      opt("ecommerce", "E-Commerce", "Sell online with a UAE payment gateway", "shopping_cart"),
      opt("industrial_manufacturing", "Industrial / Manufacturing", "Manufacture, assemble or process goods", "factory"),
      opt("not_sure_business", "Not sure yet", "We'll recommend the best fit", "circle"),
    ],
  },
  {
    stepKey: "location",
    stepType: "single_select_cards",
    stepTitle: "Where do you want to set up?",
    stepSubtitle: "Not sure? Free Zone fits 80% of international founders",
    stepBodyText: "",
    stepRequired: true,
    stepOptions: [
      opt("free_zone", "Free Zone", "100% ownership · 0% tax options · remote setup possible", "building", "MOST POPULAR"),
      opt("mainland", "Mainland", "Trade anywhere in the UAE · unlimited visas · 2,200+ activities", "landmark"),
      opt("non_residency", "Non-Residency Package", "Own a UAE company without relocating · company + bank account", "ship", "REMOTE"),
      opt("not_sure_location", "Not sure yet", "We'll match you to the right jurisdiction", "circle"),
    ],
  },
  {
    stepKey: "visas",
    stepType: "single_select_cards",
    stepTitle: "How many residency visas do you need?",
    stepSubtitle: "You can add dependents later",
    stepBodyText: "",
    stepRequired: true,
    stepOptions: [
      opt("visas_none", "None right now", "Company only for now"),
      opt("visas_one", "1 visa", "Just me"),
      opt("visas_two", "2 visas", "Me + 1 partner or spouse"),
      opt("visas_three", "3 visas", "Small team"),
      opt("visas_four_plus", "4+ visas", "Growing team"),
    ],
  },
  {
    stepKey: "timeline",
    stepType: "single_select_cards",
    stepTitle: "When are you planning to set up?",
    stepSubtitle: "No wrong answer — this just helps us prepare",
    stepBodyText: "",
    stepRequired: true,
    stepOptions: [
      opt("asap", "As soon as possible", "I'm ready to start today"),
      opt("timeline_1_3", "Within 1–3 months", "Planning ahead"),
      opt("timeline_3_6", "Within 3–6 months", "Early stage"),
      opt("just_exploring", "Just exploring", "Gathering information"),
    ],
  },
  {
    stepKey: "budget",
    stepType: "single_select_cards",
    stepTitle: "Do you have a budget in mind?",
    stepSubtitle: "We'll match the structure to it",
    stepBodyText: "",
    stepRequired: true,
    stepOptions: [
      opt("budget_under_15", "Under AED 15,000", "Lean entry"),
      opt("budget_15_30", "AED 15,000 – 30,000", "Standard setup"),
      opt("budget_above_30", "Above AED 30,000", "Full service"),
      opt("budget_not_sure", "Not sure yet", "Help me understand the cost"),
    ],
  },
  {
    stepKey: "addons",
    stepType: "multi_select_toggles",
    stepTitle: "Anything else?",
    stepSubtitle: "Toggle the services you'd like included",
    stepBodyText: "",
    stepRequired: false,
    stepOptions: [
      opt("bank_account", "Corporate Bank Account", "Introduction to a tier-one UAE bank", "none", "", true),
      opt("monthly_accounting", "Monthly Accounting", "Bookkeeping & management reporting"),
      opt("corporate_tax", "Corporate Tax Registration", "9% CT registration & filing"),
      opt("pro_liaison", "PRO & Government Liaison", "Visas, renewals & attestations"),
      opt("office_ejari", "Office & Ejari Solution", "Flexi-desk or serviced office"),
      opt("trademark", "Trademark Registration", "Protect your brand in the GCC"),
    ],
  },
  {
    stepKey: "contact",
    stepType: "contact_form",
    stepTitle: "Get your estimate",
    stepSubtitle: "We'll confirm the exact price in a free call",
    stepBodyText:
      "Leave your details and a senior advisor will call you with a fixed, all-inclusive price tailored to your selections — free, no obligation.",
    stepRequired: true,
    stepOptions: [],
  },
];

export const DEFAULT_COPY = {
  continueText: "Continue",
  backText: "Back",
  submitText: "Get my estimate",
  submittingText: "Sending",
  errorText: "Something went wrong. Please try again or call us directly.",
  summaryTitle: "Your Selections",
  nextStepsTitle: "What happens next",
  nextStepsText:
    "A senior advisor reviews your selections and calls you with a fixed, all-inclusive quotation — usually within one business day. No obligation, no hidden charges.",
  successHeading: "Your estimate is on its way",
  successMessage:
    "Thank you, {{name}}. A senior advisor will review your selections and call you within one business day with a confirmed, fixed price.",
  successCallText: "Call us now",
  successWhatsappText: "WhatsApp instead",
  sourcePage: "cost-estimator",
  phoneHref: "tel:+97141234567",
  whatsappHref: "https://wa.me/97141234567",
};
