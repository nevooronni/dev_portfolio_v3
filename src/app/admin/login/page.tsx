"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Terminal } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back, Neville.");
      router.push("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="text-center">
          <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
            <Terminal size={24} />
          </div>
          <CardTitle className="font-heading text-2xl font-black tracking-tight">
            Security Checkpoint
          </CardTitle>
          <CardDescription>
            Admin access is restricted to Neville Oronni.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
                Email
              </label>
              <Input
                type="email"
                placeholder="nevooronni@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-muted h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-muted h-12"
              />
            </div>
            <Button
              type="submit"
              className="shadow-accent/20 h-12 w-full rounded-full font-bold shadow-lg"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Authorize Access"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
