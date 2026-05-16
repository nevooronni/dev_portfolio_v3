import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import NextLink from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: projects } = await supabase.from("projects").select("id");
  return projects?.map((project) => ({ id: project.id })) || [];
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  const techStack = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
      ? project.tech_stack.split(",").map((s: string) => s.trim())
      : [];

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
        {/* Background Ambience */}
        <div className="bg-accent/5 absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-in fade-in slide-in-from-left-8 mx-auto max-w-4xl duration-1000">
            <div className="mb-8">
              <Button
                asChild
                variant="ghost"
                className="hover:text-accent -ml-4 hover:bg-transparent"
              >
                <NextLink href="/projects">
                  <ArrowLeft size={16} className="mr-2" /> Back to Projects
                </NextLink>
              </Button>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <Badge
                variant="secondary"
                className="rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase"
              >
                {project.category}
              </Badge>
              {project.subcategory && (
                <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                  {project.subcategory}
                </span>
              )}
            </div>

            <h1 className="font-heading mb-8 text-4xl leading-[1.1] font-black md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="text-muted-foreground mb-10 text-xl leading-relaxed md:text-2xl">
              {project.description}
            </p>

            <div className="mb-12 flex flex-wrap gap-4">
              {project.live_link && project.live_link !== "#" && (
                <Button
                  asChild
                  size="lg"
                  className="shadow-accent/20 h-12 rounded-full px-8 text-base shadow-xl"
                >
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Project{" "}
                    <ExternalLink size={18} className="ml-2" />
                  </a>
                </Button>
              )}
              {project.repo_link && project.repo_link !== "#" && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-2 px-8 text-base"
                >
                  <a
                    href={project.repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      className="mr-2"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Source Code
                  </a>
                </Button>
              )}
            </div>

            {project.impact && (
              <div className="bg-accent/5 border-accent mb-12 rounded-2xl border-l-4 p-6 md:p-8">
                <div className="text-accent mb-2 text-xs font-bold tracking-widest uppercase">
                  Impact Delivered
                </div>
                <div className="font-heading text-foreground text-2xl font-bold">
                  {project.impact}
                </div>
              </div>
            )}

            <div className="border-border/50 mb-16 border-t pt-8">
              <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="bg-muted/50 text-foreground rounded-lg px-4 py-2 text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 max-w-none">
              {project.long_description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: project.long_description }}
                />
              ) : (
                <p className="text-muted-foreground italic">
                  Detailed case study coming soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
