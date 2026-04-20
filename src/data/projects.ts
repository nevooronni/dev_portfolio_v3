export interface Project {
  id: string;
  title: string;
  category: string;
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
  {
    id: "lemonade-business",
    title: "Lemonade Business Ecosystem",
    category: "Fintech / Payments",
    description:
      "Multinational B2B payment gateway facilitating cross-border transactions across Africa.",
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
    category: "Event Tech / Scale",
    description:
      "High-concurrency ticketing backend supporting large-scale live events and real-time seat booking.",
    longDescription:
      "Engineered a mission-critical ticketing backend using NestJS and Kafka for event-driven processing. Implemented distributed locking with Redis to prevent double-booking during high-traffic on-sales.",
    techStack: ["NestJS", "Kafka", "PostgreSQL", "Redis", "DigitalOcean"],
    impact: "Handled 50k+ concurrent users",
    liveLink: "https://stagepass.vip/",
    featured: true,
  },
  {
    id: "babbel-ai",
    title: "Babbel AI Learning Assistant",
    category: "EdTech / AI",
    description:
      "LLM-integrated language tutor enhancing mobile learning experiences for millions of users.",
    longDescription:
      "Integrated OpenAI's GPT models (GPT-4o) into the Babbel mobile ecosystem to provide real-time, context-aware language feedback and conversational practice.",
    techStack: ["React Native", "Expo", "OpenAI API", "Couchbase", "GraphQL"],
    impact: "Improved user retention by 15%",
    liveLink: "https://babbel.com/",
    featured: true,
  },
  {
    id: "twiga-dms",
    title: "Twiga Supply Chain DMS",
    category: "Logistics / Agritech",
    description:
      "End-to-end data management system optimizing the agricultural supply chain in East Africa.",
    longDescription:
      "Built a robust data management system for Twiga Foods to manage supplier data, logistics, and credit limits. Faciliated secure interactions between 10k+ small-scale farmers and urban vendors.",
    techStack: ["React", "Django", "MySQL", "AWS", "Docker"],
    impact: "Optimized logistics for 100+ routes",
    liveLink: "https://twigadmsv2.co.ke",
    featured: false,
  },
  {
    id: "workpay-africa",
    title: "Workpay HR & Payroll",
    category: "HRTech / Enterprise",
    description:
      "Cloud-based payroll solution for African businesses, handling statutory compliance and bulk payments.",
    longDescription:
      "Core contributor to the payroll engine renovation. Implemented statutory deduction calculators for multiple African jurisdictions and optimized M-PESA B2C bulk payment integrations.",
    techStack: ["Node.js", "Express", "MySQL", "React", "Docker"],
    impact: "Served 500+ corporate clients",
    liveLink: "https://myworkpay.com/",
    featured: false,
  },
];
