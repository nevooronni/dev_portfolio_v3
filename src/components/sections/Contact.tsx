"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MessageSquare, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/send-email";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(sendContactEmail(values), {
      loading: "Transmitting message to Neville...",
      success: (res) => {
        if (res.success) {
          form.reset();
          return "Message sent successfully. I will get back to you shortly.";
        }
        throw new Error(res.error);
      },
      error: (err) => `Failed to send: ${err.message}`,
    });
  }

  return (
    <section id="contact" className="bg-card relative overflow-hidden py-24">
      {/* Background Ambience */}
      <div className="bg-accent/5 absolute top-1/2 right-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-heading mb-6 text-3xl font-black md:text-5xl">
              Let&apos;s Scale Together.
            </h2>
            <p className="text-muted-foreground mb-12 text-xl leading-relaxed">
              Looking for a seasoned Technical Lead to architect your next
              milestone? Or perhaps you need strategic consulting on
              microservices and software engineering scaling? Reach out and
              let&apos;s discuss your roadmap.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
                    Direct Email
                  </div>
                  <a
                    href="mailto:nevooronni@gmail.com"
                    className="hover:text-accent text-lg font-bold transition-colors"
                  >
                    nevooronni@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
                    LinkedIn
                  </div>
                  <a
                    href="https://www.linkedin.com/in/neville-oronni-5471699b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent text-lg font-bold transition-colors"
                  >
                    Neville Oronni
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
                    GitHub
                  </div>
                  <a
                    href="https://github.com/nevooronni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent text-lg font-bold transition-colors"
                  >
                    nevooronni
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
                    Location
                  </div>
                  <div className="text-lg font-bold">
                    Nairobi, Kenya (GMT+3)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border-border rounded-3xl border p-8 shadow-xl shadow-black/5 md:p-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="border-muted h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@company.com"
                            {...field}
                            className="border-muted h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company / Organization (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tech Ventures Inc."
                          {...field}
                          className="border-muted h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strategy / Project Context</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your technical challenges..."
                          className="border-muted min-h-[150px] resize-none p-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="shadow-accent/20 h-14 w-full rounded-full text-lg shadow-lg"
                >
                  Send Message <Send size={18} className="ml-2" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
