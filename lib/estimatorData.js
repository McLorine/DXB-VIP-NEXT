export const BUSINESS_TYPES = [
  { id: "commercial", label: "Commercial Trading", desc: "Buy, sell, import or export goods", icon: "Store", modifier: 0 },
  { id: "professional", label: "Professional Services", desc: "Consultancy, agency, IT or design", icon: "BriefcaseBusiness", modifier: -1500 },
  { id: "ecommerce", label: "E-Commerce", desc: "Sell online with a UAE payment gateway", icon: "ShoppingCart", modifier: -4000 },
  { id: "industrial", label: "Industrial / Manufacturing", desc: "Manufacture, assemble or process goods", icon: "Factory", modifier: 8000 },
  { id: "unsure", label: "Not sure yet", desc: "We'll recommend the best fit", icon: "HelpCircle", modifier: 0 }
];

export const SETUP_LOCATIONS = [
  {
    id: "freezone",
    label: "Free Zone",
    tag: "Most Popular",
    desc: "100% ownership · 0% tax options · remote setup possible",
    icon: "Building2",
    base: 11900,
    visaCost: 2500,
    visaQuota: "Flexible"
  },
  {
    id: "mainland",
    label: "Mainland",
    tag: null,
    desc: "Trade anywhere in the UAE · unlimited visas · 2,200+ activities",
    icon: "Landmark",
    base: 15400,
    visaCost: 3500,
    visaQuota: "Unlimited"
  },
  {
    id: "nonresidency",
    label: "Non-Residency Package",
    tag: "Remote",
    desc: "Own a UAE company without relocating · company + bank account",
    icon: "Ship",
    base: 13200,
    visaCost: 1500,
    visaQuota: "1 included"
  },
  {
    id: "unsure",
    label: "Not sure yet",
    tag: null,
    desc: "We'll match you to the right jurisdiction",
    icon: "HelpCircle",
    base: 11900,
    visaCost: 2500,
    visaQuota: "Flexible"
  }
];

export const VISA_OPTIONS = [
  { id: 0, label: "None right now", desc: "Company only for now" },
  { id: 1, label: "1 visa", desc: "Just me" },
  { id: 2, label: "2 visas", desc: "Me + 1 partner or spouse" },
  { id: 3, label: "3 visas", desc: "Small team" },
  { id: 5, label: "4+ visas", desc: "Growing team" }
];

export const TIMELINE_OPTIONS = [
  { id: "asap", label: "As soon as possible", desc: "I'm ready to start today" },
  { id: "1-3m", label: "Within 1–3 months", desc: "Planning ahead" },
  { id: "3-6m", label: "Within 3–6 months", desc: "Early stage" },
  { id: "exploring", label: "Just exploring", desc: "Gathering information" }
];

export const BUDGET_OPTIONS = [
  { id: "under-15k", label: "Under AED 15,000", desc: "Lean entry" },
  { id: "15-30k", label: "AED 15,000 – 30,000", desc: "Standard setup" },
  { id: "30k+", label: "Above AED 30,000", desc: "Full service" },
  { id: "unsure", label: "Not sure yet", desc: "Help me understand the cost" }
];

export const ADD_ONS = [
  { id: "banking", label: "Corporate Bank Account", desc: "Introduction to a tier-one UAE bank", price: 2500, defaultOn: true },
  { id: "accounting", label: "Monthly Accounting", desc: "Bookkeeping & management reporting", price: 7200, period: "yr" },
  { id: "tax", label: "Corporate Tax Registration", desc: "9% CT registration & filing", price: 1200, defaultOn: false },
  { id: "pro", label: "PRO & Government Liaison", desc: "Visas, renewals & attestations", price: 1500, period: "yr" },
  { id: "office", label: "Office & Ejari Solution", desc: "Flexi-desk or serviced office", price: 4000, period: "yr" },
  { id: "trademark", label: "Trademark Registration", desc: "Protect your brand in the GCC", price: 2200, defaultOn: false }
];

export function calculateEstimate(selections) {
  const location = SETUP_LOCATIONS.find((l) => l.id === selections.location) || SETUP_LOCATIONS[0];
  const businessType = BUSINESS_TYPES.find((b) => b.id === selections.businessType) || BUSINESS_TYPES[0];
  const visas = VISA_OPTIONS.find((v) => v.id === selections.visas) || VISA_OPTIONS[0];

  const licenseCost = location.base + businessType.modifier;
  const visaTotal = (visas.id || 0) * location.visaCost;

  const addOns = ADD_ONS.filter((a) => selections.addOns?.[a.id]).map((a) => ({
    ...a,
    total: a.price
  }));
  const addOnTotal = addOns.reduce((sum, a) => sum + a.total, 0);

  const governmentFees = Math.round(licenseCost * 0.08);
  const total = licenseCost + visaTotal + addOnTotal + governmentFees;

  return {
    location,
    businessType,
    visas,
    licenseCost,
    visaTotal,
    addOns,
    governmentFees,
    total,
    timeline: selections.timeline,
    budget: selections.budget
  };
}

export function formatAED(amount) {
  return "AED " + amount.toLocaleString("en-US");
}