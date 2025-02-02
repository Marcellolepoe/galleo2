"use client";

import { Button } from "@galleo/ui/components/button";
import { Input } from "@galleo/ui/components/input";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const animate = () => {
      const elements = document.querySelectorAll(".animate-in");

      for (let i = 0; i < elements.length; i++) {
        //  motion(elements[i], {
        //   opacity: [0, 1],
        //   y: [20, 0],
        //   duration: 0.7,
        //   delay: i * 0.15,
        //   easing: "ease-out",
        // });
      }
    };

    animate();
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.div
            animate={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="font-semibold text-xl">Legalflow</h3>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost">Sign In</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-24">
          {/* Hero Section */}
          <section className="space-y-8 text-center">
            <h1 className="animate-in font-semibold text-5xl leading-tight md:text-6xl lg:text-7xl">
              Cut Inquiry Response Time from 24 Hours to 10 Minutes
            </h1>
            <p className="mx-auto max-w-2xl animate-in text-muted-foreground text-xl">
              AI drafts responses to common inquiries in seconds – so you can
              focus on high-value work.
            </p>
            <form
              ref={formRef}
              className="mx-auto flex max-w-md animate-in gap-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button size="lg">Join Waitlist</Button>
            </form>
          </section>

          {/* Features Section */}
          <section className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "1-Click Response Drafting",
                description:
                  "AI writes replies to common inquiries in your Outlook inbox. Edit and send in 30 seconds.",
              },
              {
                title: "Urgency Detection",
                description:
                  'Automatically flag clients who say "ASAP" or "urgent" so you never miss high-value work.',
              },
              {
                title: "Pay Only for Results",
                description:
                  "$0 upfront. 10% of filing fees only when clients convert.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="animate-in space-y-4 rounded-lg border p-6"
              >
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </section>

          {/* Social Proof */}
          <section className="animate-in space-y-8 text-center">
            <h2 className="font-semibold text-3xl">
              Piloted with Singapore IP firms saving 5+ hours/week on inquiries
            </h2>
            <div className="flex justify-center gap-8">
              {/* Add logos here */}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-24 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 text-center md:grid-cols-2 md:text-left">
            <p className="text-muted-foreground">
              100% Lawyer-Approved: All AI drafts require your sign-off.
            </p>
            <p className="text-muted-foreground">
              Built for Singapore IPOS Workflows.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
