import { Code2, Database, Cloud, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const matrixData = [
  {
    category: "Frontend",
    icon: <Code2 size={24} />,
    must: [
      "Javascript",
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    preferred: [
      "TanStack",
      "Redux",
      "Zustand",
      "React Native",
      "Storybook",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    icon: <Database size={24} />,
    must: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Kafka",
      "REST",
    ],
    preferred: [
      "Python",
      "GrpahQL",
      "Socket.io",
      "Django",
      "Flask",
      "FastAPI",
      "Express",
      "NestJS",
    ],
  },
  {
    category: "DevOps & Infra",
    icon: <Cloud size={24} />,
    must: [
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "AWS",
      "Terraform",
      "Kubernetes",
    ],
    preferred: ["ECS", "CloudWatch"],
  },
  {
    category: "Architecture",
    icon: <Network size={24} />,
    must: [
      "Load Balancing",
      "API Gateways",
      "Databases",
      "Caching",
      "API Design",
    ],
    preferred: [
      "Event-Driven Systems",
      "Observability",
      "Authentication",
      "Microservices",
      // "System Design",
    ],
  },
];

export function EngineeringExpertise() {
  return (
    <section id="expertise" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-heading mb-6 text-3xl font-black md:text-5xl">
            Tech Stack
          </h2>
          <p className="text-muted-foreground text-xl">
            A comprehensive overview of my technical stack depth and proficiency
            across the engineering lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {matrixData.map((section, idx) => (
            <Card
              key={idx}
              className="border-border/50 bg-card overflow-hidden"
            >
              <CardHeader className="border-border/50 bg-muted/20 border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="text-accent bg-accent/10 rounded-lg p-2">
                    {section.icon}
                  </div>
                  <CardTitle className="font-heading text-xl font-bold">
                    {section.category}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
                      Core Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {section.must.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary rounded-md px-3 py-1 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {section.preferred && section.preferred.length > 0 && (
                    <div>
                      <h4 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
                        Additional Depth
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {section.preferred.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-muted text-muted-foreground border-border/50 rounded-md border px-3 py-1 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
