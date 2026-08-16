export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features?: string[];
  icon: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Landscaping" | "Residential" | "Architecture" | "Interiors" | "Outdoor Spaces";
  description: string;
  image: string;
  alt: string;
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string;
  image: string;
  keyDeliverables: string[];
}

export interface DesignForCategory {
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export const BRAND_INFO = {
  name: "Athreya Design & Landscaping Studio",
  shortName: "Athreya Designs",
  tagline: "Designing Spaces. Enhancing Life.",
  secondaryStatement: "We Plan. We Design. We Create.",
  supportingStatement: "Green. Functional. Beautiful.",
  serviceArea: "Service Available All Over India",
  serviceAreaShort: "Serving Clients Across India",
  phones: [
    { display: "+91 9491246574", value: "+919491246574" },
    { display: "+91 7075947455", value: "+917075947455" },
  ],
  primaryPhone: "+919491246574",
  email: "athreyadesigns6@gmail.com",
  instagram: {
    handle: "@athreyadesigns_",
    url: "https://instagram.com/athreyadesigns_",
  },
  whatsapp: {
    number: "919491246574",
    defaultMessage: "Hello Athreya Design Studio, I would like to enquire about your landscape and architectural design services.",
  },
};

export const LANDSCAPE_SERVICES: ServiceItem[] = [
  {
    id: "garden-layout-planning",
    title: "Garden Layout Planning",
    description:
      "Thoughtful garden layouts designed around space, functionality, aesthetics, and long-term maintenance.",
    features: [
      "Spatial zoning & flow optimization",
      "Microclimate & sun path analysis",
      "Maintenance-conscious structural planning",
    ],
    icon: "Compass",
  },
  {
    id: "plant-tree-selection",
    title: "Plant & Tree Selection Guidance",
    description:
      "Suitable plant and tree recommendations based on the space, design intent, and environmental conditions.",
    features: [
      "Native & climate-resilient flora",
      "Canopy & aesthetic hierarchy",
      "Soil & sunlight compatibility analysis",
    ],
    icon: "Sprout",
  },
  {
    id: "plant-spacing-recommendations",
    title: "Plant Spacing Recommendations",
    description:
      "Strategic spacing for healthy growth, visual balance, and long-term landscape development.",
    features: [
      "Growth-stage density forecasting",
      "Root spread & structural safety",
      "Layered canopy depth & sightlines",
    ],
    icon: "Maximize2",
  },
  {
    id: "softscaping-hardscaping",
    title: "Softscaping & Hardscaping",
    description:
      "Integrated planting, pathways, structures, outdoor features, and other landscape elements.",
    features: [
      "Natural stone walkways & paving",
      "Pergolas, decks & architectural gazebos",
      "Seamless soft-to-hard surface transitions",
    ],
    icon: "Layers",
  },
  {
    id: "landscaping-layout-designs",
    title: "Landscaping Layout Designs",
    description:
      "Residential, commercial, farmhouse, industrial, terrace, hospitality, and institutional landscapes.",
    features: [
      "Custom site-specific master planning",
      "Terrace & rooftop garden configurations",
      "Acreage & large estate land utilization",
    ],
    icon: "LayoutGrid",
  },
  {
    id: "drip-irrigation-systems",
    title: "Drip Irrigation Systems",
    description:
      "Water-efficient irrigation planning, with installation support when required.",
    features: [
      "Zoned automated water management",
      "Root-targeted conservation efficiency",
      "Pressure regulation & longevity support",
    ],
    icon: "Droplets",
  },
];

export const ARCHITECTURE_SERVICES: ServiceItem[] = [
  {
    id: "basic-floor-plans",
    title: "Basic Floor Plans",
    description:
      "Efficient, human-centric spatial layouts designed for optimal ventilation, natural light, and modern lifestyle ergonomics.",
    icon: "FileText",
    badge: "Planning",
  },
  {
    id: "working-drawings",
    title: "Working Drawings",
    description:
      "Precise technical drawings, structural alignments, and construction details that guide seamless on-site contractor execution.",
    icon: "DraftingCompass",
    badge: "Technical",
  },
  {
    id: "3d-visualization",
    title: "3D Visualization & Walkthroughs",
    description:
      "Photorealistic 3D renders and cinematic walkthroughs that bring architectural concepts to life before construction begins.",
    icon: "Eye",
    badge: "Visualization",
  },
  {
    id: "interior-exterior-design",
    title: "Interior & Exterior Design",
    description:
      "Harmonious material palettes, modern exterior elevations, custom joinery concepts, and refined indoor atmospheres.",
    icon: "Home",
    badge: "Aesthetics",
  },
  {
    id: "site-visits-consultation",
    title: "Site Visits & Consultation",
    description:
      "On-site design assessments, environmental evaluations, and professional consultations to ensure design fidelity.",
    icon: "MapPin",
    badge: "Execution",
  },
];

export const DESIGN_FOR_CATEGORIES: DesignForCategory[] = [
  {
    title: "Villas",
    description: "Expansive private residences blending indoor luxury with lush outdoor courtyards and private gardens.",
    iconName: "Castle",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Apartments",
    description: "Refined balcony greening, compact living layouts, and shared residential atrium landscapes.",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Farmhouses",
    description: "Serene retreat estates, natural orchards, rustic hardscapes, and sweeping panoramic acreage planning.",
    iconName: "TreePine",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Terrace Gardens",
    description: "Engineered rooftop sanctuaries, lightweight soil designs, and wind-tolerant tropical plantings.",
    iconName: "SunMedium",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Industries & Hospitality",
    description: "Eco-conscious corporate campuses, boutique resorts, tranquil open-air dining, and green buffers.",
    iconName: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Schools & Institutions",
    description: "Inspiring educational courtyards, shade canopies, interactive botanical walks, and safe open spaces.",
    iconName: "GraduationCap",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    title: "Water Efficient",
    description: "Thoughtful landscape planning with efficient water use in mind, utilizing smart drip irrigation and moisture-conscious soil design.",
    icon: "Droplet",
    highlight: "Conservation First",
  },
  {
    title: "Sustainable Solutions",
    description: "Design approaches that consider long-term environmental impact, native flora resilience, and practical microclimatic cooling.",
    icon: "Leaf",
    highlight: "Eco-Conscious",
  },
  {
    title: "Expert Team",
    description: "Professional design guidance tailored to each project, bridging architectural precision with deep horticultural knowledge.",
    icon: "Award",
    highlight: "Tailored Guidance",
  },
  {
    title: "Long-Term Care",
    description: "Design decisions made with usability, maintenance, and longevity in mind, ensuring your space flourishes over the years.",
    icon: "ShieldCheck",
    highlight: "Built to Flourish",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    tagline: "Discovery & Site Topography",
    description: "Understand the site, requirements, preferences, and budget.",
    details: "In-depth discussion of your lifestyle, aesthetic goals, site topography, and functional expectations.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    keyDeliverables: [
      "Site topography & sun path analysis",
      "Lifestyle & aesthetic alignment",
      "Feasibility & budget parameter review",
    ],
  },
  {
    number: "02",
    title: "Planning",
    tagline: "Spatial Strategy & Master Direction",
    description: "Develop the landscape, architectural, or interior design direction.",
    details: "Zoning concepts, solar orientation, traffic flow, and comprehensive spatial strategy.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    keyDeliverables: [
      "Circulation & flow optimization",
      "Functional outdoor/indoor zoning",
      "Preliminary masterplan concepts",
    ],
  },
  {
    number: "03",
    title: "Design",
    tagline: "Photorealistic 3D & Technical Drawings",
    description: "Create layouts, drawings, visualizations, and detailed design concepts.",
    details: "Master floor plans, elevation renders, botanical palettes, material selections, and 3D walkthroughs.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    keyDeliverables: [
      "Photorealistic 3D renders & walkthroughs",
      "Botanical palette & hardscape finishes",
      "Detailed architectural floor plans",
    ],
  },
  {
    number: "04",
    title: "Execution",
    tagline: "Material Alignment & On-Site Coordination",
    description: "Coordinate the design and execution requirements as applicable.",
    details: "Working technical drawings, material specs, and contractor alignment for high-fidelity realization.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    keyDeliverables: [
      "Working construction blueprints",
      "Material, lighting & deck specifications",
      "Contractor & on-site alignment support",
    ],
  },
  {
    number: "05",
    title: "Long-Term Thinking",
    tagline: "Enduring Ecology & Smart Irrigation",
    description: "Design with functionality, sustainability, and future maintenance in mind.",
    details: "Irrigation schedules, plant growth management plans, and durable material endurance.",
    image: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
    keyDeliverables: [
      "Automated drip irrigation scheduling",
      "Plant growth & canopy development guide",
      "Low-maintenance sustainability plan",
    ],
  },
];

export const PORTFOLIO_ITEMS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Modern Villa Courtyard & Landscape",
    category: "Landscaping",
    description: "Harmonious blend of linear water rills, stone steps, and tropical specimen flora framing a private residence.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury villa garden landscape with water feature and lush tropical plants",
    tags: ["Private Villa", "Water Feature", "Tropical Flora"],
  },
  {
    id: "proj-2",
    title: "Contemporary Minimalist Residence",
    category: "Architecture",
    description: "Geometric architectural form featuring generous overhangs, expansive glass facades, and integrated green courtyards.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern architecture home exterior with warm evening lighting and landscaping",
    tags: ["Modern Architecture", "Elevation", "Indoor-Outdoor Flow"],
  },
  {
    id: "proj-3",
    title: "Sanctuary Rooftop Terrace Garden",
    category: "Outdoor Spaces",
    description: "Engineered rooftop haven with built-in planters, timber pergolas, and ambient night illumination.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury terrace garden overlooking city skyline with timber pergola",
    tags: ["Terrace Garden", "Pergola", "Urban Oasis"],
  },
  {
    id: "proj-4",
    title: "Warm Earthy Villa Interior",
    category: "Interiors",
    description: "Refined living space featuring natural teak wood, organic textiles, and direct visual connections to the outer garden.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Earthy luxury modern living room interior design with large windows",
    tags: ["Interior Design", "Natural Textures", "Garden View"],
  },
  {
    id: "proj-5",
    title: "Farmhouse Estate & Orchard Grounds",
    category: "Residential",
    description: "Expansive country estate landscaped with native shade trees, cobblestone pathways, and low-maintenance ground cover.",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=80",
    alt: "Expansive countryside farmhouse with manicured lawn and stone walkway",
    tags: ["Farmhouse", "Acreage Planning", "Native Trees"],
  },
  {
    id: "proj-6",
    title: "Architectural Pergola & Outdoor Lounge",
    category: "Outdoor Spaces",
    description: "Custom steel-and-timber pergola sheltering a sunken conversational fire pit surrounded by verdant palms.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    alt: "Outdoor lounge patio with pergola and lush green garden setting",
    tags: ["Outdoor Lounge", "Hardscaping", "Ambient Lighting"],
  },
  {
    id: "proj-7",
    title: "Refined Minimalist Courtyard Walkway",
    category: "Landscaping",
    description: "Stepping stone pathway through gravel zen garden with drip-irrigated bamboo and architectural feature lighting.",
    image: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern stone path in landscaped garden with architectural greenery",
    tags: ["Pathway Design", "Zen Garden", "Drip Irrigation"],
  },
  {
    id: "proj-8",
    title: "Boutique Hospitality & Dining Courtyard",
    category: "Architecture",
    description: "Open-air restaurant pavilion seamlessly enclosed by cascading green walls and tranquil water reflection pools.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury open air hospitality pavilion with landscaped surroundings",
    tags: ["Hospitality", "Pavilion Design", "Water Features"],
  },
];

export const PROJECT_TYPES = [
  "Landscaping",
  "Architecture",
  "Interior Design",
  "Villa",
  "Farmhouse",
  "Apartment",
  "Commercial",
  "Hospitality",
  "Other",
];
