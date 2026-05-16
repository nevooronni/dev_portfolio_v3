"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export function useAnalytics() {
  const pathname = usePathname();

  const getVisitorId = useCallback(() => {
    if (typeof window === "undefined") return null;
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }
    return visitorId;
  }, []);

  const trackEvent = useCallback(
    async (eventType: string, path: string) => {
      const visitorId = getVisitorId();
      if (!visitorId) return;

      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitor_id: visitorId,
            event_type: eventType,
            path,
          }),
        });
      } catch (error) {
        console.error("Analytics tracking failed:", error);
      }
    },
    [getVisitorId]
  );

  // Automatically track page views
  useEffect(() => {
    if (pathname) {
      trackEvent("page_view", pathname);
    }
  }, [pathname, trackEvent]);

  return { trackEvent };
}
