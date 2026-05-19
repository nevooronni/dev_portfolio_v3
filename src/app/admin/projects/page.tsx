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
  Upload,
  X,
  Image,
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
import { RichTextEditor } from "@/components/admin/RichTextEditor";
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
  show_case_study?: boolean;
  image_url?: string | null;
  is_hidden?: boolean;
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

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

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
    show_case_study: false,
    image_url: "",
    is_hidden: false,
  });

  const [isUploading, setIsUploading] = React.useState(false);
  const addFileInputRef = React.useRef<HTMLInputElement>(null);
  const editFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File, isEdit: boolean) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `project_${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(fileName);

      if (isEdit) {
        setEditingProject((prev) =>
          prev ? { ...prev, image_url: publicUrl } : null
        );
      } else {
        setNewProject((prev) => ({ ...prev, image_url: publicUrl }));
      }

      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (addFileInputRef.current) addFileInputRef.current.value = "";
      if (editFileInputRef.current) editFileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (isEdit: boolean) => {
    if (isEdit) {
      setEditingProject((prev) => (prev ? { ...prev, image_url: null } : null));
    } else {
      setNewProject((prev) => ({ ...prev, image_url: "" }));
    }
    toast.success("Image removed.");
  };

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
        show_case_study: false,
        image_url: "",
        is_hidden: false,
      });
      setIsAddModalOpen(false);
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
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
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
                    Project Image (Optional)
                  </Label>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={addFileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, false);
                      }}
                    />

                    {newProject.image_url ? (
                      <div className="group border-muted bg-muted relative aspect-video max-h-[200px] overflow-hidden rounded-xl border">
                        <img
                          src={newProject.image_url}
                          alt="Project preview"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="gap-1 rounded-full font-bold"
                            onClick={() => handleRemoveImage(false)}
                          >
                            <X size={14} /> Remove Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => addFileInputRef.current?.click()}
                        className="border-muted bg-muted/30 hover:bg-muted/50 hover:border-accent flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all duration-300"
                      >
                        {isUploading ? (
                          <Loader2
                            className="text-accent mb-2 animate-spin"
                            size={24}
                          />
                        ) : (
                          <Upload
                            className="text-muted-foreground mb-2"
                            size={24}
                          />
                        )}
                        <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                          {isUploading
                            ? "Uploading file..."
                            : "Click to upload image"}
                        </span>
                        <span className="text-muted-foreground mt-1 text-[10px]">
                          PNG, JPG, WEBP up to 5MB
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold tracking-widest uppercase">
                    Long Case Study Description
                  </Label>
                  <RichTextEditor
                    value={newProject.long_description}
                    onChange={(value) =>
                      setNewProject({
                        ...newProject,
                        long_description: value,
                      })
                    }
                    placeholder="Detailed project breakdown..."
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
                  <div className="grid grid-cols-3 gap-4">
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
                        Featured
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 pt-8">
                      <Switch
                        id="show_case_study"
                        checked={newProject.show_case_study}
                        onCheckedChange={(checked: boolean) =>
                          setNewProject({
                            ...newProject,
                            show_case_study: checked,
                          })
                        }
                      />
                      <Label
                        htmlFor="show_case_study"
                        className="cursor-pointer text-xs font-bold tracking-widest uppercase"
                      >
                        Case Study
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 pt-8">
                      <Switch
                        id="is_hidden"
                        checked={newProject.is_hidden}
                        onCheckedChange={(checked: boolean) =>
                          setNewProject({
                            ...newProject,
                            is_hidden: checked,
                          })
                        }
                      />
                      <Label
                        htmlFor="is_hidden"
                        className="text-destructive cursor-pointer text-xs font-bold tracking-widest uppercase"
                      >
                        Hide
                      </Label>
                    </div>
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
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${
                        project.show_case_study === true
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }`}
                    >
                      • Case Study:{" "}
                      {project.show_case_study === true ? "Visible" : "Hidden"}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${
                        project.is_hidden === true
                          ? "text-destructive font-black"
                          : "text-emerald-500"
                      }`}
                    >
                      • Status:{" "}
                      {project.is_hidden === true ? "Hidden" : "Public"}
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
                            Project Image (Optional)
                          </Label>
                          <div className="flex flex-col gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              ref={editFileInputRef}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file, true);
                              }}
                            />

                            {editingProject?.image_url ? (
                              <div className="group border-muted bg-muted relative aspect-video max-h-[200px] overflow-hidden rounded-xl border">
                                <img
                                  src={editingProject.image_url}
                                  alt="Project preview"
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="gap-1 rounded-full font-bold"
                                    onClick={() => handleRemoveImage(true)}
                                  >
                                    <X size={14} /> Remove Image
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  editFileInputRef.current?.click()
                                }
                                className="border-muted bg-muted/30 hover:bg-muted/50 hover:border-accent flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all duration-300"
                              >
                                {isUploading ? (
                                  <Loader2
                                    className="text-accent mb-2 animate-spin"
                                    size={24}
                                  />
                                ) : (
                                  <Upload
                                    className="text-muted-foreground mb-2"
                                    size={24}
                                  />
                                )}
                                <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                                  {isUploading
                                    ? "Uploading file..."
                                    : "Click to upload image"}
                                </span>
                                <span className="text-muted-foreground mt-1 text-[10px]">
                                  PNG, JPG, WEBP up to 5MB
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs font-bold tracking-widest uppercase">
                            Long Case Study Description
                          </Label>
                          <RichTextEditor
                            value={editingProject?.long_description || ""}
                            onChange={(value) =>
                              setEditingProject((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      long_description: value,
                                    }
                                  : null
                              )
                            }
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
                          <div className="grid grid-cols-3 gap-4">
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
                                Featured
                              </Label>
                            </div>
                            <div className="flex items-center gap-2 pt-8">
                              <Switch
                                id="edit-show-case-study"
                                checked={
                                  editingProject?.show_case_study || false
                                }
                                onCheckedChange={(checked: boolean) =>
                                  setEditingProject((prev) =>
                                    prev
                                      ? { ...prev, show_case_study: checked }
                                      : null
                                  )
                                }
                              />
                              <Label
                                htmlFor="edit-show-case-study"
                                className="cursor-pointer text-xs font-bold tracking-widest uppercase"
                              >
                                Case Study
                              </Label>
                            </div>
                            <div className="flex items-center gap-2 pt-8">
                              <Switch
                                id="edit-is-hidden"
                                checked={editingProject?.is_hidden || false}
                                onCheckedChange={(checked: boolean) =>
                                  setEditingProject((prev) =>
                                    prev
                                      ? { ...prev, is_hidden: checked }
                                      : null
                                  )
                                }
                              />
                              <Label
                                htmlFor="edit-is-hidden"
                                className="text-destructive cursor-pointer text-xs font-bold tracking-widest uppercase"
                              >
                                Hide
                              </Label>
                            </div>
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
