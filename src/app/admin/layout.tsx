"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  History,
  BarChart,
  LogOut,
  Terminal,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (session) {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (session) {
        setAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="bg-muted/30 flex min-h-screen items-center justify-center">
        <div className="border-accent h-12 w-12 animate-spin rounded-full border-b-2" />
      </div>
    );
  }

  if (!authenticated && pathname !== "/admin/login") return null;
  if (pathname === "/admin/login") return <>{children}</>;

  const sidebarItems = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Experience",
      href: "/admin/experience",
      icon: <History size={20} />,
    },
    { name: "Metrics", href: "/admin/metrics", icon: <BarChart size={20} /> },
  ];

  return (
    <div className="bg-muted/10 flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-card border-border flex w-64 flex-col border-r pt-8">
        <Link href="/" className="mb-12 flex items-center gap-2 px-6">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            <Terminal size={16} />
          </div>
          <span className="font-heading font-black tracking-tight">
            Admin Console
          </span>
        </Link>

        <nav className="flex-1 space-y-1 px-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200",
                  isActive
                    ? "bg-accent shadow-accent/20 text-white shadow-lg"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="border-border border-t p-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 w-full justify-start gap-3 font-bold"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
