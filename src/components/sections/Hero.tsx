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
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="bg-accent/10 border-accent/20 text-accent mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-accent relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              Available for Strategic Roles
            </div>

            <h1 className="font-heading mb-8 text-5xl leading-[1.1] font-black md:text-7xl lg:text-8xl">
              Architecting <br />
              Engineering Leadership{" "}
              <span className="text-accent glow-accent">at Scale.</span>
            </h1>

            <p className="text-muted-foreground mb-12 max-w-2xl text-xl leading-relaxed md:text-2xl">
              Engineering Team Leader with 8+ years of expertise in fintech,
              logistics, payroll, agri-tech high-concurrency full-stack
              architectures. I translate complex business goals into
              high-performance technical reality.
            </p>

            <div className="flex flex-col gap-5 sm:flex-row">
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

            <div className="border-border mt-20 grid grid-cols-2 gap-8 border-t pt-12 md:grid-cols-4">
              <div>
                <div className="font-heading mb-1 text-3xl font-black md:text-4xl">
                  50%
                </div>
                <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                  YoY Revenue
                </div>
              </div>
              <div>
                <div className="font-heading mb-1 text-3xl font-black md:text-4xl">
                  40%
                </div>
                <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                  Latency Red.
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
                  8+
                </div>
                <div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                  Experience
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in zoom-in relative hidden delay-300 duration-1000 lg:block">
            <div className="bg-accent/20 absolute -inset-4 skew-y-6 rounded-[2rem] blur-3xl" />
            <div className="animate-float relative z-10 mx-auto aspect-square w-full max-w-[500px]">
              <div className="border-border/50 absolute inset-0 rounded-[2.5rem] border-4 bg-white/5 backdrop-blur-2xl" />
              <div className="bg-muted relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="/avatar.png"
                  alt="Neville Oronni"
                  className="h-full w-full origin-[center_25%] scale-[1.4] object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              {/* Floating Decorative Elements */}
              <div className="bg-accent/40 absolute -top-6 -right-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl shadow-xl backdrop-blur-xl">
                <Terminal className="text-white" size={32} />
              </div>
              <div className="bg-primary/40 absolute -bottom-8 -left-8 flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl backdrop-blur-xl">
                <ShieldCheck className="text-white" size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
