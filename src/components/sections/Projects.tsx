"use client";

import React from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NextLink from "next/link";
import { cn } from "../../lib/utils";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  tech_stack: string[];
  impact?: string;
  live_link?: string;
  repo_link?: string;
  featured?: boolean;
}

export function Projects() {
  const [projectList, setProjectList] = React.useState<ProjectItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;
        setProjectList(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="w-full max-w-2xl">
              <Skeleton className="mb-4 h-12 w-48" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="mt-2 h-6 w-3/4" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-card border-border space-y-6 rounded-2xl border p-8"
              >
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-5 w-5" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projectList.length === 0) return null;
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="font-heading mb-4 text-3xl font-black md:text-5xl">
              Portfolio
            </h2>
            <p className="text-muted-foreground text-xl">
              A comprehensive selection of engineering projects ranging from
              fintech ecosystems to AI-integrated mobile solutions.
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="group h-12 rounded-full px-8 font-bold"
          >
            <NextLink href="/projects">
              See All Projects{" "}
              <ArrowUpRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </NextLink>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project) => (
            <div
              key={project.id}
              className={cn(
                "group bg-card border-border hover:border-accent hover:shadow-accent/10 glow-card relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl",
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
                  {project.repo_link && project.repo_link !== "#" && (
                    <NextLink
                      href={project.repo_link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  {project.live_link && project.live_link !== "#" && (
                    <NextLink
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                {project.tech_stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-muted-foreground bg-muted/50 rounded px-2 py-1 text-[11px] font-bold"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 4 && (
                  <span className="text-muted-foreground bg-muted/50 rounded px-2 py-1 text-[11px] font-bold">
                    +{project.tech_stack.length - 4}
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
