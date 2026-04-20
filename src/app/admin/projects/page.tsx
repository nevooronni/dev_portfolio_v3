"use client";

import * as React from "react";
import { projects as initialProjects, Project } from "@/data/projects";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminProjects() {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.success("Project removed successfully.");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-heading mb-2 text-3xl font-black tracking-tight">
            Manage Projects
          </h1>
          <p className="text-muted-foreground font-medium">
            Curate and update your case studies and professional history.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow-accent/20 gap-2 rounded-full font-bold shadow-lg">
              <Plus size={18} /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="font-heading font-black">
                Add New Project
              </DialogTitle>
              <DialogDescription>
                Fill in the details for your new case study.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Title
                </label>
                <Input placeholder="Project Title" className="border-muted" />
              </div>
              <div className="grid gap-2">
                <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Category
                </label>
                <Input
                  placeholder="Fintech / AI / Logistics"
                  className="border-muted"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Short Description
                </label>
                <Textarea
                  placeholder="Brief overview..."
                  className="border-muted resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full rounded-full font-bold">
                Save Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col items-center justify-between gap-6 border-none p-6 shadow-lg shadow-black/5 md:flex-row"
          >
            <div className="flex w-full items-center gap-6">
              <div className="bg-muted text-muted-foreground flex h-16 w-16 items-center justify-center rounded-xl">
                <FolderKanban size={32} />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3">
                  <h3 className="font-heading text-lg font-black">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="bg-accent/10 text-accent rounded px-2 py-0.5 text-[10px] font-black uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-1 text-sm">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg"
              >
                <Edit size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-destructive hover:bg-destructive/5 hover:border-destructive h-10 w-10 rounded-lg"
                onClick={() => handleDelete(project.id)}
              >
                <Trash2 size={18} />
              </Button>
              <Button
                asChild
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-lg"
              >
                <a href={project.liveLink} target="_blank" rel="noreferrer">
                  <ExternalLink size={18} />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FolderKanban({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}
