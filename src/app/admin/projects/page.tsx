"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { supabase } from "@/lib/supabase";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  long_description: string;
  tech_stack: string[] | string;
  impact?: string;
  live_link?: string;
  repo_link?: string;
  featured?: boolean;
  created_at: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [editingProject, setEditingProject] =
    React.useState<ProjectItem | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const projectsPerPage = 5;

  const [newProject, setNewProject] = React.useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    long_description: "",
    tech_stack: "",
    impact: "",
    live_link: "",
    repo_link: "",
    featured: false,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const { error } = await supabase.from("projects").insert([
        {
          ...newProject,
          tech_stack: newProject.tech_stack
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
        },
      ]);

      if (error) throw error;

      toast.success("Project added successfully!");
      setNewProject({
        title: "",
        category: "",
        subcategory: "",
        description: "",
        long_description: "",
        tech_stack: "",
        impact: "",
        live_link: "",
        repo_link: "",
        featured: false,
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("projects")
        .update({
          ...editingProject,
          tech_stack: Array.isArray(editingProject.tech_stack)
            ? editingProject.tech_stack
            : editingProject.tech_stack
                .split(",")
                .map((s: string) => s.trim())
                .filter((s: string) => s),
        })
        .eq("id", editingProject.id);

      if (error) throw error;

      toast.success("Project updated!");
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project removed.");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project");
    }
  };

  // Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

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
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
            <form onSubmit={handleAddProject}>
              <DialogHeader>
                <DialogTitle className="font-heading font-black">
                  Add New Project
                </DialogTitle>
                <DialogDescription>
                  Fill in the details for your new case study.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Title
                    </Label>
                    <Input
                      required
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      placeholder="Project Title"
                      className="border-muted"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Category
                    </Label>
                    <Input
                      required
                      value={newProject.category}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          category: e.target.value,
                        })
                      }
                      placeholder="Fintech / AI"
                      className="border-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Subcategory
                    </Label>
                    <Input
                      value={newProject.subcategory}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          subcategory: e.target.value,
                        })
                      }
                      placeholder="B2B / SaaS"
                      className="border-muted"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Impact Metric
                    </Label>
                    <Input
                      value={newProject.impact}
                      onChange={(e) =>
                        setNewProject({ ...newProject, impact: e.target.value })
                      }
                      placeholder="e.g. Processed $10M+"
                      className="border-muted"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold tracking-widest uppercase">
                    Tech Stack (Comma separated)
                  </Label>
                  <Input
                    required
                    value={newProject.tech_stack}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        tech_stack: e.target.value,
                      })
                    }
                    placeholder="Next.js, Tailwind, Supabase"
                    className="border-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold tracking-widest uppercase">
                    Short Description
                  </Label>
                  <Input
                    required
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief overview..."
                    className="border-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold tracking-widest uppercase">
                    Long Case Study Description
                  </Label>
                  <Textarea
                    required
                    value={newProject.long_description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        long_description: e.target.value,
                      })
                    }
                    placeholder="Detailed project breakdown..."
                    className="border-muted min-h-[150px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Live Link
                    </Label>
                    <Input
                      value={newProject.live_link}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          live_link: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="border-muted"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <Switch
                      id="featured"
                      checked={newProject.featured}
                      onCheckedChange={(checked: boolean) =>
                        setNewProject({ ...newProject, featured: checked })
                      }
                    />
                    <Label
                      htmlFor="featured"
                      className="cursor-pointer text-xs font-bold tracking-widest uppercase"
                    >
                      Featured on Home
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full rounded-full font-bold"
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isSaving ? "Saving..." : "Save Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-accent animate-spin" size={40} />
          </div>
        ) : (
          currentProjects.map((project) => (
            <Card
              key={project.id}
              className="group flex flex-col items-center justify-between gap-6 border-none p-6 shadow-lg shadow-black/5 transition-all hover:shadow-black/10 md:flex-row"
            >
              <div className="flex w-full items-center gap-6">
                <div className="bg-accent/10 text-accent group-hover:bg-accent flex h-16 w-16 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                  <FolderKanban size={32} />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <h3 className="font-heading text-lg font-black">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="bg-accent/10 text-accent flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-black uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground line-clamp-1 text-sm">
                    {project.description}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-accent text-[10px] font-bold tracking-wider uppercase">
                      {project.category}
                    </span>
                    <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
                      • {project.subcategory}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Dialog
                  open={!!editingProject && editingProject.id === project.id}
                  onOpenChange={(open) => !open && setEditingProject(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() =>
                        setEditingProject({
                          ...project,
                          tech_stack: Array.isArray(project.tech_stack)
                            ? project.tech_stack.join(", ")
                            : project.tech_stack,
                        })
                      }
                    >
                      <Edit size={18} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
                    <form onSubmit={handleEditProject}>
                      <DialogHeader>
                        <DialogTitle className="font-heading font-black">
                          Edit Project
                        </DialogTitle>
                        <DialogDescription>
                          Update your case study details.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Title
                            </Label>
                            <Input
                              required
                              value={editingProject?.title || ""}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev
                                    ? { ...prev, title: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Category
                            </Label>
                            <Input
                              required
                              value={editingProject?.category || ""}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev
                                    ? { ...prev, category: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Subcategory
                            </Label>
                            <Input
                              value={editingProject?.subcategory || ""}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev
                                    ? { ...prev, subcategory: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Impact Metric
                            </Label>
                            <Input
                              value={editingProject?.impact || ""}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev
                                    ? { ...prev, impact: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs font-bold tracking-widest uppercase">
                            Tech Stack (Comma separated)
                          </Label>
                          <Input
                            required
                            value={editingProject?.tech_stack || ""}
                            onChange={(e) =>
                              setEditingProject((prev) =>
                                prev
                                  ? { ...prev, tech_stack: e.target.value }
                                  : null
                              )
                            }
                            className="border-muted"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs font-bold tracking-widest uppercase">
                            Short Description
                          </Label>
                          <Input
                            required
                            value={editingProject?.description || ""}
                            onChange={(e) =>
                              setEditingProject((prev) =>
                                prev
                                  ? { ...prev, description: e.target.value }
                                  : null
                              )
                            }
                            className="border-muted"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs font-bold tracking-widest uppercase">
                            Long Case Study Description
                          </Label>
                          <Textarea
                            required
                            value={editingProject?.long_description || ""}
                            onChange={(e) =>
                              setEditingProject((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      long_description: e.target.value,
                                    }
                                  : null
                              )
                            }
                            className="border-muted min-h-[150px]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Live Link
                            </Label>
                            <Input
                              value={editingProject?.live_link || ""}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev
                                    ? { ...prev, live_link: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-8">
                            <Switch
                              id="edit-featured"
                              checked={editingProject?.featured || false}
                              onCheckedChange={(checked: boolean) =>
                                setEditingProject((prev) =>
                                  prev ? { ...prev, featured: checked } : null
                                )
                              }
                            />
                            <Label
                              htmlFor="edit-featured"
                              className="cursor-pointer text-xs font-bold tracking-widest uppercase"
                            >
                              Featured on Home
                            </Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="w-full rounded-full font-bold"
                        >
                          {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          {isSaving ? "Updating..." : "Update Project"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive hover:bg-destructive/5 hover:border-destructive h-10 w-10 rounded-lg"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 size={18} />
                </Button>

                {project.live_link && (
                  <Button
                    asChild
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                  >
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </Button>
            <span className="text-sm font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
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
