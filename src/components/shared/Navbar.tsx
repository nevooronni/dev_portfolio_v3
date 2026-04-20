"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal } from "lucide-react";

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Impact", href: "#impact" },
  { name: "Services", href: "#services" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="bg-primary text-primary-foreground group-hover:bg-accent flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300">
              <Terminal size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg leading-none font-bold">
                Neville Oronni
              </span>
              <span className="text-muted-foreground mt-1 text-xs font-medium tracking-widest uppercase">
                Engineering Leader
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-accent text-sm font-medium transition-colors duration-200"
                aria-label={`Go to ${item.name} section`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="rounded-full px-6 shadow-sm">
              <Link href="#contact">Hire Me</Link>
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="glass border-border animate-in slide-in-from-top-2 absolute top-full right-0 left-0 flex flex-col gap-4 border-t p-4 duration-300 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="hover:bg-muted rounded-md px-4 py-2 text-lg font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="mt-2 w-full rounded-full">
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              Hire Me
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
