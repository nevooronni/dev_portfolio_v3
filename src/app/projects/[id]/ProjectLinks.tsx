"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ProjectLinksProps {
  liveLink?: string;
  repoLink?: string;
  title: string;
}

export function ProjectLinks({ liveLink, repoLink, title }: ProjectLinksProps) {
  const { trackEvent } = useAnalytics();

  if ((!liveLink || liveLink === "#") && (!repoLink || repoLink === "#")) {
    return null;
  }

  return (
    <div className="mb-12 flex flex-wrap gap-4">
      {liveLink && liveLink !== "#" && (
        <Button
          asChild
          size="lg"
          className="shadow-accent/20 h-12 rounded-full px-8 text-base shadow-xl"
        >
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("outbound_link", `Live: ${title}`)}
          >
            View Live Project <ExternalLink size={18} className="ml-2" />
          </a>
        </Button>
      )}
      {repoLink && repoLink !== "#" && (
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 rounded-full border-2 px-8 text-base"
        >
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("outbound_link", `Repo: ${title}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Source Code
          </a>
        </Button>
      )}
    </div>
  );
}
