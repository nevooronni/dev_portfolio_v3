export interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
  chartData: { name: string; value: number }[];
}

export const metrics: Metric[] = [
  {
    id: "revenue-growth",
    label: "YoY Revenue Growth",
    value: "50%",
    description:
      "Driving commercial success through scalable fintech architecture at Lemonade Payments.",
    chartData: [
      { name: "2023 Q1", value: 400 },
      { name: "2023 Q2", value: 480 },
      { name: "2023 Q3", value: 520 },
      { name: "2023 Q4", value: 600 },
    ],
  },
  {
    id: "api-optimization",
    label: "API Latency Reduction",
    value: "40%",
    description:
      "Optimized mission-critical backends for high-concurrency African markets.",
    chartData: [
      { name: "Baseline", value: 100 },
      { name: "Phase 1", value: 85 },
      { name: "Phase 2", value: 70 },
      { name: "Optimized", value: 60 },
    ],
  },
  {
    id: "product-stability",
    label: "Reduction in Production Bugs",
    value: "32%",
    description: "Implemented rigorous automated testing and CI/CD pipelines.",
    chartData: [
      { name: "Old Process", value: 100 },
      { name: "TDD Intro", value: 88 },
      { name: "CI Integration", value: 75 },
      { name: "Current", value: 68 },
    ],
  },
  {
    id: "mobile-engagement",
    label: "Increase in Mobile Traffic",
    value: "25%",
    description: "Engineered performant React Native and Expo applications.",
    chartData: [
      { name: "Launch", value: 2000 },
      { name: "Month 3", value: 2200 },
      { name: "Month 6", value: 2400 },
      { name: "Month 12", value: 2500 },
    ],
  },
];
