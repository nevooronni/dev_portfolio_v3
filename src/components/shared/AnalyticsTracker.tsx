"use client";

import { useAnalytics } from "@/hooks/useAnalytics";

export function AnalyticsTracker() {
  // This will automatically initialize tracking on mount and path changes
  useAnalytics();
  return null;
}
