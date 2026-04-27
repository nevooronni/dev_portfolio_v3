export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  impactMetric?: string;
}

export const experiences: Experience[] = [
  {
    id: "lemonade-payments",
    company: "Lemonade Payments",
    role: "Engineering Team Leader",
    period: "Jan 2024 — Present",
    location: "Nairobi, Kenya",
    description: [
      "Orchestrating architectural decisions for a multi-country payments platform serving millions of users.",
      "Leading a high-performing engineering team of 4 through major product pivots, resulting in a 50% YoY revenue increase.",
      "Spearheading the migration to a high-concurrency microservices architecture, reducing API latency by 40%.",
      "Standardizing documentation frameworks and component patterns, reducing onboarding time for new hires by 30%.",
    ],
    skills: [
      "Next.js",
      "NestJS",
      "Fastify",
      "PostgreSQL",
      "Kafka",
      "AWS",
      "Team Leadership",
    ],
    impactMetric: "50% YoY Revenue Growth",
  },
  {
    id: "workpay-africa",
    company: "Workpay Africa",
    role: "Software Engineer",
    period: "Dec 2020 — Dec 2023",
    location: "Nairobi, Kenya",
    description: [
      "Designed and implemented a scalable HR and payroll architecture using Node.js and TypeScript.",
      "Led the frontend delivery of Workpay Core HR v2, increasing user adoption by 30% after launch.",
      "Introduced automated testing frameworks (Jest/Cypress) increasing test coverage to 75% and reducing production bugs by 32%.",
      "Improved PostgreSQL query performance by 40% through indexing and query refactoring.",
    ],
    skills: [
      "Node.js",
      "TypeScript",
      "React Native",
      "Express",
      "MySQL",
      "Docker",
    ],
    impactMetric: "32% Bug Reduction",
  },
  {
    id: "tospay-limited",
    company: "Tospay Limited",
    role: "Software Engineer",
    period: "Nov 2019 — Nov 2020",
    location: "Nairobi, Kenya",
    description: [
      "Architected and deployed the Kenya Railways SGR web app using the MERN stack, scaling to 10k+ daily concurrent bookings.",
      "Designed and implemented the Telkom Mobile Money Data Management System, supporting Telkom Kenya’s growth.",
      "Developed the Kenya Ports Authority portal for digitized import duty payments and service management.",
    ],
    skills: [
      "MERN Stack",
      "MySQL",
      "Redis",
      "Digitization",
      "Enterprise Architecture",
    ],
    impactMetric: "10k+ Concurrent Users",
  },
  {
    id: "bluco-consultants",
    company: "Bluco Consultants",
    role: "Software Engineer",
    period: "Oct 2018 — Sep 2019",
    location: "Nairobi, Kenya",
    description: [
      "Led the design and development of the Bluco job marketplace platform from concept to production.",
      "Built robust REST APIs and integrated multiple third-party payment systems including M-Pesa.",
      "Delivered advanced analytics tooling that improved user insights and enabled high-impact monetization strategies.",
    ],
    skills: ["Python", "Django", "M-Pesa API", "Analytics", "REST APIs"],
    impactMetric: "End-to-End Scale",
  },
  {
    id: "twiga-foods",
    company: "Twiga Foods",
    role: "Software Engineer",
    period: "Jan 2018 — Oct 2018",
    location: "Nairobi, Kenya",
    description: [
      "Implemented UI designs using React for Twiga’s core logistics and supply chain applications.",
      "Contributed to Twiga DMS v2, directly impacting the operations of 15,000+ farmers across Kenya.",
      "Supported and trained end users in over 50 locations, significantly improving platform onboarding and adoption.",
    ],
    skills: ["React", "UI/UX", "Logistics", "User Training", "DMS v2"],
    impactMetric: "15k+ Farmers Impacted",
  },
  {
    id: "interintel",
    company: "Interintel",
    role: "Software Engineer",
    period: "Sep 2017 — Jan 2018",
    location: "Nairobi, Kenya",
    description: [
      "Designed and implemented reusable UI components for enterprise-grade software solutions.",
      "Delivered custom enterprise systems and integrations for multiple high-profile third-party clients.",
    ],
    skills: ["UI Components", "Enterprise Solutions", "Software Design"],
    impactMetric: "Enterprise Delivery",
  },
];
