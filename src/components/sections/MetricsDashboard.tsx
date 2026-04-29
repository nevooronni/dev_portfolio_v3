"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { metrics } from "@/data/metrics";

export function MetricsDashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="impact" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h2 className="font-heading mb-4 text-3xl font-black md:text-5xl">
            Strategic Value & ROI
          </h2>
          <p className="text-muted-foreground max-w-2xl text-xl">
            Quantifiable impact on innovation, revenue, performance, and
            engineering excellence delivered across major fintech and logistics
            platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <Card
              key={metric.id}
              className="overflow-hidden border-none shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-heading mb-1 text-xl font-bold">
                      {metric.label}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {metric.description}
                    </CardDescription>
                  </div>
                  <div className="font-heading text-accent text-3xl font-black">
                    {metric.value}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-64 pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  {index % 2 === 0 ? (
                    <BarChart data={metric.chartData} accessibilityLayer>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        hide
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="currentColor"
                        radius={[6, 6, 0, 0]}
                        className="fill-accent"
                        aria-label={`${metric.label} chart`}
                      />
                    </BarChart>
                  ) : (
                    <LineChart data={metric.chartData} accessibilityLayer>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="currentColor"
                        strokeWidth={4}
                        dot={{
                          r: 6,
                          fill: "#2563EB",
                          strokeWidth: 2,
                          stroke: "#fff",
                        }}
                        className="stroke-accent"
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
