import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-48 pb-24 md:pt-64 md:pb-32">
      {/* Background Ambience */}
      <div className="bg-accent/5 absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="bg-accent/5 absolute -top-20 -left-20 -z-10 h-[500px] w-[500px] animate-pulse rounded-full blur-[120px]" />
        <div className="max-w-4xl">
          <div className="bg-accent/10 border-accent/20 text-accent animate-in fade-in slide-in-from-bottom-3 mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase duration-700">
            <span className="relative flex h-2 w-2">
              <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-accent relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            Available for Strategic Roles
          </div>

          <h1 className="font-heading animate-in fade-in slide-in-from-bottom-5 mb-8 text-5xl leading-[1.1] font-black duration-1000 md:text-7xl lg:text-8xl">
            Architecting <br />
            Engineering Leadership{" "}
            <span className="text-accent glow-accent">at Scale.</span>
          </h1>

          <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-7 mb-12 max-w-2xl text-xl leading-relaxed delay-200 duration-1000 md:text-2xl">
            Engineering Team Leader with 7+ years of expertise in fintech,
            high-concurrency backends, and full-stack architecture. I translate
            complex business goals into high-performance technical reality.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-10 flex flex-col gap-5 delay-300 duration-1000 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="shadow-accent/20 h-14 rounded-full px-10 text-lg shadow-xl"
            >
              <Link href="#impact" className="flex items-center gap-2">
                View Strategic Impact <ArrowRight size={20} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-2 px-10 text-lg"
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>

          <div className="border-border animate-in fade-in mt-20 grid grid-cols-2 gap-8 border-t pt-12 delay-500 duration-1000 md:grid-cols-4">
            <div>
              <div className="font-heading mb-1 text-3xl font-black md:text-4xl">
                50%
              </div>
              <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                YoY Revenue Growth
              </div>
            </div>
            <div>
              <div className="font-heading mb-1 text-3xl font-black md:text-4xl">
                40%
              </div>
              <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Latency Reduction
              </div>
            </div>
            <div>
              <div className="font-heading mb-1 text-3xl font-black md:text-4xl">
                32%
              </div>
              <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Bug Reduction
              </div>
            </div>
            <div>
              <div className="font-heading mb-1 text-3xl font-black md:text-4xl">
                7+
              </div>
              <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
