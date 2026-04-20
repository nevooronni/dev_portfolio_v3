"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FolderKanban,
  History,
  BarChart,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-heading mb-2 text-3xl font-black tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground font-medium">
            Welcome back, Neville. Here&apos;s a snapshot of your professional
            presence.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="text-accent mb-2 flex items-center gap-2 text-sm font-bold hover:underline"
        >
          View Live Portfolio <ExternalLink size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              Total Projects
            </CardTitle>
            <FolderKanban className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">
              {projects.length}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              3 featured on homepage
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              Experience Items
            </CardTitle>
            <History className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">
              {experiences.length}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Spanning 7+ years
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              Avg. Impact ROI
            </CardTitle>
            <BarChart className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">37%</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Across primary metrics
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="font-heading font-bold">
              Quick Actions
            </CardTitle>
            <CardDescription>
              Commonly used content management tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/projects"
              className="group bg-muted/50 border-border hover:border-accent hover:bg-accent/5 rounded-xl border p-4 transition-all"
            >
              <div className="mb-1 flex items-center justify-between font-bold">
                Add Project{" "}
                <TrendingUp
                  size={16}
                  className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
              <div className="text-muted-foreground text-xs">
                Update your portfolio history.
              </div>
            </Link>
            <Link
              href="/admin/experience"
              className="group bg-muted/50 border-border hover:border-accent hover:bg-accent/5 rounded-xl border p-4 transition-all"
            >
              <div className="mb-1 flex items-center justify-between font-bold">
                Update Resume{" "}
                <TrendingUp
                  size={16}
                  className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
              <div className="text-muted-foreground text-xs">
                Add new roles or achievements.
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="font-heading font-bold">
              Recent Projects
            </CardTitle>
            <CardDescription>
              The latest items in your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
                >
                  <div className="text-sm font-bold">{project.title}</div>
                  <div className="text-accent bg-accent/10 rounded px-2 py-0.5 text-[10px] font-black uppercase">
                    {project.category}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
