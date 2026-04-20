import NextLink from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <NextLink href="/" className="group mb-6 flex items-center gap-2">
              <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-white transition-colors duration-300">
                <Terminal size={20} />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Neville Oronni
              </span>
            </NextLink>
            <p className="text-primary-foreground/70 mb-8 max-w-sm leading-relaxed">
              Engineering Team Leader specializing in architecting
              mission-critical backends and scaling fintech platforms across
              global markets. Let&apos;s build something exceptional.
            </p>
            <div className="flex gap-5">
              <NextLink
                href="https://github.com"
                className="hover:text-accent transition-colors"
                aria-label="Visit GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </NextLink>
              <NextLink
                href="https://linkedin.com"
                className="hover:text-accent transition-colors"
                aria-label="Visit LinkedIn Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </NextLink>
              <NextLink
                href="https://twitter.com"
                className="hover:text-accent transition-colors"
                aria-label="Visit Twitter Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </NextLink>
            </div>
          </div>

          <div>
            <h4 className="font-heading mb-6 text-lg font-bold">Navigation</h4>
            <ul className="text-primary-foreground/70 space-y-4">
              <li>
                <NextLink
                  href="#projects"
                  className="transition-colors hover:text-white"
                >
                  Projects
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#experience"
                  className="transition-colors hover:text-white"
                >
                  Experience
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#impact"
                  className="transition-colors hover:text-white"
                >
                  Strategic Impact
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#services"
                  className="transition-colors hover:text-white"
                >
                  Services
                </NextLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-6 text-lg font-bold">Contact</h4>
            <ul className="text-primary-foreground/70 space-y-4">
              <li>
                <a
                  href="mailto:nevooronni@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  nevooronni@gmail.com
                </a>
              </li>
              <li> Nairobi, Kenya </li>
              <li>
                <a
                  href="/nevo-oronni-cv.pdf"
                  target="_blank"
                  className="text-accent inline-flex items-center gap-2 font-bold hover:underline"
                >
                  Download CV (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-primary-foreground/40 mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm font-medium md:flex-row">
          <p>
            © {new Date().getFullYear()} Neville Oronni. All rights reserved.
          </p>
          {/* <div className="flex gap-8">
            <NextLink href="/privacy" className="hover:text-white">
              Privacy Policy
            </NextLink>
            <NextLink href="/terms" className="hover:text-white">
              Terms of Service
            </NextLink>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
