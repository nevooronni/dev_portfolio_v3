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
    period: "2023 — Present",
    location: "Nairobi, Kenya",
    description: [
      "Orchestrate architectural decisions for a multi-country payments platform serving millions of users.",
      "Lead a high-performing engineering team through major product pivots, resulting in a 50% YoY revenue increase.",
      "Spearhead the migration to a high-concurrency microservices architecture, reducing API latency by 40%.",
      "Collaborate directly with cross-functional stakeholders to align technical roadmap with aggressive business scaling goals.",
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
    role: "Lead Software Engineer",
    period: "2021 — 2023",
    location: "Nairobi, Kenya",
    description: [
      "Developed and maintained core payroll and HR systems for 500+ businesses across Africa.",
      "Introduced automated testing frameworks (Pest/Jest) increasing test coverage to 75% and reducing production bugs by 32%.",
      "Optimized CI/CD pipelines using GitLab CI/CD, reducing deployment turnaround time by 25%.",
      "Mentored junior and mid-level engineers, fostering a culture of high code standards and technical excellence.",
    ],
    skills: [
      "React Native",
      "Express",
      "MySQL",
      "Redis",
      "Docker",
      "GitLab CI",
    ],
    impactMetric: "32% Bug Reduction",
  },
  {
    id: "twiga-foods",
    company: "Twiga Foods",
    role: "Full Stack Engineer",
    period: "2019 — 2021",
    location: "Nairobi, Kenya",
    description: [
      "Built and scaled Data Management Systems (DMS) for supply chain logistics and harvest sourcing.",
      "Engineered mobile-first solutions for vendors and farmers, reaching a 25% increase in active mobile engagement.",
      "Implemented secure M-Pesa B2B and C2B payment integrations for large-scale agricultural transactions.",
      "Architected real-time inventory tracking systems using GraphQL and Socket.io.",
    ],
    skills: ["React", "Django", "GraphQL", "MPESA API", "PostgreSQL"],
    impactMetric: "25% Traffic Increase",
  },
];
