"use client";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { cn } from "../../lib/utils";

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="font-heading mb-4 text-3xl font-black md:text-5xl">
              Featured Case Studies
            </h2>
            <p className="text-muted-foreground text-xl">
              A selection of high-impact engineering projects ranging from
              fintech backends to AI-integrated mobile ecosystems.
            </p>
          </div>
          <Button
            variant="outline"
            className="group h-12 rounded-full px-8 font-bold"
          >
            See All Projects{" "}
            <ArrowUpRight
              size={18}
              className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={cn(
                "group bg-card border-border hover:border-accent hover:shadow-accent/10 glow-card relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl",
                project.featured && "md:col-span-2 lg:col-span-1"
              )}
            >
              <div className="mb-6 flex items-start justify-between">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                >
                  {project.category}
                </Badge>
                <div className="text-muted-foreground flex gap-3 opacity-50 transition-opacity group-hover:opacity-100">
                  {project.repoLink && (
                    <NextLink
                      href={project.repoLink}
                      className="hover:text-accent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </NextLink>
                  )}
                  {project.liveLink && (
                    <NextLink
                      href={project.liveLink}
                      className="hover:text-accent"
                    >
                      <ExternalLink size={18} />
                    </NextLink>
                  )}
                </div>
              </div>

              <h3 className="font-heading group-hover:text-accent mb-3 text-2xl font-black transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {project.impact && (
                <div className="bg-muted border-accent mb-6 rounded-xl border-l-4 px-4 py-3">
                  <div className="text-muted-foreground mb-1 text-[10px] font-bold tracking-widest uppercase">
                    Impact Delivered
                  </div>
                  <div className="text-foreground text-sm font-bold">
                    {project.impact}
                  </div>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-muted-foreground bg-muted/50 rounded px-2 py-1 text-[11px] font-bold"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-muted-foreground bg-muted/50 rounded px-2 py-1 text-[11px] font-bold">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
