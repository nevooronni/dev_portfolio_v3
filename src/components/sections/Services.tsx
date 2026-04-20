import { Layers, Cpu, Workflow, Users, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Technical Architecture",
    description:
      "Designing high-concurrency, distributed systems and microservices for frontend and backend enterprise at scale.",
    icon: <Layers size={32} />,
  },
  {
    title: "Team Leadership",
    description:
      "Mentoring high-performance engineering teams and establishing rigorous SDLC/Agile practices.",
    icon: <Users size={32} />,
  },
  {
    title: "Full Stack Excellence",
    description:
      "Building mission-critical UIs, APIs and real-time processing engines with latest proven technologies.",
    icon: <Cpu size={32} />,
  },
  {
    title: "Performance Optimization",
    description:
      "Auditing and optimizing bottleneck-prone systems to deliver sub-100ms latency and 99.9% uptime.",
    icon: <Zap size={32} />,
  },
  {
    title: "Payment Integrations",
    description:
      "End-to-end integration of M-PESA, cards, and cross-border payment gateways in African markets.",
    icon: <ShieldCheck size={32} />,
  },
  {
    title: "Strategic Consulting",
    description:
      "Translating business roadmaps into technical reality for seed to series C startups.",
    icon: <Workflow size={32} />,
  },
];

export function Services() {
  return (
    <section id="services" className="bg-muted/10 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="font-heading mb-6 text-3xl font-black md:text-5xl">
            Core Competencies
          </h2>
          <p className="text-muted-foreground text-xl">
            Strategic technical leadership and hands-on engineering for
            businesses that demand scale, security, and exceptional performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:bg-primary hover:text-primary-foreground border-none shadow-lg shadow-black/5 transition-all duration-500"
            >
              <CardHeader>
                <div className="text-accent mb-4 transition-colors group-hover:text-white">
                  {service.icon}
                </div>
                <CardTitle className="font-heading text-2xl font-bold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed group-hover:text-white/80">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
