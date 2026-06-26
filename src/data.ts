import { PitchSlide, RoadmapPhase, TeamMember, TestimonialStorefront } from "./types";

export const PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    category: "INTRODUCTION",
    title: "ValueAfrica Innovation Hub",
    subtitle: "Africa's premium digital gateway connecting authentic indigenous producers directly with the global consumer market.",
    points: [
      "Registered with Nigeria's Corporate Affairs Commission (CAC).",
      "Unified e-commerce marketplace celebrating cultural heritage.",
      "Headquartered in Abuja, serving creators across the African continent."
    ],
    graphicType: "values",
    metric: {
      value: "10,000+",
      label: "Vendors Scaled Strategy (3 Years)"
    }
  },
  {
    id: 2,
    category: "THE PROBLEM & GAP",
    title: "The Fragmented African Commerce",
    subtitle: "Artisans, SMEs, and farmers are rich in culture and product, yet completely isolated from global consumer volume.",
    points: [
      "Zero global visibility and lack of authentic packaging standards.",
      "Inability to handle secure cross-border payment escrow protection.",
      "Opaque customs, compliance roadblocks, and high international shipping costs."
    ],
    graphicType: "opportunity",
    metric: {
      value: "80%",
      label: "African SMEs Isolated from Direct Global Sales"
    }
  },
  {
    id: 3,
    category: "OUR ONE-STOP SOLUTION",
    title: "The ValueAfrica Marketplace Infrastructure",
    subtitle: "We combine e-commerce visibility, secure escrow financial safeguards, and verified physical shipping pipelines into one system.",
    points: [
      "Online storefronts customized instantly for indigenous craftsmen and farmers.",
      "Escrow transaction system preventing fraud for buyers and sellers.",
      "Abuja logistics hub providing standardized shipping prep & export verification."
    ],
    graphicType: "solution",
    metric: {
      value: "100%",
      label: "Escrow Protected Global Transactions"
    }
  },
  {
    id: 4,
    category: "PRODUCTS & MULTI-EARNING CHANNELS",
    title: "Sustainable Business Model",
    subtitle: "A highly resilient combination of volume transactions, programmatic listings, and premium physical container export fees.",
    points: [
      "Commission Fees: 5% to 15% transactional fees on general marketplace sales.",
      "Vendor Premium Tiers: Subscriptions for analytics, marketing, and photo support.",
      "Logistics & Freight Margins: Export facilitation and Abuja processing margins."
    ],
    graphicType: "financials",
    metric: {
      value: "5% - 15%",
      label: "General Transaction Commission Range"
    }
  },
  {
    id: 5,
    category: "MARKET DYNAMICS",
    title: "Capturing Global African Pride",
    subtitle: "Targeting distinct buyer sectors hungry for high-integrity, hand-crafted indigenous goods.",
    points: [
      "The Global African Diaspora: Actively seeking connection, garments, and heritage spices.",
      "Tourists & Global Wholesalers: Needing reliable channels, certificates of origin, and high standards.",
      "B2B Retailers: Looking for consistent volume supply from ethical and fair trade farmers."
    ],
    graphicType: "market",
    metric: {
      value: "$3B+",
      label: "Addressable African Heritage Trade Potential"
    }
  },
  {
    id: 6,
    category: "THE STRATEGIC ROADMAP",
    title: "Milestone-driven Growth Plan",
    subtitle: "Phased rollout starting in Nigeria, followed by West & East African trade corridors, and global export nodes.",
    points: [
      "Months 0-3: Set up Abuja Headquarters, launch pilot e-commerce catalog.",
      "Months 3-6: Scale with intense offline drives onboarding 500 handpicked vendors.",
      "Months 6-12: Launch dedicated mobile apps, expand into neighboring regional corridors.",
      "Years 1-3: Establish certified international warehouses and trade pipelines."
    ],
    graphicType: "roadmap",
    metric: {
      value: "4 Phases",
      label: "Milestone-Driven Lower-Risk Framework"
    }
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    phase: "Phase 1 - Setup",
    title: "Corporate Setup & Pilot Launch",
    timeline: "Months 0-3",
    color: "emerald",
    activities: [
      "Secure comprehensive Abuja headquarters setup.",
      "Deploy optimized, mobile-responsive MVP e-commerce marketplace.",
      "Initiate Abuja regional corporate partnership drives."
    ],
    metrics: [
      "100% Core system audit complete",
      "Headquarters operational in Abuja",
      "CAC registration completed successfully"
    ]
  },
  {
    id: 2,
    phase: "Phase 2 - Vendor Launch",
    title: "SME Onboarding & Domestic Traction",
    timeline: "Months 3-6",
    color: "amber",
    activities: [
      "Deploy custom vendor dashboard and verification processes.",
      "Conduct training workshops for packaging & photography support.",
      "Target onboarding of 500 premium curated indigenous vendors."
    ],
    metrics: [
      "500+ Verified vendors live on storefront",
      "Launched secure escrow & seller payouts",
      "50+ Virtual product exhibitions hosted"
    ]
  },
  {
    id: 3,
    phase: "Phase 3 - Market Growth",
    title: "Pan-African Corridors & Native Mobile App",
    timeline: "Months 6-12",
    color: "amber",
    activities: [
      "Optimize logistics hubs in alternative high-volume West/East African states.",
      "Release Phase 2 iOS and Android high-performance e-commerce apps.",
      "Structure multi-tier premium seller subscriptions."
    ],
    metrics: [
      "App Store & Play Store releases completed",
      "Activate regional border logistics corridors",
      "Achieve $150K monthly platform volume"
    ]
  },
  {
    id: 4,
    phase: "Phase 4 - Global Export",
    title: "Global Export Warehousing & Cargo Partners",
    timeline: "Year 1-3",
    color: "emerald",
    activities: [
      "Secure certified compliance international customs warehouses.",
      "Launch integrated cargo booking options on seller panels.",
      "Onboard 10,000 pan-African vendors onto the shared platform."
    ],
    metrics: [
      "10,000+ Total sellers across multiple nations",
      "Export certified customs fast-track channels active",
      "Key distribution points scaled in EU & North America"
    ]
  }
];

export const THE_TEAM: TeamMember[] = [
  {
    id: 1,
    role: "CEO / Founder",
    iconName: "Briefcase",
    description: "Leads strategic vision, luxury cultural branding, Abuja government relations, and global investor pipelines."
  },
  {
    id: 2,
    role: "CTO & Developers",
    iconName: "Cpu",
    description: "Engineers our mobile-responsive web catalog, highly secure escrow system, and the AI-driven item recommendation pipeline."
  },
  {
    id: 3,
    role: "Operations Manager",
    iconName: "Layers",
    description: "Supervises day-to-day warehouse collection nodes, quality controls, and employee resource scheduling in Abuja."
  },
  {
    id: 4,
    role: "Vendor Acquisition Team",
    iconName: "Users",
    description: "Active offline local agent force identifying, vetting, and training indigenous crop farmers, weavers, and fashion designers."
  },
  {
    id: 5,
    role: "Logistics Lead & Customer Support",
    iconName: "Globe",
    description: "Manages container handling, domestic dispatchers, customs fast-track entries, and holds customer help center SLA."
  },
  {
    id: 6,
    role: "Marketing & PR Lead",
    iconName: "Megaphone",
    description: "Targets global diaspora buyers, coordinates virtual product showcase fairs, and scales programmatic search placement."
  },
  {
    id: 7,
    role: "Finance & Admin",
    iconName: "Wallet",
    description: "Ensures legal and tax standards, balances client escrow assets, and pays out vendor revenue cleanly."
  }
];

export const SIMULATED_PRODUCTS: TestimonialStorefront[] = [
  {
    id: 1,
    productName: "Premium Handwoven Abuja Aso-Oke Fabric",
    origin: "Abuja, Nigeria",
    vendorName: "Bamikole Heritage Weavers",
    priceUSD: 85,
    imageKeyword: "aso-oke woven textile fabric close up",
    tags: ["Textiles", "Fashion", "Artisanal"],
    imageUrl: "/src/assets/images/aso_oke_fabric_1781966653030.jpg"
  },
  {
    id: 2,
    productName: "Organic Cold-Pressed West African Shea Butter",
    origin: "Tamale, Ghana",
    vendorName: "Yaa Asantewaa Women's Co-Op",
    priceUSD: 24,
    imageKeyword: "shea butter jar skin product",
    tags: ["Agric", "Skincare", "Fair Trade"],
    imageUrl: "/src/assets/images/shea_butter_jar_1781966668002.jpg"
  },
  {
    id: 3,
    productName: "Authentic Sun-Dried Nigerian Cameroon Pepper",
    origin: "Calabar, Nigeria",
    vendorName: "Noble Soil Spice Mill",
    priceUSD: 18,
    imageKeyword: "red hot dried peppers bowl",
    tags: ["Agric", "Spices", "Export Craft"],
    imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    productName: "Hand-Carved Ebony Wood Benin Warrior Mask",
    origin: "Benin City, Nigeria",
    vendorName: "Osa-Idubor Fine Carvings",
    priceUSD: 140,
    imageKeyword: "african tribal wood carving sculpture",
    tags: ["Crafts", "Artisanal", "Heritage"],
    imageUrl: "/src/assets/images/benin_warrior_mask_1781966682840.jpg"
  },
  {
    id: 5,
    productName: "High-Grade Industrial Raw Kaolin Clay (Bulk)",
    origin: "Kogi State, Nigeria",
    vendorName: "Abuja Mineral Synergy Group",
    priceUSD: 1250,
    imageKeyword: "white powder heap mineral clay",
    tags: ["Solid Minerals", "Industrial", "Export Craft"],
    imageUrl: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    productName: "Premium Cut Blue Tourmaline & Smoky Quartz Crystals",
    origin: "Bauchi, Nigeria",
    vendorName: "Plateau Gems & Lapidary",
    priceUSD: 450,
    imageKeyword: "sparkling gemstones rough crystal",
    tags: ["Solid Minerals", "Heritage", "Premium Handcrafted"],
    imageUrl: "/src/assets/images/bauchi_tourmaline_gems_1781966697507.jpg"
  },
  {
    id: 7,
    productName: "Custom Localized E-Commerce Cargo APIs & SaaS",
    origin: "Abuja Hub Direct",
    vendorName: "ValueAfrica Tech Lab",
    priceUSD: 95,
    imageKeyword: "software code interface developer dashboard",
    tags: ["Tech", "SaaS", "Digital Services"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    productName: "SME Co-Working Hot Desk & Hub Workspace Pass",
    origin: "FCT Abuja Headquarters",
    vendorName: "ValueAfrica Shared Spaces",
    priceUSD: 30,
    imageKeyword: "modern co-working office space hub",
    tags: ["Tech", "Real Estate"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 9,
    productName: "Abuja Micro-Deed Premium Warehousing Co-Share",
    origin: "FCT Abuja Logistics Node",
    vendorName: "Abuja Realty Developers",
    priceUSD: 3500,
    imageKeyword: "large industrial warehouse cargo boxes",
    tags: ["Real Estate", "Industrial"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 10,
    productName: "Agro-Processing Arable Fertile Land Share - Abuja",
    origin: "Kwali, Federal Capital Territory",
    vendorName: "ValueAfrica Land Custodians",
    priceUSD: 1800,
    imageKeyword: "agricultural lush green farm land",
    tags: ["Real Estate", "Agric"],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80"
  }
];
