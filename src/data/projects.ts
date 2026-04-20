export interface Project {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  longDescription: string;
  techStack: string[];
  impact?: string;
  liveLink?: string;
  repoLink?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // --- FEATURED / RECENT ---
  {
    id: "lemonade-business",
    title: "Lemonade Business Ecosystem",
    category: "Fintech & Payments",
    subcategory: "B2B / SaaS",
    description:
      "Multinational B2B, B2C, C3B payment gateway facilitating cross-border transactions across Africa.",
    longDescription:
      "Architected and led the development of a comprehensive business payments system. Integrated M-PESA, Airtel Money, and card processing for instant bulk transfers and multi-currency secure transactions. Reduced operational friction for 1000+ businesses.",
    techStack: [
      "Next.js",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Jenkins",
    ],
    impact: "Processed $10M+ in localized transactions",
    liveLink: "https://dashboard.mylemonade.io/",
    featured: true,
  },
  {
    id: "stagepass-backend",
    title: "StagePass Ticketing Engine",
    category: "High-Concurrency Backends",
    subcategory: "Event Tech",
    description:
      "High-concurrency ticketing backend supporting large-scale live events and real-time seat booking.",
    longDescription:
      "Engineered a mission-critical ticketing backend using NestJS and Kafka for event-driven processing. Implemented distributed locking with Redis to prevent double-booking during high-traffic on-sales.",
    techStack: ["NestJS", "Kafka", "PostgreSQL", "Redis", "DigitalOcean"],
    impact: "Handled 50k+ concurrent users during peak sales",
    liveLink: "https://stagepass.vip/",
    featured: true,
  },
  {
    id: "babbel-ai",
    title: "Babbel AI Learning Assistant",
    category: "AI & LLM Integration",
    subcategory: "EdTech",
    description:
      "LLM-integrated language tutor enhancing mobile learning experiences for millions of users.",
    longDescription:
      "Integrated OpenAI's GPT models (GPT-4o) into the Babbel mobile ecosystem to provide real-time, context-aware language feedback and conversational practice.",
    techStack: ["React Native", "Expo", "OpenAI API", "Couchbase", "GraphQL"],
    impact: "Improved user retention by 15% through AI-driven personalization",
    liveLink: "https://babbel.com/",
    featured: true,
  },
  {
    id: "twiga-soko-yetu",
    title: "Twiga Soko Yetu Mobile",
    category: "Mobile Ecosystems",
    subcategory: "Logistics",
    description:
      "Flagship B2B Mobile app ordering platform for Twiga Foods, connecting thousands of vendors to suppliers.",
    longDescription:
      "Lead developer for the Soko Yetu mobile application. Engineered high-performance ordering workflows and integrated real-time delivery tracking and payment systems.",
    techStack: [
      "React Native",
      "Expo",
      "GraphQL",
      "M-PESA API",
      "Native Modules",
    ],
    impact: "Automated 80% of order processing for urban vendors",
    liveLink: "https://play.google.com/store/apps/details?id=ke.twiga.shop",
    featured: true,
  },

  // --- CORE HISTORY ---
  {
    id: "workpay-africa",
    title: "Workpay HR & Payroll",
    category: "Fintech & Payments",
    subcategory: "HRTech",
    description:
      "Cloud-based payroll solution handling statutory compliance and bulk payments for 500+ companies.",
    longDescription:
      "Core contributor to the payroll engine renovation. Implemented statutory deduction calculators for multiple African jurisdictions and optimized M-PESA B2C bulk payment integrations.",
    techStack: ["Node.js", "Express", "MySQL", "React", "Docker"],
    impact: "Reduced payroll processing time by 60% for enterprise clients",
    liveLink: "https://dashboard.myworkpay.com/",
    featured: false,
  },
  {
    id: "telkom-dashboard",
    title: "Telkom Network Dashboard",
    category: "Government & Enterprise",
    subcategory: "Telecom",
    description:
      "Centralized network administration portal for Telkom Kenya's core mobile services.",
    longDescription:
      "Developed a mission-critical dashboard for administering Telkom Kenya's core network services. Implemented complex data visualizations for network health and SME service management.",
    techStack: ["Node.js", "TypeScript", "MySQL", "Redis", "React"],
    impact: "Centralized management for 5+ core telecom services",
    featured: false,
  },
  {
    id: "sgr-booking",
    title: "SGR Madaraka Express Web App",
    category: "Government & Enterprise",
    subcategory: "Transportation",
    description:
      "Official ticketing and booking platform for Kenya's Standard Gauge Railway.",
    longDescription:
      "Architected the v2 web application for SGR booking. Focused on handling high-burst traffic during holiday seasons and ensuring secure payment processing for thousands of daily travelers.",
    techStack: ["Fastify", "TypeScript", "MySQL", "Redis", "React"],
    impact: "Enabled 100% digital ticketing for the national railway",
    liveLink: "https://metickets.krc.co.ke/",
    featured: false,
  },
  {
    id: "kpa-portal",
    title: "KPA Digital Operations Portal",
    category: "Government & Enterprise",
    subcategory: "Port Operations",
    description:
      "Operational portal for Kenya Port Authority, managing import duties and commerce logistics.",
    longDescription:
      "Led the development of the KPA Digital Operations Portal. Streamlined the payment of import duties and digitized manual port entry workflows.",
    techStack: ["Node.js", "TypeScript", "MySQL", "Redis", "React"],
    impact: "Digitized 40% of manual port clearance workflows",
    featured: false,
  },

  // --- SOCIAL IMPACT & NGO ---
  {
    id: "gals-impact",
    title: "GALS Gender Action System",
    category: "Social Impact & NGO",
    subcategory: "International Dev",
    description:
      "Knowledge tracking platform supported by IFAD, UNICEF, and UNDP for community empowerment.",
    longDescription:
      "Developed a comprehensive web system supporting the GALS methodology. Focused on accessibility and data tracking for community leaders in rural African regions.",
    techStack: ["Django", "Next.js", "Chakra UI", "GitLab CI", "Jenkins"],
    impact: "Adopted by 4+ international NGOs for regional impact tracking",
    liveLink: "https://gals.co.ke",
    featured: false,
  },

  // --- HISTORICAL & LEGACY ARCHIVE ---
  {
    id: "politico-voting",
    title: "Politico Election Platform",
    category: "Legacy Projects",
    subcategory: "E-Voting",
    description:
      "Secure digital election platform for managing political offices and citizen voting.",
    longDescription:
      "Early-career exploration in digital governance. Built a secure voting framework allowing for candidate management and verified citizen participation.",
    techStack: ["Node.js", "Bootstrap", "Gulp", "PostgreSQL"],
    featured: false,
  },
  {
    id: "topup-online",
    title: "Universal Credit Topup",
    category: "Legacy Projects",
    subcategory: "Utilities",
    description:
      "Aggregated mobile credit purchasing platform integrated with M-PESA and Airtel Money.",
    longDescription:
      "A credit top-up utility supporting multiple mobile service providers via a single unified API and web interface.",
    techStack: ["Python", "Django", "Bootstrap", "M-PESA API"],
    featured: false,
  },
];
