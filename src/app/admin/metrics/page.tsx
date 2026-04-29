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
import { TrendingUp, Edit, Trash2, Plus, Loader2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";

interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
  chart_data: { name: string; value: number }[] | string;
  created_at: string;
}

export default function AdminMetrics() {
  const [metrics, setMetrics] = React.useState<Metric[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [editingMetric, setEditingMetric] = React.useState<Metric | null>(null);

  const [newMetric, setNewMetric] = React.useState({
    label: "",
    value: "",
    description: "",
    chart_data: "[]",
  });

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("metrics")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMetrics(data || []);
    } catch (err) {
      console.error("Error fetching metrics:", err);
      toast.error("Failed to fetch metrics");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMetrics();
  }, []);

  const handleAddMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      let parsedChartData = [];
      try {
        parsedChartData = JSON.parse(newMetric.chart_data);
      } catch (err) {
        toast.error("Invalid JSON in Chart Data");
        return;
      }

      const { error } = await supabase.from("metrics").insert([
        {
          label: newMetric.label,
          value: newMetric.value,
          description: newMetric.description,
          chart_data: parsedChartData,
        },
      ]);

      if (error) throw error;
      toast.success("Metric added successfully!");
      setNewMetric({ label: "", value: "", description: "", chart_data: "[]" });
      fetchMetrics();
    } catch (err) {
      console.error("Error adding metric:", err);
      toast.error("Failed to add metric");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMetric) return;

    try {
      setIsSaving(true);
      let parsedChartData = [];
      try {
        parsedChartData =
          typeof editingMetric.chart_data === "string"
            ? JSON.parse(editingMetric.chart_data)
            : editingMetric.chart_data;
      } catch (err) {
        toast.error("Invalid JSON in Chart Data");
        return;
      }

      const { error } = await supabase
        .from("metrics")
        .update({
          label: editingMetric.label,
          value: editingMetric.value,
          description: editingMetric.description,
          chart_data: parsedChartData,
        })
        .eq("id", editingMetric.id);

      if (error) throw error;
      toast.success("Metric updated!");
      setEditingMetric(null);
      fetchMetrics();
    } catch (err) {
      console.error("Error updating metric:", err);
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this metric?")) return;
    try {
      const { error } = await supabase.from("metrics").delete().eq("id", id);
      if (error) throw error;
      setMetrics((prev) => prev.filter((m) => m.id !== id));
      toast.success("Metric removed.");
    } catch (err) {
      console.error("Error deleting metric:", err);
      toast.error("Failed to delete metric");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-accent animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-heading mb-2 text-3xl font-black tracking-tight">
            Strategic Metrics
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage the impact data displayed across your portfolio.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow-accent/20 gap-2 rounded-full font-bold shadow-lg">
              <Plus size={18} /> New Metric
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleAddMetric}>
              <DialogHeader>
                <DialogTitle className="font-heading font-black">
                  Add New Strategic Metric
                </DialogTitle>
                <DialogDescription>
                  Enter quantifiable impact data and trend visualization points.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Label
                    </Label>
                    <Input
                      required
                      value={newMetric.label}
                      onChange={(e) =>
                        setNewMetric({ ...newMetric, label: e.target.value })
                      }
                      placeholder="e.g. Revenue Growth"
                      className="border-muted"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold tracking-widest uppercase">
                      Value
                    </Label>
                    <Input
                      required
                      value={newMetric.value}
                      onChange={(e) =>
                        setNewMetric({ ...newMetric, value: e.target.value })
                      }
                      placeholder="e.g. 110%"
                      className="border-muted"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold tracking-widest uppercase">
                    Description
                  </Label>
                  <Textarea
                    required
                    value={newMetric.description}
                    onChange={(e) =>
                      setNewMetric({
                        ...newMetric,
                        description: e.target.value,
                      })
                    }
                    placeholder="Briefly explain the significance of this metric"
                    className="border-muted resize-none"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold tracking-widest uppercase">
                    Chart Data (JSON Array)
                  </Label>
                  <Textarea
                    required
                    value={newMetric.chart_data}
                    onChange={(e) =>
                      setNewMetric({ ...newMetric, chart_data: e.target.value })
                    }
                    placeholder='[{"name": "Jan", "value": 10}, {"name": "Feb", "value": 20}]'
                    className="border-muted font-mono text-xs"
                  />
                  <p className="text-muted-foreground text-[10px]">
                    Must be a valid JSON array of objects with &quot;name&quot;
                    (string) and &quot;value&quot; (number) keys.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full font-bold"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Save Metric"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className="overflow-hidden border-none shadow-lg shadow-black/5"
          >
            <CardHeader className="bg-accent/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading flex items-center gap-2 font-bold">
                  <TrendingUp className="text-accent" size={18} />{" "}
                  {metric.label}
                </CardTitle>
                <div className="flex gap-2">
                  <Dialog
                    open={!!editingMetric && editingMetric.id === metric.id}
                    onOpenChange={(open) => !open && setEditingMetric(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setEditingMetric({
                            ...metric,
                            chart_data: JSON.stringify(metric.chart_data),
                          })
                        }
                      >
                        <Edit size={14} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <form onSubmit={handleEditMetric}>
                        <DialogHeader>
                          <DialogTitle className="font-heading font-black">
                            Edit Strategic Metric
                          </DialogTitle>
                          <DialogDescription>
                            Update the label, value, or visualization data.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label className="text-xs font-bold tracking-widest uppercase">
                                Label
                              </Label>
                              <Input
                                required
                                value={editingMetric?.label || ""}
                                onChange={(e) =>
                                  setEditingMetric((prev) =>
                                    prev
                                      ? { ...prev, label: e.target.value }
                                      : null
                                  )
                                }
                                className="border-muted"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label className="text-xs font-bold tracking-widest uppercase">
                                Value
                              </Label>
                              <Input
                                required
                                value={editingMetric?.value || ""}
                                onChange={(e) =>
                                  setEditingMetric((prev) =>
                                    prev
                                      ? { ...prev, value: e.target.value }
                                      : null
                                  )
                                }
                                className="border-muted"
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Description
                            </Label>
                            <Textarea
                              required
                              value={editingMetric?.description || ""}
                              onChange={(e) =>
                                setEditingMetric((prev) =>
                                  prev
                                    ? { ...prev, description: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted resize-none"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold tracking-widest uppercase">
                              Chart Data (JSON Array)
                            </Label>
                            <Textarea
                              required
                              value={
                                typeof editingMetric?.chart_data === "string"
                                  ? editingMetric.chart_data
                                  : JSON.stringify(editingMetric?.chart_data)
                              }
                              onChange={(e) =>
                                setEditingMetric((prev) =>
                                  prev
                                    ? { ...prev, chart_data: e.target.value }
                                    : null
                                )
                              }
                              className="border-muted font-mono text-xs"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="w-full font-bold"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              "Update Metric"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    onClick={() => handleDelete(metric.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-accent text-2xl font-black">
                {metric.value}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {metric.description}
              </p>

              <div className="bg-muted/30 flex h-32 items-end gap-2 rounded-lg p-4">
                {Array.isArray(metric.chart_data) &&
                  metric.chart_data.map((data, i) => (
                    <div
                      key={i}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className="bg-accent/40 hover:bg-accent w-full rounded-t-sm transition-all"
                        style={{
                          height: `${
                            (data.value /
                              Math.max(
                                ...(
                                  metric.chart_data as {
                                    name: string;
                                    value: number;
                                  }[]
                                ).map((d) => d.value)
                              )) *
                            100
                          }%`,
                        }}
                      />
                      <span className="text-muted-foreground w-full truncate text-center text-[8px] font-bold uppercase">
                        {data.name}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
