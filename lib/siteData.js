export const CONTACT = {
  phone: "+971 4 123 4567",
  phoneHref: "tel:+97141234567",
  whatsapp: "https://wa.me/971501234567",
  email: "hello@dxb-vip.ae",
  address: "Level 42, Emirates Towers, Sheikh Zayed Road, Dubai, UAE",
  hours: "Sun – Thu, 9:00 – 18:00 GST"
};
export const SOCIAL = {
  linkedin: "https://www.linkedin.com",
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
};

// Keep legacy `CONTACT` shape and include social links for TS consumers
CONTACT.linkedin = SOCIAL.linkedin;
CONTACT.instagram = SOCIAL.instagram;
CONTACT.facebook = SOCIAL.facebook;

export const IMAGES = {
  hero: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/16a3ec6e4_generated_image.png",
  jurisdictionMainland: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/55b473dc3_generated_image.png",
  jurisdictionFreezone: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/e8ebc76b8_generated_image.png",
  jurisdictionOffshore: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/560292524_generated_image.png",
  lobby: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/011c48de1_generated_6b4b3a5e.png",
  stillLife: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/5789f237d_generated_193c5862.png",
  ceo1: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/175df363a_generated_070ec2b6.png",
  ceo2: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/4bdd528ab_generated_d6273747.png",
  museum: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/b1bfac289_generated_1353206d.png",
  freezone: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/62fd3e59f_generated_327c1bb0.png",
  mainland: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/d3735b7ed_generated_51795575.png",
  offshore: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/16a90b505_generated_d98b40cd.png",
  office: "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/fe13d49fb_generated_f7188214.png"
};

export const TRUST_STATS = [
  { value: "4,800+", label: "Companies Formed" },
  { value: "14 Days", label: "Average Setup Time" },
  { value: "100%", label: "Foreign Ownership" },
  { value: "4.9/5", label: "Client Rating" }
];

export const SERVICES = [
  { slug: "commercial-trade-license", title: "Commercial Trade License", desc: "Trade, import, export and general commerce across the UAE and beyond.", icon: "Store", hub: "trade-licenses" },
  { slug: "professional-license", title: "Professional License", desc: "For consultants, agencies and skilled service providers with 100% ownership.", icon: "BriefcaseBusiness", hub: "trade-licenses" },
  { slug: "industrial-license", title: "Industrial License", desc: "Manufacturing, assembly and packaging operations with warehousing support.", icon: "Factory", hub: "trade-licenses" },
  { slug: "e-commerce-license", title: "E-Commerce License", desc: "Sell online legally across the GCC with payment-gateway readiness.", icon: "ShoppingCart", hub: "trade-licenses" },
  { slug: "freezone-company", title: "Free Zone Company", desc: "Zero customs duty, full repatriation and 100% foreign ownership.", icon: "Building2", hub: "business-setup" },
  { slug: "mainland-company", title: "Mainland Company", desc: "Trade anywhere in the UAE with unrestricted access to local markets.", icon: "Landmark", hub: "business-setup" },
  { slug: "offshore-company", title: "Offshore Company", desc: "Asset holding and international structuring with full confidentiality.", icon: "Ship", hub: "business-setup" },
  { slug: "golden-visa", title: "Golden Visa & Residency", desc: "10-year residency for investors, founders and specialised talent.", icon: "BadgeCheck", hub: "additional-services" }
];

export const LICENSES = [
  {
    slug: "commercial-trade-license",
    title: "Commercial Trade License",
    eyebrow: "Trade Licensing",
    lead: "The most widely issued license in Dubai — built for buying, selling, importing and exporting goods.",
    image: IMAGES.mainland,
    timeline: "7 – 14 working days",
    from: "AED 12,500",
    activities: ["General trading", "Import & export", "Retail and wholesale", "Building materials", "FMCG distribution", "Automotive trade"],
    includes: ["DED or free zone license issuance", "Up to 3 business activities", "Initial approval & trade name reservation", "MOA drafting and notarisation", "Establishment card", "Corporate bank account introduction"],
    requirements: ["Passport copy of each shareholder", "Passport-size photograph", "Three preferred trade names", "Emirates ID or visa copy if UAE resident", "Proof of address"]
  },
  {
    slug: "professional-license",
    title: "Professional License",
    eyebrow: "Trade Licensing",
    lead: "For expertise-led businesses — consultancies, agencies, studios and technical services — with 100% foreign ownership.",
    image: IMAGES.lobby,
    timeline: "5 – 10 working days",
    from: "AED 9,800",
    activities: ["Management consultancy", "Marketing & advertising", "IT and software services", "Engineering consultancy", "Design studios", "Education & training"],
    includes: ["Professional license issuance", "Local Service Agent arrangement (mainland)", "Trade name reservation", "Immigration card", "Two residency visa allocations", "Bank account introduction"],
    requirements: ["Passport copies of shareholders", "Attested degree or experience proof where required", "Three preferred trade names", "Passport-size photograph"]
  },
  {
    slug: "industrial-license",
    title: "Industrial License",
    eyebrow: "Trade Licensing",
    lead: "Permission to manufacture, assemble, process or package goods within the UAE with warehousing rights.",
    image: IMAGES.offshore,
    timeline: "3 – 6 weeks",
    from: "AED 24,000",
    activities: ["Food processing", "Furniture manufacturing", "Metal fabrication", "Packaging & labelling", "Plastics and polymers", "Assembly plants"],
    includes: ["Industrial license issuance", "Ministry of Industry approvals", "Warehouse or plot identification", "Civil defence and municipality clearances", "Labour quota application", "Customs code registration"],
    requirements: ["Business plan and production flow", "Passport copies of shareholders", "Warehouse tenancy or Ejari", "Machinery and equipment list"]
  },
  {
    slug: "e-commerce-license",
    title: "E-Commerce License",
    eyebrow: "Trade Licensing",
    lead: "Trade online with full legitimacy — the fastest route to a UAE payment gateway and marketplace listings.",
    image: IMAGES.office,
    timeline: "3 – 7 working days",
    from: "AED 6,500",
    activities: ["Online retail stores", "Dropshipping", "Digital products & SaaS", "Marketplace sellers", "Subscription boxes", "Print on demand"],
    includes: ["E-commerce license issuance", "Domain and trade name alignment", "Payment gateway documentation pack", "Amazon / Noon seller readiness", "One residency visa allocation", "Bank account introduction"],
    requirements: ["Passport copy", "Passport-size photograph", "Three preferred trade names", "Website or store concept summary"]
  }
];

export const SETUPS = [
  {
    slug: "freezone-company",
    title: "Free Zone Company",
    eyebrow: "Business Setup",
    lead: "Over 40 UAE free zones, each with its own advantages. We match you to the one that fits your activity, budget and visa needs.",
    image: IMAGES.freezone,
    timeline: "5 – 14 working days",
    from: "AED 11,900",
    activities: ["IFZA & Meydan", "DMCC", "DAFZA", "SHAMS & RAKEZ", "Dubai Internet City", "DIFC"],
    includes: ["Free zone license and incorporation", "100% foreign ownership", "Flexi-desk or private office", "Establishment card & e-channel", "Investor visa processing", "Corporate bank account introduction"],
    requirements: ["Passport copies of shareholders", "Passport-size photographs", "Three preferred trade names", "Proof of residential address"]
  },
  {
    slug: "mainland-company",
    title: "Mainland Company",
    eyebrow: "Business Setup",
    lead: "Trade freely anywhere in the UAE, bid for government contracts and open unlimited branches — now with 100% ownership in most activities.",
    image: IMAGES.mainland,
    timeline: "7 – 14 working days",
    from: "AED 15,400",
    activities: ["DED commercial", "Professional services", "Branch of foreign company", "Restaurants & F&B", "Retail outlets", "Contracting"],
    includes: ["DED license issuance", "Trade name & initial approval", "MOA drafting and notarisation", "Ejari and office solution", "Unlimited visa quota guidance", "VAT & corporate tax registration"],
    requirements: ["Passport and visa copies", "Emirates ID for residents", "Ejari or office tenancy", "Activity-specific external approvals"]
  },
  {
    slug: "offshore-company",
    title: "Offshore Company",
    eyebrow: "Business Setup",
    lead: "A confidential holding vehicle for international assets, IP and shareholdings — no UAE office or visa required.",
    image: IMAGES.offshore,
    timeline: "4 – 8 working days",
    from: "AED 13,200",
    activities: ["RAK ICC", "JAFZA Offshore", "Asset holding", "Real estate holding", "IP holding", "International trade"],
    includes: ["Offshore incorporation", "Registered agent & office", "Certificate of incumbency", "Share certificates & registers", "Multi-currency bank introduction", "Annual compliance calendar"],
    requirements: ["Notarised passport copies", "Bank reference letter", "Proof of address (under 3 months)", "Brief business profile"]
  }
];

export const ADDITIONAL_SERVICES = [
  { slug: "golden-visa", title: "Golden Visa & Residency", desc: "10-year residency for investors, entrepreneurs and specialised talent — including family sponsorship.", icon: "BadgeCheck" },
  { slug: "corporate-banking", title: "Corporate Bank Account", desc: "Introductions to tier-one UAE banks with compliance-ready documentation packs.", icon: "Landmark" },
  { slug: "vat-tax", title: "VAT & Corporate Tax", desc: "Registration, filing and 9% corporate tax structuring handled by licensed advisors.", icon: "Receipt" },
  { slug: "accounting", title: "Accounting & Bookkeeping", desc: "Monthly bookkeeping, management reporting and audit-ready financial statements.", icon: "Calculator" },
  { slug: "pro-services", title: "PRO & Government Liaison", desc: "Visas, labour cards, attestations and renewals managed end to end.", icon: "Stamp" },
  { slug: "office-solutions", title: "Office & Ejari Solutions", desc: "Flexi-desks, serviced offices and warehouses across Dubai's key districts.", icon: "Building" },
  { slug: "trademark", title: "Trademark Registration", desc: "Protect your brand across the UAE and the wider GCC with full filing support.", icon: "ShieldCheck" },
  { slug: "compliance", title: "Compliance & Renewals", desc: "AML, ESR and UBO filings plus proactive license renewal management.", icon: "FileCheck" }
];

export const WHY_POINTS = [
  { title: "Government-Approved Channels", desc: "Direct registration relationships with DED, DMCC, IFZA, Meydan and 40+ free zone authorities — no intermediaries inflating your cost." },
  { title: "Fixed, All-Inclusive Pricing", desc: "One quotation covering license, visas and government fees. **No hidden charges** appear later in the process." },
  { title: "One Dedicated Advisor", desc: "A single named consultant owns your file from first call to license collection — reachable on WhatsApp, in your time zone." },
  { title: "Post-Setup Continuity", desc: "Banking, tax, accounting and renewals stay with us, so your company remains compliant year after year." }
];

export const STEPS = [
  { title: "Free Consultation", desc: "A 30-minute call to understand your activity, ownership goals and visa needs. You leave with a written structure recommendation." },
  { title: "Structure & Quotation", desc: "We compare mainland, free zone and offshore options, then issue a fixed all-inclusive quotation with timelines." },
  { title: "Documentation & Filing", desc: "You send passport copies; we handle name reservation, initial approvals, MOA and authority submissions." },
  { title: "License, Visa & Banking", desc: "License issued, Emirates ID and residency processed, and your corporate bank account introduced. Typically within two weeks." }
];

export const BENEFITS = [
  { title: "0% Personal Income Tax", desc: "Keep what you earn — no personal income tax on salaries, dividends or capital gains.", icon: "PiggyBank" },
  { title: "100% Foreign Ownership", desc: "Own your company outright in free zones and most mainland activities.", icon: "Crown" },
  { title: "Full Profit Repatriation", desc: "Move capital and profits abroad freely, in any major currency.", icon: "ArrowLeftRight" },
  { title: "Strategic Global Position", desc: "Two-thirds of the world within an eight-hour flight, served by two major hubs.", icon: "Globe2" },
  { title: "Residency for the Family", desc: "Your license unlocks renewable residency visas for you, your spouse and children.", icon: "Users" },
  { title: "World-Class Banking", desc: "Multi-currency corporate accounts with stable, internationally connected banks.", icon: "CreditCard" }
];

export const CEOS = [
  {
    name: "Omar Al Rashid",
    role: "Co-Founder & Chief Executive Officer",
    image: IMAGES.ceo1,
    bio: "Omar has structured more than 3,000 UAE companies over 18 years, advising founders from 60 countries. A former licensing officer, he built DXB-VIP around one principle: entrepreneurs deserve a straight answer before they spend a dirham."
  },
  {
    name: "Elena Marchetti",
    role: "Co-Founder & Managing Director",
    image: IMAGES.ceo2,
    bio: "Elena leads our banking, tax and compliance practice. She arrived in Dubai as a founder herself, and now guides international clients through corporate tax, ESR and audit with the calm of someone who has done it from both sides of the desk."
  }
];

export const FAQS = [
  { q: "How long does it take to set up a business in Dubai?", a: "Most free zone companies are licensed within 5 to 14 working days, and mainland companies within 7 to 14. Adding residency visas and a bank account typically brings the full process to two to four weeks." },
  { q: "Can I own 100% of my company as a foreigner?", a: "Yes. All free zone companies allow full foreign ownership, and since the 2021 reforms most mainland commercial and professional activities do as well. A small list of strategic activities still requires an Emirati partner — we confirm this for your specific activity during the consultation." },
  { q: "Do I need to be in Dubai to register my company?", a: "Not for the license itself — most structures can be incorporated remotely with notarised documents. You will need to visit the UAE once for your Emirates ID biometrics and, in most cases, to open your bank account in person." },
  { q: "How much does business setup in Dubai cost?", a: "A lean e-commerce or professional license starts around AED 6,500 to 12,000. A mainland trading company with an office and visas usually falls between AED 15,000 and 30,000. Our quotations are fixed and all-inclusive of government fees." },
  { q: "What is the difference between mainland and free zone?", a: "A free zone company offers 100% ownership, zero customs duty and lower costs, but trades inside the UAE through a distributor or branch. A mainland company can trade and contract anywhere in the UAE, including with government bodies, and has no visa quota ceiling." },
  { q: "Will I have to pay tax in the UAE?", a: "There is no personal income tax. Corporate tax is 9% on taxable profits above AED 375,000, with qualifying free zone income potentially at 0%. VAT registration is required once turnover exceeds AED 375,000. We handle registration and filing." },
  { q: "Can I get a residency visa with my license?", a: "Yes. Every license carries a visa allocation for shareholders, employees and dependents. Investors meeting certain thresholds can also qualify for the 10-year Golden Visa, which we apply for on your behalf." },
  { q: "Which bank will I be able to open an account with?", a: "We introduce clients to tier-one UAE banks including Emirates NBD, Mashreq, RAKBANK and WIO. Approval depends on your activity, shareholder nationalities and business substance — we prepare your file to meet compliance expectations before submission." },
  { q: "What happens after my company is formed?", a: "Your advisor stays with you. We manage license renewals, visa renewals, accounting, VAT and corporate tax filings, and the annual AML, ESR and UBO obligations so nothing lapses." },
  { q: "Is the consultation really free?", a: "Yes — a 30-minute strategy call with a senior advisor at no cost and no obligation. You will receive a written structure recommendation and cost breakdown whether or not you proceed with us." }
];

export const ARTICLE_SEED = [
  { title: "Mainland vs Free Zone in 2026: The Honest Comparison", slug: "mainland-vs-free-zone-2026", excerpt: "Ownership, cost, customs and visa quotas compared side by side — and the three questions that decide it for you.", category: "Company Structures", read_minutes: 7, cover_url: IMAGES.freezone, published_on: "2026-07-14", body: "Choosing between mainland and free zone is the single most consequential decision in your UAE setup. It determines who you can sell to, what you pay in customs, how many visas you can issue and how your profits are taxed.\n\n**Where you can sell.** A mainland license lets you invoice customers anywhere in the UAE and bid for government tenders. A free zone company sells freely internationally and within its zone, but reaches the domestic market through a distributor or a mainland branch.\n\n**What it costs.** Free zone packages remain the lower entry point, often bundling a flexi-desk and one visa. Mainland requires physical premises with an Ejari, which adds real cost but removes the visa ceiling.\n\n**How you are taxed.** Both fall under the 9% corporate tax regime, but a Qualifying Free Zone Person earning qualifying income may retain a 0% rate. The substance requirements are strict and worth modelling before you incorporate.\n\nThe deciding questions are simple: who is your customer, do you import physical goods, and how many people will you sponsor in year one?" },
  { title: "UAE Corporate Tax: What Founders Must File in 2026", slug: "uae-corporate-tax-2026", excerpt: "Registration deadlines, the 0% free zone question, and the records auditors will actually ask for.", category: "Tax & Compliance", read_minutes: 6, cover_url: IMAGES.stillLife, published_on: "2026-06-28", body: "Corporate tax is now a settled part of doing business in the UAE, and the compliance rhythm is predictable once you understand it.\n\n**Registration.** Every taxable person must register with the Federal Tax Authority and obtain a Corporate Tax Registration Number, regardless of profit level.\n\n**The rate.** 0% applies to taxable income up to AED 375,000 and 9% above it. Small Business Relief may be elected where revenue stays under AED 3 million.\n\n**Free zone entities.** Qualifying Free Zone Persons can access a 0% rate on qualifying income, provided they maintain adequate substance, keep audited financial statements and avoid disqualifying transactions with the mainland.\n\n**Records.** Maintain seven years of books, transfer pricing documentation for related-party dealings, and an audit trail for every intercompany charge. The cost of good bookkeeping is always lower than the cost of reconstructing it." },
  { title: "The Golden Visa: Who Actually Qualifies", slug: "golden-visa-who-qualifies", excerpt: "The investor, entrepreneur and specialised talent routes to 10-year UAE residency, with real thresholds.", category: "Visas & Residency", read_minutes: 5, cover_url: IMAGES.museum, published_on: "2026-06-09", body: "The Golden Visa grants ten years of renewable UAE residency without a national sponsor, and self-sponsorship for your family.\n\n**Investors.** A public investment of at least AED 2 million, or property holdings valued at AED 2 million or more, is the most common route.\n\n**Entrepreneurs.** Founders of a company valued at AED 500,000 or more, with approval from an accredited business incubator or auditor, can qualify.\n\n**Specialised talent.** Doctors, scientists, engineers, executives and creatives with recognised credentials and a qualifying salary are eligible on merit rather than capital.\n\nThe application is document-heavy but linear. Most rejections come from valuation evidence that does not satisfy the authority, which is why we prepare the file before submitting anything." }
];