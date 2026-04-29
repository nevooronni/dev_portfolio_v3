"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  Briefcase,
  History,
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

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[] | string;
  skills: string[] | string;
  impact_metric?: string;
  created_at: string;
}
import { siteMetadata } from "@/data/metadata";

export default function AdminExperience() {
  const [experiences, setExperiences] = React.useState<ExperienceItem[]>([]);
  const [cvLink, setCvLink] = React.useState(siteMetadata.resumeUrl);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Form State
  const [newRole, setNewRole] = React.useState({
    company: "",
    role: "",
    period: "",
    location: "",
    impact_metric: "",
    description: "",
    skills: "",
  });

  const [editingRole, setEditingRole] = React.useState<ExperienceItem | null>(
    null
  );
  const [timestamp, setTimestamp] = React.useState(0);
  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setExperiences(data || []);
    } catch (err) {
      console.error("Error fetching experiences:", err);
      toast.error("Failed to fetch experiences");
    } finally {
    }
  };
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExperiences();
    setTimestamp(Date.now());
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    try {
      setIsUploading(true);

      const { error } = await supabase.storage
        .from("resumes")
        .upload("resume.pdf", file, {
          cacheControl: "0",
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("resumes").getPublicUrl("resume.pdf");

      setCvLink(publicUrl);
      toast.success("Resume uploaded and replaced successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const { error } = await supabase.from("experiences").insert([
        {
          company: newRole.company,
          role: newRole.role,
          period: newRole.period,
          location: newRole.location,
          impact_metric: newRole.impact_metric,
          description: newRole.description.split("\n").filter((d) => d.trim()),
          skills: newRole.skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
        },
      ]);

      if (error) throw error;

      toast.success("Role added successfully!");
      setNewRole({
        company: "",
        role: "",
        period: "",
        location: "",
        impact_metric: "",
        description: "",
        skills: "",
      });
      fetchExperiences();
    } catch (err) {
      toast.error("Failed to add role");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRole) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("experiences")
        .update({
          company: editingRole.company,
          role: editingRole.role,
          period: editingRole.period,
          location: editingRole.location,
          impact_metric: editingRole.impact_metric,
          description: Array.isArray(editingRole.description)
            ? editingRole.description
            : (editingRole.description as string)
                .split("\n")
                .filter((d: string) => d.trim()),
          skills: Array.isArray(editingRole.skills)
            ? editingRole.skills
            : (editingRole.skills as string)
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
        })
        .eq("id", editingRole.id);

      if (error) throw error;
      toast.success("Role updated successfully!");
      setEditingRole(null);
      fetchExperiences();
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setExperiences((prev) => prev.filter((e) => e.id !== id));
      toast.success("Experience item removed.");
    } catch (err) {
      toast.error("Failed to save experience");
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-heading mb-2 text-3xl font-black tracking-tight">
            Professional Experience
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your career history and resume assets.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow-accent/20 gap-2 rounded-full font-bold shadow-lg">
              <Plus size={18} /> Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleAddExperience}>
              <DialogHeader>
                <DialogTitle className="font-heading font-black">
                  Add Professional Role
                </DialogTitle>
                <DialogDescription>
                  Detail your contributions and impact at a specific
                  organization.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                      Company
                    </label>
                    <Input
                      required
                      value={newRole.company}
                      onChange={(e) =>
                        setNewRole({ ...newRole, company: e.target.value })
                      }
                      placeholder="e.g. Lemonade Payments"
                      className="border-muted"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                      Role
                    </label>
                    <Input
                      required
                      value={newRole.role}
                      onChange={(e) =>
                        setNewRole({ ...newRole, role: e.target.value })
                      }
                      placeholder="e.g. Engineering Lead"
                      className="border-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                      Period
                    </label>
                    <Input
                      required
                      value={newRole.period}
                      onChange={(e) =>
                        setNewRole({ ...newRole, period: e.target.value })
                      }
                      placeholder="e.g. Jan 2024 — Present"
                      className="border-muted"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                      Location
                    </label>
                    <Input
                      required
                      value={newRole.location}
                      onChange={(e) =>
                        setNewRole({ ...newRole, location: e.target.value })
                      }
                      placeholder="Nairobi, Kenya"
                      className="border-muted"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                    Impact Metric
                  </label>
                  <Input
                    value={newRole.impact_metric}
                    onChange={(e) =>
                      setNewRole({ ...newRole, impact_metric: e.target.value })
                    }
                    placeholder="e.g. 50% YoY Revenue Growth"
                    className="border-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                    Skills (Comma separated)
                  </label>
                  <Input
                    value={newRole.skills}
                    onChange={(e) =>
                      setNewRole({ ...newRole, skills: e.target.value })
                    }
                    placeholder="Next.js, TypeScript, AWS"
                    className="border-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                    Key Responsibilities (One per line)
                  </label>
                  <Textarea
                    required
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    placeholder="Led architectural decisions..."
                    className="border-muted min-h-[120px] resize-none"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full rounded-full font-bold"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isSaving ? "Saving..." : "Save Experience"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* CV Management */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 font-bold">
                <Briefcase className="text-accent" size={24} /> Resume PDF
              </CardTitle>
              <CardDescription>
                The primary document for downloads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-2">
                  <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                    Upload & Replace Resume (PDF)
                  </label>
                  <div className="flex flex-col gap-3">
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                    <Button
                      type="button"
                      className="shadow-accent/20 bg-accent hover:bg-accent/90 w-full gap-2 rounded-xl font-bold shadow-lg"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Plus size={16} />
                      )}
                      {isUploading ? "Uploading..." : "Upload New Version"}
                    </Button>
                    <p className="text-muted-foreground text-[10px] leading-tight italic">
                      Uploading a new file will automatically replace your
                      current resume across the entire site.
                    </p>
                  </div>
                </div>

                <div className="border-border border-t pt-6">
                  <div className="grid gap-2">
                    <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                      Current Live Resume
                    </label>
                    <Button
                      variant="outline"
                      className="w-full gap-2 font-bold"
                      asChild
                    >
                      {/* Using a mount-time timestamp to satisfy purity rules while providing a fresh link */}
                      <a
                        href={`${cvLink}?t=${timestamp}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={16} /> View External Link
                      </a>
                    </Button>
                    <div className="bg-muted/50 mt-2 flex items-start gap-2 rounded-lg border border-dashed p-3">
                      <ExternalLink
                        className="text-muted-foreground mt-0.5 shrink-0"
                        size={14}
                      />
                      <span className="text-muted-foreground text-[10px] leading-relaxed font-medium break-all">
                        {cvLink}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience List */}
        <div className="space-y-4 lg:col-span-2">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              className="group flex items-center justify-between gap-6 border-none p-6 shadow-lg shadow-black/5 transition-all hover:shadow-black/10"
            >
              <div className="flex flex-1 items-start gap-4">
                <div className="bg-accent/10 text-accent group-hover:bg-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                  <History size={24} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <h3 className="font-heading text-lg font-black">
                      {exp.company}
                    </h3>
                    <span className="text-muted-foreground text-xs font-bold">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-accent text-sm font-bold">{exp.role}</p>
                  <p className="text-muted-foreground mt-1 text-xs font-medium">
                    {exp.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Array.isArray(exp.skills) &&
                      exp.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="bg-muted rounded px-2 py-0.5 text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    {Array.isArray(exp.skills) && exp.skills.length > 3 && (
                      <span className="text-muted-foreground text-[10px] font-medium">
                        +{exp.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  {exp.impact_metric && (
                    <div className="bg-accent/5 text-accent border-accent/10 mt-3 rounded-lg border px-3 py-2 text-[10px] font-bold tracking-wider uppercase">
                      Impact: {exp.impact_metric}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Dialog
                  open={!!editingRole && editingRole.id === exp.id}
                  onOpenChange={(open) => !open && setEditingRole(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      onClick={() =>
                        setEditingRole({
                          ...exp,
                          description: Array.isArray(exp.description)
                            ? exp.description.join("\n")
                            : exp.description,
                          skills: Array.isArray(exp.skills)
                            ? exp.skills.join(", ")
                            : exp.skills,
                        })
                      }
                    >
                      <Edit size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <form onSubmit={handleEditExperience}>
                      <DialogHeader>
                        <DialogTitle className="font-heading font-black">
                          Edit Professional Role
                        </DialogTitle>
                        <DialogDescription>
                          Update your contributions and impact.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                              Company
                            </label>
                            <Input
                              required
                              value={editingRole?.company || ""}
                              onChange={(e) =>
                                setEditingRole((prev) =>
                                  prev
                                    ? { ...prev, company: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                              Role
                            </label>
                            <Input
                              required
                              value={editingRole?.role || ""}
                              onChange={(e) =>
                                setEditingRole((prev) =>
                                  prev
                                    ? { ...prev, role: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                              Period
                            </label>
                            <Input
                              required
                              value={editingRole?.period || ""}
                              onChange={(e) =>
                                setEditingRole((prev) =>
                                  prev
                                    ? { ...prev, period: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                              Location
                            </label>
                            <Input
                              required
                              value={editingRole?.location || ""}
                              onChange={(e) =>
                                setEditingRole((prev) =>
                                  prev
                                    ? { ...prev, location: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                            Impact Metric
                          </label>
                          <Input
                            value={editingRole?.impact_metric || ""}
                            onChange={(e) =>
                              setEditingRole((prev) =>
                                prev
                                  ? { ...prev, impact_metric: e.target.value }
                                  : null
                              )
                            }
                            className="border-muted"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                            Skills (Comma separated)
                          </label>
                          <Input
                            value={editingRole?.skills || ""}
                            onChange={(e) =>
                              setEditingRole((prev) =>
                                prev
                                  ? { ...prev, skills: e.target.value }
                                  : null
                              )
                            }
                            className="border-muted"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                            Key Responsibilities (One per line)
                          </label>
                          <Textarea
                            required
                            value={editingRole?.description || ""}
                            onChange={(e) =>
                              setEditingRole((prev) =>
                                prev
                                  ? { ...prev, description: e.target.value }
                                  : null
                              )
                            }
                            className="border-muted min-h-[120px] resize-none"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="w-full rounded-full font-bold"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          {isSaving ? "Updating..." : "Update Experience"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive hover:bg-destructive/5 hover:border-destructive h-9 w-9 rounded-lg"
                  onClick={() => handleDelete(exp.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
