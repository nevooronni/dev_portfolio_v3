"use client";

import { experiences } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="bg-muted/10 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h2 className="font-heading mb-4 text-3xl font-black md:text-5xl">
            Professional Evolution
          </h2>
          <p className="text-muted-foreground max-w-2xl text-xl">
            A track record of technical leadership and architectural excellence
            at the forefront of Africa&apos;s leading tech ecosystems.
          </p>
        </div>

        <div className="max-w-4xl space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="border-border relative border-l-2 pl-8 md:border-none md:pl-0"
            >
              {/* Timeline Connector for Desktop */}
              <div className="bg-border absolute top-0 bottom-0 left-1/2 -z-10 hidden w-0.5 -translate-x-1/2 md:block" />

              <div
                className={`items-start gap-12 md:flex ${index % 2 === 0 ? "md:flex-row" : "text-left md:flex-row-reverse md:text-right"}`}
              >
                <div className="mb-8 md:mb-0 md:w-1/2">
                  <div
                    className={`flex flex-col ${index % 2 === 0 ? "md:items-start" : "md:items-end"}`}
                  >
                    <div className="text-accent mb-2 flex items-center gap-2 font-bold">
                      <Calendar size={16} /> {exp.period}
                    </div>
                    <h3 className="font-heading mb-1 text-2xl font-black">
                      {exp.company}
                    </h3>
                    <div className="text-muted-foreground mb-4 text-lg font-bold">
                      {exp.role}
                    </div>

                    <div
                      className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
                    >
                      {exp.skills.slice(0, 5).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="bg-accent border-background absolute top-2 left-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 shadow-lg md:left-1/2" />

                <div className="md:w-1/2">
                  <div className="bg-card border-border rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md">
                    {exp.impactMetric && (
                      <div className="text-accent mb-4 flex items-center gap-2 text-xs font-black tracking-widest uppercase">
                        <CheckCircle2 size={16} /> Key Impact:{" "}
                        {exp.impactMetric}
                      </div>
                    )}
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex gap-3 text-sm leading-relaxed"
                        >
                          <span className="bg-accent mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
