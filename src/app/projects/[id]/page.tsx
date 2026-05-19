import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ProjectLinks } from "./ProjectLinks";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .neq("is_hidden", true);
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

  if (!project || project.is_hidden === true) {
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

            {project.image_url && (
              <div className="border-muted bg-muted/20 mb-12 overflow-hidden rounded-2xl border shadow-2xl">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            <ProjectLinks
              liveLink={project.live_link}
              repoLink={project.repo_link}
              title={project.title}
            />

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
