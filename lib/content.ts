/* ============================================================
   ORWOOD — site content
   Single source of truth for navigation, services, projects, etc.
   Copy here is brand-representative placeholder for the redesign —
   swap with real figures, projects, and contact details before launch.
   ============================================================ */

export const site = {
  name: "ORWOOD",
  tagline: "Finishing & Furnishing",
  promise: "To be a part of every project.",
  since: 2004,
  description:
    "ORWOOD is a global interior fit-out atelier — design, build, joinery and FF&E delivered as one seamless project.",
  email: "hello@orwood.com",
  phone: "+90 212 000 00 00",
  whatsapp: "905320000000", // placeholder — swap for the real WhatsApp business number
  address: {
    line1: "Atelier & Production",
    line2: "İkitelli OSB, Başakşehir",
    city: "İstanbul, Türkiye",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
};

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Fuller sitemap for the footer (superset of the primary nav). */
export const siteLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Manufacturing & Joinery", href: "/manufacturing" },
  { label: "Process", href: "/process" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "İstanbul", href: "/istanbul" },
  { label: "Insights / Journal", href: "/journal" },
  { label: "ORWOOD Doors", href: "/orwood-doors" },
  { label: "Resources & Downloads", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 20, suffix: "", label: "Years of craft" },
  { value: 200, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "", label: "Countries" },
  { value: 50, suffix: "K", label: "Items produced" },
];

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  capabilities: string[];
  tone: number;
  /** Optional extended body paragraphs for the dedicated service page. */
  body?: string[];
};

export const services: Service[] = [
  {
    id: "design-build",
    index: "01",
    title: "Design & Build",
    summary:
      "One accountable team from first sketch to final handover — concept, technical detail, and on-site delivery under a single roof.",
    detail:
      "We translate an idea into a buildable interior, then build it. Architecture, MEP coordination, materials and programme are held together by one project team so nothing is lost in the handovers.",
    capabilities: [
      "Concept & spatial design",
      "Technical documentation",
      "Programme & cost control",
      "Turnkey site delivery",
    ],
    tone: 0,
  },
  {
    id: "ffe",
    index: "02",
    title: "FF&E Procurement",
    summary:
      "Furniture, fixtures and equipment — specified, sourced and installed to the millimetre of the design intent.",
    detail:
      "From a single signature piece to the full fit-out of a 300-key hotel, we manage specification, procurement, logistics and installation so the space arrives exactly as drawn.",
    capabilities: [
      "Specification & sampling",
      "Global procurement",
      "Logistics & warehousing",
      "Installation & snagging",
    ],
    tone: 1,
  },
  {
    id: "furniture-solutions",
    index: "03",
    title: "Furniture Solutions",
    summary:
      "Contract-grade furniture, manufactured in our own workshops to survive the wear of public, commercial and hospitality life.",
    detail:
      "Bespoke and series production engineered for daily use. We prototype, test and finish in-house, holding tolerance and quality across volume runs.",
    capabilities: [
      "Bespoke manufacture",
      "Series production",
      "Upholstery & finishing",
      "Prototyping & testing",
    ],
    tone: 2,
  },
  {
    id: "joinery",
    index: "04",
    title: "Joinery & Manufacturing",
    summary:
      "Bespoke joinery where the wood meets the wall — the panelling, reception desks and fitted detail that define a room.",
    detail:
      "Our joiners work to architectural drawings and tighter ones of our own. Veneers, solids and composites are matched, machined and hand-finished for a flawless line.",
    capabilities: [
      "Architectural panelling",
      "Bespoke cabinetry",
      "Veneer matching",
      "Hand finishing",
    ],
    tone: 3,
  },
  {
    id: "doors",
    index: "05",
    title: "Fire Rated Doors",
    summary:
      "Our proprietary door system — acoustic, fire-rated and beautifully finished, engineered as a product, not a one-off.",
    detail:
      "A complete door programme: leaf, frame, ironmongery and finish, certified for acoustic and fire performance and made to repeat across an entire building.",
    capabilities: [
      "Acoustic & fire ratings",
      "Frame & ironmongery",
      "Veneer & lacquer finishes",
      "Project-scale supply",
    ],
    tone: 4,
  },
  {
    id: "interior-fit-out",
    index: "06",
    title: "Interior Fit-Out",
    summary:
      "Complete interior construction — partitions, ceilings, flooring and M&E, coordinated and delivered as one managed scope.",
    detail:
      "We carry the full physical build of an interior from stripped shell to finished space. Every trade — drylining, flooring, painting, M&E — is sequenced and quality-checked by our own site teams.",
    capabilities: [
      "Shell-to-finish delivery",
      "Multi-trade coordination",
      "M&E integration",
      "Quality assurance on site",
    ],
    tone: 5,
  },
  {
    id: "value-engineering",
    index: "07",
    title: "Value Engineering",
    summary:
      "Cost-conscious design development that protects the intent — finding the right detail at the right price before it reaches the workshop.",
    detail:
      "Because our design studio and workshops share the same building, we can test what a detail costs to make as we draw it. Value engineering starts at the sketch, not as a late-stage cut — so the scheme that opens is the scheme that was drawn.",
    capabilities: [
      "Early-stage cost modelling",
      "Material & detail alternatives",
      "Specification rationalisation",
      "Budget protection",
    ],
    tone: 0,
  },
  {
    id: "project-management",
    index: "08",
    title: "Project Management",
    summary:
      "Programme, cost and quality held by one accountable team from mobilisation to handover — the discipline that keeps everything else on track.",
    detail:
      "Our project managers own the programme, the budget and the interface between every trade. They sit between the client, the design team and the workshops so decisions are made once and carried through.",
    capabilities: [
      "Programme & scheduling",
      "Cost control & reporting",
      "Risk & change management",
      "Client-side representation",
    ],
    tone: 1,
  },
];

export type Sector = {
  id: string;
  title: string;
  blurb: string;
  tone: number;
  lead: string;
  offer: string[];
};

export const sectors: Sector[] = [
  {
    id: "hospitality",
    title: "Hospitality",
    blurb:
      "Hotels, resorts, restaurants and spas where the interior is the experience — built to perform under constant use.",
    tone: 0,
    lead: "Hotels, resorts, restaurants and spas live or die on the interior. We design, make and install public realm and guestrooms that look considered on opening night and survive a decade of full occupancy.",
    offer: [
      "Lobbies, restaurants & bars",
      "Guestrooms & suites at scale",
      "Spa & wellness fit-out",
      "FF&E specification & procurement",
    ],
  },
  {
    id: "commercial",
    title: "Commercial",
    blurb:
      "Workplaces, lobbies and retail that carry a brand — environments designed to be lived in nine hours a day.",
    tone: 1,
    lead: "Workplaces and commercial interiors carry a brand and take a beating. We deliver headquarters, lobbies and showrooms as turnkey fit-outs, coordinated to a single move-in date.",
    offer: [
      "Headquarters & workplace",
      "Reception & lobby joinery",
      "Meeting & amenity spaces",
      "Contract furniture, made in-house",
    ],
  },
  {
    id: "residential",
    title: "Residential",
    blurb:
      "Private homes and developments where craft is felt in the detail — the close, quiet quality of a made object.",
    tone: 5,
    lead: "Private homes and branded residences are judged up close. Our joinery and furniture are finished to the tolerance of a made object — panelling, libraries, kitchens and dressing rooms.",
    offer: [
      "Bespoke joinery & millwork",
      "Kitchens, wardrobes & libraries",
      "Curated FF&E packages",
      "Acoustic & fire-rated doors",
    ],
  },
  {
    id: "retail",
    title: "Retail",
    blurb:
      "Stores and showrooms where the fit-out is the brand — precise, repeatable and built for the shop floor.",
    tone: 2,
    lead: "Retail interiors have to read as the brand and repeat across locations without losing the finish. We manufacture and roll out store and showroom environments to an exact, repeatable specification.",
    offer: [
      "Flagship & showroom fit-out",
      "Display joinery & millwork",
      "Roll-out across locations",
      "Bespoke fixtures & furniture",
    ],
  },
  {
    id: "food-beverage",
    title: "F&B",
    blurb:
      "Restaurants, cafés and bars where atmosphere and durability have to meet — designed and built as one.",
    tone: 4,
    lead: "Restaurants, cafés and bars need atmosphere that survives a full service, every service. We design and build F&B interiors where the millwork, furniture and finishes are engineered for heavy, daily use.",
    offer: [
      "Restaurant & bar interiors",
      "Bespoke seating & banquettes",
      "Counter & back-of-house joinery",
      "Durable, characterful materials",
    ],
  },
  {
    id: "mixed-use",
    title: "Mixed-use",
    blurb:
      "Large developments with many interiors at once — held to one standard, one programme and one team.",
    tone: 3,
    lead: "Mixed-use developments combine hospitality, retail, workplace and residential in a single scheme. We carry whole interior packages across them — one standard, one programme, one accountable team.",
    offer: [
      "Multi-asset interior packages",
      "Amenity & shared-space fit-out",
      "Programme & logistics at scale",
      "Single-source manufacture & delivery",
    ],
  },
];

export type ProjectCertification = {
  label: string;
  standard?: string;
};

export type Project = {
  id: string;
  title: string;
  sector: "Hospitality" | "Commercial" | "Residential";
  location: string;
  year: string;
  scope: string;
  tone: number;
  /* — case study — */
  summary: string;
  size: string;
  services: string[];
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  gallery: number[];
  architect?: string;
  architectUrl?: string;
  /* — certifications & technical — */
  certifications?: ProjectCertification[];
  fireRating?: string;
  acousticRating?: string;
  referenceAvailable?: boolean;
};

export const projects: Project[] = [
  {
    id: "aram-hotel",
    title: "The Aram Hotel",
    sector: "Hospitality",
    location: "Doha, QA",
    year: "2024",
    scope: "Design & Build · FF&E",
    tone: 0,
    summary:
      "A 220-key waterfront hotel finished and furnished as one project — from the lobby joinery to the last guestroom chair.",
    size: "220 keys · 18,400 m²",
    services: [
      "Design & Build",
      "FF&E Procurement",
      "Joinery & Manufacturing",
      "Fire Rated Doors",
    ],
    overview:
      "ORWOOD delivered the public areas and guestrooms of The Aram as a single turnkey scope — design development, manufacture and on-site installation held under one accountable team. The brief asked for a Gulf-modern interior that felt crafted rather than specified, and durable enough for a five-star operation.",
    challenge:
      "A compressed pre-opening programme left no room for the usual handover gaps between designer, contractor and supplier. Long-lead FF&E and bespoke joinery had to be engineered, made and shipped in parallel with the base build.",
    solution:
      "With design, our three workshops and procurement under single accountability, we ran manufacture against the construction programme rather than after it. A mock-up guestroom was signed off early, then repeated to tolerance across all 220 keys.",
    deliverables: [
      "Full FF&E specification, procurement & install",
      "Reception, bar & restaurant joinery",
      "220 guestrooms to a repeatable detail",
      "Acoustic & fire-rated door sets",
      "Snagging, commissioning & handover",
    ],
    gallery: [0, 2, 5, 1],
    architect: "LW Design Group",
    architectUrl: "https://lwdesigngroup.com",
    certifications: [
      { label: "ISO 9001:2015", standard: "Quality Management" },
      { label: "ISO 14001:2015", standard: "Environmental Management" },
      { label: "BS EN 1634-1", standard: "Fire resistance — door & shutter assemblies" },
      { label: "BS EN ISO 10140", standard: "Acoustic performance — laboratory measurement" },
    ],
    fireRating: "FD60 (60-minute integrity)",
    acousticRating: "Rw 35 dB",
    referenceAvailable: true,
  },
  {
    id: "lumen-offices",
    title: "Lumen Offices",
    sector: "Commercial",
    location: "Dubai, AE",
    year: "2023",
    scope: "Turnkey Interiors",
    tone: 2,
    summary:
      "A grade-A workplace delivered ready to occupy — every trade, finish and piece of furniture coordinated to one move-in date.",
    size: "9,600 m² · 4 floors",
    services: [
      "Turnkey Interiors",
      "Interior Fit-Out",
      "FF&E Procurement",
      "Project Management",
    ],
    overview:
      "A turnkey fit-out across four floors for a regional headquarters — reception, workspace, meeting suites and staff amenities, handed over commissioned and complete.",
    challenge:
      "The tenant needed a single point of accountability and a fixed completion date, with no tolerance for the finger-pointing that stalls multi-contractor fit-outs.",
    solution:
      "One ORWOOD team carried design intent through to installation, sequencing joinery, furniture and MEP so the floors completed in a rolling handover the client could occupy in stages.",
    deliverables: [
      "Reception & client-facing joinery",
      "Open-plan & meeting-suite fit-out",
      "Workplace furniture, specified & installed",
      "MEP coordination & commissioning",
      "Phased handover to a fixed date",
    ],
    gallery: [2, 5, 1, 0],
    architect: "Roar Studio",
    architectUrl: "https://roar.studio",
    certifications: [
      { label: "ISO 9001:2015", standard: "Quality Management" },
      { label: "ISO 14001:2015", standard: "Environmental Management" },
    ],
    referenceAvailable: true,
  },
  {
    id: "maren-residence",
    title: "Maren Residence",
    sector: "Residential",
    location: "İstanbul, TR",
    year: "2024",
    scope: "Joinery · FF&E",
    tone: 4,
    summary:
      "A private residence where the cabinetry, panelling and furniture were drawn, made and fitted by the same hands.",
    size: "640 m² · private residence",
    services: ["Joinery & Manufacturing", "FF&E Procurement", "Furniture Solutions"],
    overview:
      "Bespoke joinery and a curated FF&E package for a family home — wall panelling, a library, dressing rooms and kitchen — finished to the close tolerance of furniture rather than fit-out.",
    challenge:
      "Domestic-scale detail at a furniture-grade finish: visible end-grain, matched veneers and shadow gaps that leave nowhere for a millimetre to hide.",
    solution:
      "Every run was prototyped and dry-assembled in the workshop before site, so installation was a matter of fitting finished pieces, not making them in place.",
    deliverables: [
      "Full-height panelling & library joinery",
      "Dressing rooms & fitted wardrobes",
      "Bespoke kitchen & utility",
      "Curated loose-furniture package",
      "Hand-finished on site",
    ],
    gallery: [4, 5, 2, 1],
    architect: "Escapefromsofa",
    architectUrl: "https://escapefromsofa.com",
    certifications: [
      { label: "ISO 9001:2015", standard: "Quality Management" },
    ],
    referenceAvailable: true,
  },
  {
    id: "solis-resort",
    title: "Solis Resort & Spa",
    sector: "Hospitality",
    location: "Bodrum, TR",
    year: "2023",
    scope: "Design & Build",
    tone: 1,
    summary:
      "A coastal resort and spa designed and built as one scope — interiors that hold up to sun, salt and a full season.",
    size: "140 keys · resort & spa",
    services: [
      "Design & Build",
      "Interior Fit-Out",
      "Joinery & Manufacturing",
      "FF&E Procurement",
    ],
    overview:
      "ORWOOD took the resort's public realm and spa from concept through delivery — restaurants, lobby, treatment rooms and suites — in a single design-build appointment.",
    challenge:
      "A seasonal opening date and an exposed coastal environment demanded materials and details engineered for heavy use and weather, without losing the relaxed luxury of the brief.",
    solution:
      "We value-engineered finishes for durability early, prototyped the key millwork, and manufactured off-site to protect the programme through a busy construction window.",
    deliverables: [
      "Lobby, restaurant & bar interiors",
      "Spa & treatment-room fit-out",
      "Suite joinery & FF&E",
      "Durable, weather-considered palette",
      "Turnkey handover before season",
    ],
    gallery: [1, 5, 0, 2],
    architect: "Godwin Austen Johnson",
    architectUrl: "https://gaj.com",
    certifications: [
      { label: "ISO 9001:2015", standard: "Quality Management" },
      { label: "ISO 14001:2015", standard: "Environmental Management" },
    ],
    referenceAvailable: true,
  },
  {
    id: "northbank-hq",
    title: "Northbank HQ",
    sector: "Commercial",
    location: "Riyadh, SA",
    year: "2024",
    scope: "Furniture Solutions",
    tone: 3,
    summary:
      "Contract-grade furniture, manufactured in our own workshops, for a corporate headquarters built to be used hard.",
    size: "12,000 m² · headquarters",
    services: ["Furniture Solutions", "FF&E Procurement", "Value Engineering"],
    overview:
      "A full contract-furniture package for a headquarters — workstations, executive, lounge and dining — prototyped, tested and produced in series to a single specification.",
    challenge:
      "Volume without variance: hundreds of pieces that had to match in finish and survive years of daily corporate use.",
    solution:
      "In-house prototyping and testing locked the specification before a series run; our own upholstery and finishing held tolerance across the full quantity.",
    deliverables: [
      "Workstation & task seating",
      "Executive & boardroom furniture",
      "Lounge & breakout pieces",
      "Prototype, test & series production",
      "Delivery & install across floors",
    ],
    gallery: [3, 1, 5, 2],
    architect: "Omrania",
    architectUrl: "https://omrania.com",
    certifications: [
      { label: "ISO 9001:2015", standard: "Quality Management" },
    ],
    referenceAvailable: true,
  },
  {
    id: "cedar-house",
    title: "Cedar House",
    sector: "Residential",
    location: "London, UK",
    year: "2022",
    scope: "Joinery · Doors",
    tone: 5,
    summary:
      "A London townhouse fitted with bespoke joinery and a complete set of acoustic, fire-rated doors.",
    size: "5 storeys · townhouse",
    services: ["Joinery & Manufacturing", "Fire Rated Doors", "Furniture Solutions"],
    overview:
      "Across five storeys, ORWOOD supplied the joinery and a full programme of ORWOOD door sets — leaf, frame, ironmongery and finish — certified and finished to match the interior.",
    challenge:
      "Heritage proportions and modern performance: doors that meet acoustic and fire ratings while reading as flush, veneer-matched joinery.",
    solution:
      "We engineered the door programme as a product — repeatable across the house — and veneer-matched it to the adjacent millwork so the performance never showed.",
    deliverables: [
      "Acoustic & fire-rated door sets",
      "Staircase & hall joinery",
      "Fitted storage & wardrobes",
      "Veneer-matched finishes",
      "Supply, install & snag",
    ],
    gallery: [5, 1, 4, 2],
    architect: "Studio Mackereth",
    architectUrl: "https://studiomackereth.com",
    certifications: [
      { label: "ISO 9001:2015", standard: "Quality Management" },
      { label: "BS EN 1634-1", standard: "Fire resistance — door & shutter assemblies" },
      { label: "BS EN ISO 10140", standard: "Acoustic performance — laboratory measurement" },
      { label: "BS 476-22", standard: "Fire resistance — non-loadbearing elements" },
    ],
    fireRating: "FD30 / FD60 (30- and 60-minute integrity)",
    acousticRating: "Rw 32–38 dB",
    referenceAvailable: true,
  },
];

/* ─────────────────────── Resources / Downloads ─────────────────────── */

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: "Certification" | "Technical" | "Corporate" | "Qualification";
  format: string;
};

export const resources: Resource[] = [
  {
    id: "iso-9001-certificate",
    title: "ISO 9001:2015 Certificate",
    description:
      "Quality management system certification covering design, manufacture, and installation of interior fit-out, joinery, and furniture.",
    category: "Certification",
    format: "PDF",
  },
  {
    id: "iso-14001-certificate",
    title: "ISO 14001:2015 Certificate",
    description:
      "Environmental management system certification for sustainable manufacturing and site operations.",
    category: "Certification",
    format: "PDF",
  },
  {
    id: "fire-test-report-fd30-fd60",
    title: "Fire Test Report — FD30 & FD60 Door Sets",
    description:
      "Accredited test report to BS EN 1634-1 covering ORWOOD fire-rated door assemblies at 30- and 60-minute integrity ratings.",
    category: "Technical",
    format: "PDF",
  },
  {
    id: "acoustic-test-report",
    title: "Acoustic Performance Report",
    description:
      "Laboratory test results to BS EN ISO 10140 for ORWOOD door sets, demonstrating Rw 32–38 dB sound reduction.",
    category: "Technical",
    format: "PDF",
  },
  {
    id: "company-profile",
    title: "ORWOOD Company Profile",
    description:
      "Overview of capabilities, manufacturing facilities, project references, and key personnel — suitable for PQQ submissions.",
    category: "Corporate",
    format: "PDF",
  },
  {
    id: "pqq-qualification-pack",
    title: "Pre-Qualification Questionnaire (PQQ) Pack",
    description:
      "Standard qualification pack including insurance certificates, H&S policy summary, references, and certification copies.",
    category: "Qualification",
    format: "PDF",
  },
  {
    id: "product-datasheet-fire-doors",
    title: "Product Datasheet — Fire Rated Doors",
    description:
      "Technical datasheet covering specifications, performance ratings, available configurations, and finish options for ORWOOD door sets.",
    category: "Technical",
    format: "PDF",
  },
  {
    id: "sustainability-statement",
    title: "Sustainability & Environmental Statement",
    description:
      "ORWOOD’s approach to responsible sourcing, waste management, and carbon reduction across manufacturing and site operations.",
    category: "Corporate",
    format: "PDF",
  },
];

/** Group a project into a sales region from its location's country code. */
export function projectRegion(p: Project): string {
  const cc = p.location.split(",").pop()?.trim().toUpperCase() ?? "";
  if (["QA", "AE", "SA", "KW", "BH", "OM"].includes(cc)) return "GCC";
  if (cc === "TR") return "Türkiye";
  return "UK & Europe";
}

export const sectorFilters = [
  "All",
  "Hospitality",
  "Commercial",
  "Residential",
] as const;

export type Group = {
  id: string;
  name: string;
  role: string;
  note: string;
};

export const group: Group[] = [
  {
    id: "hi-mobilya",
    name: "Hi Mobilya",
    role: "Manufacturing",
    note: "Our furniture production house — machinery, upholstery and finishing at series scale.",
  },
  {
    id: "siladu",
    name: "SILADU",
    role: "Materials & Surfaces",
    note: "Surface, veneer and material development — the palette behind every ORWOOD interior.",
  },
  {
    id: "orwood-doors",
    name: "ORWOOD Doors",
    role: "Door Systems",
    note: "A dedicated programme for acoustic and fire-rated door systems at building scale.",
  },
];

export const manufacturing = {
  intro:
    "Owning our workshops is the difference between specifying a detail and guaranteeing it. Furniture, joinery and doors are engineered, made, tested and finished in-house — so quality and programme stay in our hands, not a supplier's queue.",
  capabilities: [
    {
      title: "CNC Technology",
      body: "CNC machining for repeatable precision across volume runs — panels, carcasses and components cut to tolerance.",
      tone: 0,
    },
    {
      title: "Production Facilities",
      body: "Dedicated furniture and joinery lines with the capacity to take a 300-key hotel or a full headquarters from prototype to series.",
      tone: 2,
    },
    {
      title: "Quality Control",
      body: "Prototyping, testing and inspection at every stage — nothing ships before it is checked against the specification.",
      tone: 4,
    },
    {
      title: "Material Expertise",
      body: "Veneers, solids, surfaces and composites matched and developed in-house through SILADU, our materials house.",
      tone: 5,
    },
    {
      title: "Joinery Excellence",
      body: "Master joiners working to architectural drawings and tighter ones of our own, hand-finishing for a flawless line.",
      tone: 1,
    },
  ],
};

export const values = [
  {
    index: "01",
    title: "One team, one number",
    body: "Design, manufacture and delivery sit in the same building. The client gets a single point of accountability instead of a chain of suppliers passing blame.",
  },
  {
    index: "02",
    title: "Made, not just specified",
    body: "We own our workshops. When a detail has to be right, we can prototype it, test it and remake it — without waiting on anyone else's queue.",
  },
  {
    index: "03",
    title: "Built to be used",
    body: "Hospitality and commercial interiors take a beating. Everything we make is engineered for the tenth year, not the opening photograph.",
  },
  {
    index: "04",
    title: "Part of every project",
    body: "From a lobby to an entire resort, our ambition is the same: to be the team a client wants in the room for whatever they build next.",
  },
];

export const process = [
  {
    index: "01",
    title: "Discovery",
    body: "We start with the brief, the budget and the date — and the constraints behind them that nobody wrote down.",
  },
  {
    index: "02",
    title: "Design Development",
    body: "Concept, materials and technical detail develop together, costed as they go, until the design is buildable and signed off.",
  },
  {
    index: "03",
    title: "Engineering",
    body: "We engineer every element for manufacture and compliance — shop drawings, tolerances, and acoustic and fire performance.",
  },
  {
    index: "04",
    title: "Manufacturing",
    body: "Furniture, joinery and doors are made in our own workshops, prototyped and quality-checked before anything ships.",
  },
  {
    index: "05",
    title: "Procurement",
    body: "FF&E is specified, sourced and consolidated — logistics, lead times and warehousing managed against the programme.",
  },
  {
    index: "06",
    title: "Installation",
    body: "Our teams install and coordinate every trade on site, holding the detail and the date through to completion.",
  },
  {
    index: "07",
    title: "Handover",
    body: "We commission, snag and hand over an interior that's ready to open on the day it was promised.",
  },
];

export type ArticleCTA = {
  label: string;
  href: string;
  description: string;
};

export type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  tone: number;
  body: string[];
  /** Optional mid-funnel CTA matched to the reader's stage. */
  cta?: ArticleCTA;
};

export const journal: Article[] = [
  {
    id: "why-istanbul-for-hospitality-fit-out-manufacturing",
    title:
      "Why İstanbul? The case for manufacturing hospitality interiors in Turkey",
    category: "Manufacturing",
    date: "June 2026",
    readingTime: "5 min read",
    excerpt:
      "İstanbul sits at the crossroads of Europe and the Gulf — a city with deep craft traditions, modern production capacity, and direct shipping access to every market where five-star hotels are being built.",
    tone: 2,
    body: [
      "When a hospitality developer in Doha, Dubai, or Riyadh shortlists fit-out partners, the field is dominated by contractors with offices in the Gulf. What often goes unexamined is where the furniture, joinery, and doors are actually made. For many of those contractors, the answer is the same: Turkey. The difference is whether the firm owns the factory or simply places an order with one.",
      "ORWOOD has manufactured in İstanbul since 2004. Our production facilities in İkitelli — one of the city's established industrial districts — house three dedicated operations: Hi Mobilya for bespoke and contract furniture, SILADU for surface and veneer development, and ORWOOD Doors for our proprietary acoustic and fire-rated door systems. These are not subcontracted workshops. They are owned facilities, staffed by our own machinists, joiners, and finishing teams, running CNC lines alongside hand-finishing benches.",
      "İstanbul's advantage for hospitality manufacturing is structural, not incidental. The city has a centuries-old woodworking and furniture-making tradition — the labour pool includes skilled craftspeople whose training is generational, not just vocational. Modern investment has layered CNC technology, automated finishing lines, and quality-management systems on top of that craft base. The result is production that can hold furniture-grade tolerances at the volume a 300-key hotel demands.",
      "Geography matters as much as capability. İstanbul is a two-hour flight from Dubai and four hours from London — the two cities where most Gulf and European hospitality projects are conceived. Shipping from Turkish ports to Doha, Abu Dhabi, or Jeddah is measured in days, not weeks. For projects in the UK and Europe, overland freight is viable. This logistical position means ORWOOD can run manufacture against a construction programme rather than ahead of it, compressing the gap between sign-off and installation.",
      "Cost is part of the calculation, but it is not the whole of it. Turkish production costs sit below Western European levels and above Far Eastern ones — a middle ground that reflects the quality of the labour, not a race to the bottom. For a hotel operator specifying bespoke joinery, matched veneers, and certified fire-rated door sets, the question is not where the cheapest unit comes from. It is where the unit that matches the sample, meets the standard, and arrives on programme comes from. That is the question İstanbul answers well.",
      "What makes the ORWOOD model distinct is not simply being in İstanbul — many joinery houses are. It is that design, engineering, and manufacture happen in the same building. A detail drawn by our design studio is costed by our engineers, prototyped in our workshops, and finished by our own teams before it ships. There is no handoff to a third-party factory, no specification lost in translation between a Dubai office and an overseas supplier. The prototype you approve is the product you receive, at scale.",
      "For developers and operators building in the GCC, Turkey, or Europe, the manufacturing base matters more than the sales office. İstanbul gives ORWOOD proximity to every market we serve, access to a deep craft tradition, and the production infrastructure to deliver complete hotel interiors — furniture, joinery, doors, and FF&E — from a single, accountable source. That is why we manufacture here, and why the interiors we deliver carry the quality of a city that has been making things well for a very long time.",
    ],
  },
  {
    id: "fire-rated-doors-what-hotel-developers-need-to-know",
    title:
      "Fire-rated door sets: what hotel developers need to know before tender",
    category: "Fire Safety",
    date: "June 2026",
    readingTime: "5 min read",
    excerpt:
      "A fire-rated door is not a commodity line item — it is an assembly of leaf, frame, hardware, seals and certification that must work together or fail together. Getting the specification right at tender stage prevents costly substitutions later.",
    tone: 3,
    body: [
      "In hospitality fit-out, fire-rated doors sit at the intersection of life safety, building regulation, and interior design. They are specified on every hotel project, tested to international standards, and subject to authority approval before a building can open. Yet they are routinely treated as a procurement afterthought — a line item sourced late, from whichever supplier can meet the programme, with little scrutiny of how the complete assembly performs as a system.",
      "The consequences surface at the worst possible moment. A door leaf tested to BS 476 or EN 1634 is certified as part of a specific assembly: leaf, frame, intumescent seals, hinges, closer, lock, and glazing — if any. Change the closer to suit the architect's ironmongery schedule, swap the frame profile to save cost, or source the seals from a different manufacturer, and the certification may no longer apply. The door still looks like a fire-rated door. It may not perform like one when it matters.",
      "For a hotel developer, this is not a technical footnote. It is a programme risk and a liability exposure. Authorities having jurisdiction — whether Dubai Civil Defence, the UK Building Safety Regulator, or a local fire marshal — review door-set documentation before granting occupancy. If the installed assembly does not match the tested configuration, the sign-off stalls. If the mismatch is discovered after opening, the remediation cost and reputational damage are orders of magnitude higher than specifying correctly at the outset.",
      "The root cause is fragmentation. When the door leaf comes from one factory, the frame from another, the hardware from a schedule drawn by the architect, and the seals from whichever brand the installer prefers, nobody owns the assembly as a tested whole. Each component may carry its own certification, but the assembly — the thing that actually resists fire — has never been tested in that specific combination.",
      "Vertically integrated door-set manufacturing solves this by keeping the entire assembly under single accountability. At ORWOOD, our proprietary door system — ORWOOD Doors — is engineered, manufactured, and tested as a complete set: leaf, frame, seals, and specified hardware, produced in our Istanbul facilities and delivered to site as a certified unit. The test reports cover the assembly as built, not a theoretical combination of parts from different suppliers. When the authority reviews the documentation, the installed product matches the tested product.",
      "This matters most in markets where fire-safety enforcement is tightening. Across the GCC, post-Grenfell regulatory scrutiny has raised the bar for documentation and traceability. In the UK, the Building Safety Act has introduced personal accountability for product compliance. Hotel operators with international portfolios — brands that open in Dubai, London, and Doha within the same development cycle — need a door-set partner whose certification travels across jurisdictions, not one that must be re-sourced and re-approved market by market.",
      "For developers writing tender documents, the specification stage is where this is won or lost. A line item that reads 'fire-rated door, 60 minutes, to approval' invites substitution. A specification that names the assembly standard, requires a single-source manufacturer for leaf, frame, and seals, and demands a test report for the complete configuration as tendered — that is the specification that protects the programme and the occupants.",
      "The cost difference between a properly specified fire-rated door set and a lowest-bidder assembly is marginal on a per-unit basis. On a 300-key hotel with 400 or more rated openings, the aggregate cost of getting it wrong — failed inspections, programme delays, post-opening remediation — dwarfs the upfront saving. The door set is one of the few building components where the cheapest option is almost never the most economical one.",
    ],
    cta: {
      label: "Download our fire-rated door specification guide",
      href: "/contact?intent=specification-guide",
      description:
        "Get the ORWOOD Doors technical pack — assembly standards, test certifications, and specification language you can drop into your next tender document.",
    },
  },
  {
    id: "why-vertically-integrated-fit-out-delivers-better-hotels",
    title:
      "Why vertically integrated fit-out delivers better hotels",
    category: "Manufacturing",
    date: "June 2026",
    readingTime: "6 min read",
    excerpt:
      "When the studio that designs an interior also owns the factory that makes it, the gap between intent and reality closes — and the hotel operator is the one who benefits.",
    tone: 1,
    body: [
      "The luxury hospitality industry runs on a fragmented supply chain. A design studio draws the interior. A procurement house sources the furniture. A joinery contractor makes the fixed millwork. A fit-out firm installs everything. A separate specialist supplies the fire-rated doors. At each handoff, intent leaks — the veneer doesn't quite match the sample, the lead time slips because the factory prioritised another client, and the fire-rated door set arrives with hardware that doesn't suit the architect's ironmongery schedule.",
      "Vertically integrated fit-out eliminates these handoffs by keeping design, manufacturing, and installation under single accountability. At Orwood, this is not a slogan — it is an operational structure. Our Istanbul-based furniture manufacturing facility, Hi Mobilya, produces bespoke FF&E and contract furniture to the same tolerances as the joinery it sits beside. Our materials house, SILADU, develops and matches veneers, solids, and composites before they reach the workshop floor. And ORWOOD Doors — our proprietary fire-rated and acoustic door system — is engineered and manufactured in-house, tested to international fire-safety standards, and delivered as part of the same programme as the rest of the interior.",
      "For a hotel developer, this means one contract, one programme, and one team responsible for the gap between what was drawn and what was built. The value is not theoretical. When a 300-key hotel's FF&E, joinery, doors, and loose furniture are manufactured in coordinated production runs, the logistics compress. When the designer who specified a finish can walk onto the factory floor to approve it, the approval cycle shortens. When value engineering is done by the people who know what a detail costs to make — because they make it — the design is protected rather than stripped.",
      "The industry is moving toward this model because the alternative — assembling five contractors and hoping they coordinate — has a known failure rate. Delayed openings, mismatched finishes, and last-minute substitutions are not design failures. They are supply-chain failures, and they are solved by owning the supply chain.",
      "Orwood has operated this way for over twenty years, delivering complete interiors for hospitality, commercial, and luxury residential projects across the GCC, Türkiye, and Europe. The three manufacturing brands — Hi Mobilya for furniture, SILADU for materials, ORWOOD Doors for fire-rated and acoustic door systems — are not acquired bolt-ons. They were built to close the gap between design intent and what arrives on site.",
      "For owners and operators evaluating fit-out partners, the question is not whether a firm can design a beautiful interior. Most can. The question is whether they can manufacture and deliver it — on programme, at the specified quality, without surprises. That is what vertical integration answers.",
    ],
  },
  {
    id: "single-source-ffe-for-hotel-projects",
    title:
      "Single-source FF&E: what changes when one manufacturer owns the whole package",
    category: "FF&E Trends",
    date: "June 2026",
    readingTime: "6 min read",
    excerpt:
      "Hotel FF&E is typically assembled from dozens of suppliers across multiple countries. When one manufacturer makes the furniture, the joinery, and the doors, the savings are not just in cost — they are in programme, quality, and the gap between what was specified and what arrives on site.",
    tone: 3,
    body: [
      "On a typical 200-key hotel project, the FF&E package involves forty to sixty suppliers across half a dozen countries. A procurement house manages the specification. A trading company sources the loose furniture from factories in China or Vietnam. A European mill supplies the case goods. A local contractor handles the fixed joinery. A specialist provides the fire-rated door sets. Each supplier has its own lead time, its own quality standard, and its own idea of what 'to approval' means.",
      "The procurement team's job is to make this work — to consolidate shipping, align delivery dates, manage sample approvals across time zones, and hope that the finish on the bedside table, made in Guangdong, matches the finish on the wardrobe, made in Istanbul, and the finish on the door, made somewhere else entirely. When it works, it works. When it does not, the consequences land in the last eight weeks before opening, when there is no time or budget to fix them.",
      "Single-source FF&E manufacturing is a different model. In our Istanbul production campus, the furniture, the joinery, and the fire-rated doors for a hotel project are manufactured under one roof. Hi Mobilya makes the bespoke and contract furniture — beds, desks, seating, case goods — on dedicated production lines. The same veneer stock that SILADU matches for the furniture is used for the wall panelling and the fixed millwork. ORWOOD Doors produces the acoustic and fire-rated door sets — leaf, frame, seals, and specified hardware — as complete certified assemblies. The finish is matched once and held across every element, because every element comes from the same source.",
      "What this changes for a procurement team is specific. First, the approval cycle compresses. Instead of managing sample submissions from five factories, the procurement lead reviews a single mock-up room where the desk, the wardrobe, the panelling, and the door are shown together, in the same finish, under the same light. The approval is for the room, not the parts. Second, the logistics consolidate. Furniture, joinery, and doors ship from one origin, in one coordinated container plan, timed to the installation sequence — not as disconnected deliveries that arrive out of order and sit in a warehouse burning storage fees.",
      "Third — and this is the one that matters most on a compressed pre-opening programme — the manufacturing programme is unified. When the base build runs two weeks late, as it always does, a single manufacturer can re-sequence production across all elements in one decision. With five suppliers, that re-sequencing requires five separate negotiations, five revised shipping schedules, and the near certainty that at least one of them cannot accommodate the change. The result is partial deliveries, incomplete floors, and an installation team waiting for the one item that did not arrive.",
      "Quality is the less visible benefit, and the more durable one. When one team is responsible for the furniture, the millwork, and the doors, there is nowhere to hide a mismatch. The grain direction on a veneer panel cannot be blamed on 'the joinery subcontractor' when the joinery subcontractor is the same company that made the furniture beside it. Accountability concentrates, and with it, the incentive to get the detail right the first time.",
      "For hotel developers and operators working in the GCC, Türkiye, and Europe — the regions we deliver in — this model addresses a specific, recurring problem: the gap between the specified interior and the installed one. That gap is rarely a design failure. It is a supply-chain failure — too many handoffs, too many factories, too little shared accountability. Single-source manufacturing does not guarantee perfection. It guarantees that when something needs fixing, one team fixes it, in one place, against one programme.",
      "The economics are straightforward. A single-source package typically costs within three to five per cent of a multi-source one when the total cost of ownership is calculated — factoring in consolidated logistics, reduced sample rounds, fewer site remediation costs, and the programme savings from unified manufacturing. For a 200-key hotel, the programme savings alone — even one week recovered — can exceed the entire FF&E cost differential. The cheapest package is almost never the most economical one when the hotel's opening date is on the line.",
    ],
    cta: {
      label: "Request a single-source FF&E proposal",
      href: "/contact?intent=ffe-procurement",
      description:
        "Tell us about your hotel project — key count, programme, and scope — and we will show you what a single-source FF&E package looks like from our Istanbul production campus.",
    },
  },
  {
    id: "designing-for-the-tenth-year",
    title:
      "Designing hospitality interiors for the tenth year, not the opening photograph",
    category: "Hospitality Design",
    date: "May 2026",
    readingTime: "5 min read",
    excerpt:
      "Durability is a design decision, not a procurement afterthought — and it shapes everything from material choice to the way a detail is drawn.",
    tone: 0,
    body: [
      "Every hospitality interior is photographed on the day it opens. Far fewer are judged on how they look after a decade of full occupancy — but that is the test that matters to an owner. The interiors that survive it are designed for it from the first sketch, not rescued by maintenance later.",
      "That changes how we choose materials and how we detail them. A surface is specified for how it wears, not only how it reads in a render. An edge is drawn so it can be repaired without replacing the whole piece. A finish is chosen because the operator's own team can touch it up on site.",
      "None of this shows in the opening photograph. All of it shows in year ten — which is exactly the point.",
    ],
  },
  {
    id: "ffe-procurement-without-surprises",
    title: "FF&E procurement without the surprises",
    category: "FF&E Trends",
    date: "April 2026",
    readingTime: "4 min read",
    excerpt:
      "The discipline of specifying what can actually be delivered on programme — lead times, logistics and the difference between a sample and a shipment.",
    tone: 2,
    body: [
      "FF&E is where a beautiful scheme most often meets a hard date. The specification is signed off months before anyone checks whether the pieces can arrive, in the quantity needed, by the day the doors open.",
      "We manage specification and procurement in the same house, against the construction programme rather than after it. Lead times are checked at the point of specifying, not the point of ordering. Logistics and warehousing are planned so a 300-key hotel's worth of furniture lands in the right sequence, not all at once.",
      "The result is fewer surprises — and an interior that arrives exactly as it was drawn.",
    ],
  },
  {
    id: "the-case-for-owned-materials",
    title: "The case for developing materials in-house",
    category: "Material Innovation",
    date: "March 2026",
    readingTime: "6 min read",
    excerpt:
      "What a dedicated materials house changes about an interior — and why owning the palette is worth the investment.",
    tone: 5,
    body: [
      "Most interior contractors specify materials from a catalogue. A few develop their own. The difference is control — over the finish, the lead time, and the ability to match a surface exactly across a whole building.",
      "Through SILADU, our materials house, veneers, solids and composites are matched and developed before they reach the workshop floor. When a project needs a finish that does not exist yet, we can make it rather than approximate it.",
      "Owning the palette is an investment. It pays back in interiors that look intentional down to the grain.",
    ],
  },
  {
    id: "where-joinery-tolerances-come-from",
    title: "Where joinery tolerances come from",
    category: "Joinery Techniques",
    date: "February 2026",
    readingTime: "5 min read",
    excerpt:
      "The gap between fit-out tolerances and furniture tolerances — and why closing it separates good joinery from great.",
    tone: 1,
    body: [
      "Construction works to one set of tolerances; furniture works to a much tighter one. Bespoke joinery lives in between — fitted to a building that was never built to furniture tolerances, yet expected to look like a made object.",
      "We close that gap by prototyping and dry-assembling in the workshop before anything reaches site. Shadow gaps, matched veneers and flush lines are resolved where they can be controlled, so installation becomes a matter of fitting finished pieces rather than making them in place.",
      "The tolerance you see in a finished room was decided long before, on the workshop bench.",
    ],
  },
  {
    id: "value-engineering-that-adds-value",
    title: "Value engineering that adds value",
    category: "Value Engineering",
    date: "January 2026",
    readingTime: "4 min read",
    excerpt:
      "Done early and honestly, value engineering protects the design. Done late, it guts it. The difference is when you start.",
    tone: 4,
    body: [
      "Value engineering has a bad name because it usually arrives too late — a cost-cutting exercise that strips a finished design of the things that made it good.",
      "Done properly, it happens early, while the design is still flexible. Because our design studio and workshops share the same building, we can test what a detail costs to make as we draw it, and find the version that keeps the intent at the right price.",
      "Value engineering should protect the design, not punish it. That only works if it starts at the beginning.",
    ],
  },
];

export const presence = {
  intro:
    "Two decades of projects across three regions — designed and made in İstanbul, delivered on site wherever the work is.",
  regions: [
    {
      id: "gcc",
      name: "GCC",
      note: "Our largest market — landmark hospitality and commercial fit-outs across the Gulf.",
      countries: ["Qatar", "UAE", "Saudi Arabia", "Kuwait", "Bahrain", "Oman"],
    },
    {
      id: "turkiye",
      name: "Türkiye",
      note: "Home base and production — the studio, the workshops and our materials house.",
      countries: ["Türkiye"],
    },
    {
      id: "uk-europe",
      name: "UK & Europe",
      note: "Bespoke joinery, doors and residential work for European clients.",
      countries: ["United Kingdom", "Germany", "France"],
    },
  ],
};

export type Role = {
  id: string;
  title: string;
  location: string;
  type: string;
  blurb: string;
};

export const roles: Role[] = [
  {
    id: "senior-project-manager",
    title: "Senior Project Manager",
    location: "İstanbul / On-site",
    type: "Full-time",
    blurb:
      "Own delivery end-to-end on hospitality and commercial fit-outs — holding programme, cost and quality across design, manufacture and installation.",
  },
  {
    id: "site-foreman",
    title: "Site Foreman",
    location: "Doha, QA",
    type: "Full-time",
    blurb:
      "Run installation on a flagship hotel fit-out, coordinating every trade to a fixed handover date.",
  },
  {
    id: "ffe-procurement-lead",
    title: "FF&E Procurement Lead",
    location: "Dubai, AE",
    type: "Full-time",
    blurb:
      "Specify, source and consolidate FF&E packages against demanding pre-opening programmes.",
  },
  {
    id: "cnc-machinist",
    title: "CNC Machinist",
    location: "İstanbul, TR",
    type: "Full-time",
    blurb:
      "Programme and run CNC lines for joinery and furniture production to tight tolerances.",
  },
  {
    id: "interior-designer",
    title: "Interior Designer",
    location: "İstanbul, TR",
    type: "Full-time",
    blurb:
      "Develop concept-to-technical interior design across hospitality, commercial and residential projects.",
  },
];

export const testimonials = [
  {
    quote:
      "One team carried the whole interior — design, joinery and FF&E — and held the date. We never had to chase a supplier.",
    author: "Operations Director",
    company: "Hospitality group, Doha",
  },
  {
    quote:
      "The joinery was furniture-grade. You can see where ORWOOD made something rather than bought it.",
    author: "Design Director",
    company: "Interior design studio, London",
  },
  {
    quote:
      "They value-engineered without gutting the design. The scheme we opened was the scheme we drew.",
    author: "Development Manager",
    company: "Commercial developer, Dubai",
  },
];

/** Placeholder client names — swap for real client logos before launch. */
export const clients = [
  "Aram Hospitality",
  "Lumen Group",
  "Northbank",
  "Maren Estates",
  "Solis Resorts",
  "Cedar Developments",
];

export const vision =
  "To be the interior partner a client wants in the room for whatever they build next — anywhere in the world.";

export const mission =
  "To design, manufacture and deliver from three owned workshops — Hi Mobilya, SILADU, ORWOOD Doors — so every interior we touch is made to a single standard and a single point of accountability.";

export type Leader = {
  id: string;
  name: string;
  role: string;
  remit: string;
  bio: string;
  portrait?: string;
  tone: number;
};

export const leadership: Leader[] = [
  {
    id: "erkan-orman",
    name: "Erkan Orman",
    role: "Founder & Managing Director",
    remit:
      "Sets the standard and stays close to the bench — the workshop is still where decisions get checked.",
    bio: "Erkan founded ORWOOD in 2004 from a small joinery shop in İstanbul. A master craftsman by training, he built the company around a conviction that the people who design an interior should be close enough to make it. Twenty years on, he still signs off prototypes in the workshop before they leave for site.",
    tone: 0,
  },
  {
    id: "defne-aydin",
    name: "Defne Aydın",
    role: "Director of Design",
    remit:
      "Holds design intent from concept to the last installed detail, across every project.",
    bio: "Defne leads the design studio across hospitality, commercial and residential programmes. Trained as an interior architect, she joined ORWOOD in 2011 and built the in-house design team that now carries a project from first concept through to installed detail — so nothing is lost in the handovers.",
    tone: 5,
  },
  {
    id: "murat-kaya",
    name: "Murat Kaya",
    role: "Head of Manufacturing",
    remit:
      "Runs the workshops and production lines — CNC, joinery, upholstery and finishing.",
    bio: "Murat oversees ORWOOD's production facilities — CNC, joinery, upholstery and finishing lines — with the capacity to take a 300-key hotel from prototype to series. A production engineer by background, he joined in 2008 and has scaled the workshops from a single bench to three dedicated manufacturing houses.",
    tone: 4,
  },
  {
    id: "elif-celik",
    name: "Elif Çelik",
    role: "Commercial Director",
    remit:
      "Owns programme, cost and the client relationship from first brief to handover.",
    bio: "Elif runs the commercial side of the business — estimating, procurement, programme and the client relationship from first brief to final account. She joined ORWOOD in 2013 from a main contractor and brought the discipline of cost and programme to an atelier that was growing faster than its systems.",
    tone: 2,
  },
];

export const istanbul = {
  headline: "ORWOOD İstanbul",
  intro:
    "Founded in 2004, headquartered in İstanbul — where our design studio, three manufacturing facilities, and twenty years of craft come together under one roof.",
  story: [
    "ORWOOD was born in İstanbul and has never left. Our headquarters, design studio, and production campus sit in İkitelli OSB, one of the city's established industrial zones — a neighbourhood of factories, workshops, and trade that has been making things for decades.",
    "From here we run three dedicated manufacturing operations: Hi Mobilya for bespoke and contract furniture, SILADU for surface and veneer development, and ORWOOD Doors for our proprietary acoustic and fire-rated door systems. These are owned facilities, staffed by our own machinists, joiners, and finishing teams.",
    "İstanbul gives us proximity to every market we serve. A two-hour flight to Dubai, four hours to London, and direct shipping access to the GCC, Europe, and North Africa. Twenty years of projects across fifteen countries have been designed, engineered, and manufactured from this city.",
  ],
  capabilities: [
    {
      title: "Design Studio",
      body: "Concept through technical detail — our interior architects carry a project from first sketch to installed millwork.",
    },
    {
      title: "Hi Mobilya — Furniture Manufacturing",
      body: "Bespoke and contract furniture for hospitality and commercial projects, produced on dedicated CNC and finishing lines.",
    },
    {
      title: "SILADU — Materials & Surfaces",
      body: "Veneer matching, solid-wood development, and composite engineering — the palette behind every ORWOOD interior.",
    },
    {
      title: "ORWOOD Doors — Fire Rated Door Systems",
      body: "Proprietary acoustic and fire-rated door sets, engineered, tested, and manufactured as complete certified assemblies.",
    },
  ],
  facts: [
    { label: "Founded", value: "2004" },
    { label: "Headquarters", value: "İstanbul, Türkiye" },
    { label: "Production campus", value: "İkitelli OSB, Başakşehir" },
    { label: "Manufacturing brands", value: "Hi Mobilya · SILADU · ORWOOD Doors" },
    { label: "Countries delivered", value: "15+" },
    { label: "Projects completed", value: "200+" },
    { label: "Core sectors", value: "Hospitality · Commercial · Residential" },
    { label: "Certifications", value: "ISO 9001 · ISO 14001 · BS EN 1634-1" },
  ],
};

export const sustainability = {
  intro:
    "We make things to last — the most sustainable decision an interior company can take. Beyond that, we work to reduce what we waste and to source responsibly.",
  points: [
    {
      title: "Built to last",
      body: "Interiors engineered for the tenth year, not the opening photograph — so they're replaced far less often.",
    },
    {
      title: "Responsible materials",
      body: "Timber and surfaces from managed, certified sources wherever the specification allows.",
    },
    {
      title: "Less waste",
      body: "In-house manufacture lets us optimise cutting, reuse offcuts and control what leaves the workshop.",
    },
  ],
};
