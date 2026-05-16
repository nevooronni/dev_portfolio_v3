"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderKanban,
  History,
  BarChart,
  ExternalLink,
  Loader2,
  Users,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface DashboardStats {
  projects: number;
  experiences: number;
  metrics: number;
  loading: boolean;
}

interface AnalyticsStats {
  dau: number;
  wau: number;
  mau: number;
  rawCvClicks: number;
  uniqueCvClicks: number;
  topPages: { path: string; count: number }[];
  topProjects: { path: string; count: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = React.useState<DashboardStats>({
    projects: 0,
    experiences: 0,
    metrics: 0,
    loading: true,
  });

  const [analytics, setAnalytics] = React.useState<AnalyticsStats>({
    dau: 0,
    wau: 0,
    mau: 0,
    rawCvClicks: 0,
    uniqueCvClicks: 0,
    topPages: [],
    topProjects: [],
  });

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [
          projectsRes,
          experienceRes,
          metricsRes,
          recentRes,
          analyticsRes,
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase
            .from("experiences")
            .select("*", { count: "exact", head: true }),
          supabase.from("metrics").select("*", { count: "exact", head: true }),
          supabase
            .from("projects")
            .select("id, title, category")
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("analytics_events")
            .select("*")
            .gte("created_at", thirtyDaysAgo.toISOString()),
        ]);

        setStats({
          projects: projectsRes.count || 0,
          experiences: experienceRes.count || 0,
          metrics: metricsRes.count || 0,
          loading: false,
        });

        if (analyticsRes.data) {
          const events = analyticsRes.data;
          const now = new Date();
          const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          const sevenDaysAgo = new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          );

          const visitors24h = new Set();
          const visitors7d = new Set();
          const visitors30d = new Set();
          let rawCv = 0;
          const uniqueCvVisitors = new Set();
          const pageViews: Record<string, number> = {};
          const projectClicks: Record<string, number> = {};

          events.forEach(
            (ev: {
              visitor_id: string;
              created_at: string;
              event_type: string;
              path: string;
            }) => {
              const evDate = new Date(ev.created_at);
              if (evDate >= oneDayAgo) visitors24h.add(ev.visitor_id);
              if (evDate >= sevenDaysAgo) visitors7d.add(ev.visitor_id);
              visitors30d.add(ev.visitor_id);

              if (ev.event_type === "cv_click") {
                rawCv++;
                uniqueCvVisitors.add(ev.visitor_id);
              } else if (ev.event_type === "page_view") {
                pageViews[ev.path] = (pageViews[ev.path] || 0) + 1;
              } else if (ev.event_type === "outbound_link") {
                projectClicks[ev.path] = (projectClicks[ev.path] || 0) + 1;
              }
            }
          );

          const topPages = Object.entries(pageViews)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([path, count]) => ({ path, count }));

          const topProjects = Object.entries(projectClicks)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([path, count]) => ({ path, count }));

          setAnalytics({
            dau: visitors24h.size,
            wau: visitors7d.size,
            mau: visitors30d.size,
            rawCvClicks: rawCv,
            uniqueCvClicks: uniqueCvVisitors.size,
            topPages,
            topProjects,
          });
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-heading mb-2 text-3xl font-black tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground font-medium">
            Welcome back, Neville. Here&apos;s a snapshot of your professional
            presence and site analytics.
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

      <h2 className="font-heading mt-8 mb-4 text-2xl font-bold">
        Traffic & Engagement
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-accent/5 border-l-accent border-l-4 border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              DAU
            </CardTitle>
            <Users className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                analytics.dau
              )}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Daily Active Users
            </p>
          </CardContent>
        </Card>

        <Card className="bg-accent/5 border-l-accent border-l-4 border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              WAU
            </CardTitle>
            <Users className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                analytics.wau
              )}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Weekly Active Users
            </p>
          </CardContent>
        </Card>

        <Card className="bg-accent/5 border-l-accent border-l-4 border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              MAU
            </CardTitle>
            <Users className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                analytics.mau
              )}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Monthly Active Users
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-l-primary border-l-4 border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              CV Downloads
            </CardTitle>
            <FileText className="text-primary" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading flex items-baseline gap-2 text-3xl font-black">
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                analytics.uniqueCvClicks
              )}
              <span className="text-muted-foreground text-sm font-normal">
                unique
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {analytics.rawCvClicks} total raw clicks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="font-heading font-bold">
              Top Pages Viewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="text-accent animate-spin" />
                </div>
              ) : analytics.topPages.length > 0 ? (
                analytics.topPages.map((page, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="font-mono text-sm font-medium">
                      {page.path}
                    </div>
                    <div className="text-accent bg-accent/10 rounded px-2 py-0.5 text-xs font-black">
                      {page.count} views
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  No page view data.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="font-heading font-bold">
              Top Project Engagements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="text-accent animate-spin" />
                </div>
              ) : analytics.topProjects.length > 0 ? (
                analytics.topProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="max-w-[70%] truncate text-sm font-medium">
                      {proj.path}
                    </div>
                    <div className="text-primary bg-primary/10 rounded px-2 py-0.5 text-xs font-black">
                      {proj.count} clicks
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  No project click data.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="font-heading mt-12 mb-4 text-2xl font-bold">
        Content Overview
      </h2>
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
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.projects
              )}
            </div>
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
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.experiences
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              Strategic Metrics
            </CardTitle>
            <BarChart className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-black">
              {stats.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                stats.metrics
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
