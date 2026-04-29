"use client";

import * as React from "react";
import { metrics as initialMetrics, Metric } from "@/data/metrics";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminMetrics() {
  const [metrics, setMetrics] = React.useState<Metric[]>(initialMetrics);

  const handleDelete = (id: string) => {
    setMetrics(metrics.filter((m) => m.id !== id));
    toast.success("Metric removed.");
  };

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
        <Button className="shadow-accent/20 gap-2 rounded-full font-bold shadow-lg">
          <Plus size={18} /> New Metric
        </Button>
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
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit size={14} />
                  </Button>
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
                {metric.chartData.map((data, i) => (
                  <div
                    key={i}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="bg-accent/40 hover:bg-accent w-full rounded-t-sm transition-all"
                      style={{
                        height: `${(data.value / Math.max(...metric.chartData.map((d) => d.value))) * 100}%`,
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
