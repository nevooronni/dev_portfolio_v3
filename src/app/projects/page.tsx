"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Fintech & Payments",
  "High-Concurrency Backends",
  "AI & LLM Integration",
  "Mobile Ecosystems",
  "Government & Enterprise",
  "Social Impact & NGO",
  "Legacy Projects",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background Ambience */}
        <div className="bg-accent/5 absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-[120px]" />

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <Button variant="ghost" asChild className="hover:bg-accent/10 mb-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Overview
              </Link>
            </Button>

            <h1 className="font-heading mb-6 text-4xl font-black md:text-6xl">
              Strategic{" "}
              <span className="text-accent glow-accent">Portfolio</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
              The complete architectural history. From early-career experiments
              to mission-critical enterprise ecosystems and AI-driven
              innovations.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-background/80 border-border/50 no-scrollbar sticky top-20 z-40 mb-12 overflow-x-auto border-b py-6 backdrop-blur-md">
            <div className="flex min-w-max gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-6 py-2 text-sm font-bold transition-all duration-300",
                    activeCategory === cat
                      ? "bg-accent shadow-accent/20 text-white shadow-lg"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group bg-card border-border hover:border-accent hover:shadow-accent/5 animate-in fade-in slide-in-from-bottom-5 relative flex flex-col rounded-2xl border p-8 transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Visual Placeholder (UI Cleanliness) */}
                <div className="bg-muted group-hover:bg-muted/50 relative mb-6 aspect-video overflow-hidden rounded-xl transition-colors">
                  <div className="from-accent/20 to-primary/20 absolute inset-0 flex items-center justify-center bg-gradient-to-br p-6 opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0">
                    <span className="text-4xl font-black tracking-tighter uppercase opacity-50 select-none">
                      {project.subcategory || project.category.split(" ")[0]}
                    </span>
                  </div>
                  {/* Subtle glassmorphism overlay */}
                  <div className="absolute inset-0 rounded-xl border border-white/5" />
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent rounded-sm border-none px-2 text-[10px] font-bold tracking-widest uppercase"
                  >
                    {project.category}
                  </Badge>
                  <div className="flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                    {project.liveLink && project.liveLink !== "#" && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                  </div>
                </div>

                <h3 className="font-heading group-hover:text-accent mb-3 text-2xl font-black transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="border-border/50 mt-auto flex flex-wrap gap-2 border-t pt-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-[10px] font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
