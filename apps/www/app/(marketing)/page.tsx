"use client";
import { Spacer } from "@galleo/ui/components/base/spacer";
import { Cta } from "./_components/cta";
import { AutomatedFilling } from "./_components/feature/automated-filling";
import { FeatureSection } from "./_components/feature/container";
import { Email } from "./_components/feature/email";
import { Integrated } from "./_components/feature/integrated";
import Footer from "./_components/footer";
import { Hero } from "./_components/hero";
import { Logos } from "./_components/logos";
import { Header } from "./_components/navigation/header";
import { Section } from "./_components/section";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Spacer className="h-24 md:h-32" />
      <Hero />
      <Spacer className="h-20 md:h-24" />
      <Section
        title="Who We Are"
        subtitle="Built by IP Professionals, Powered by AI"
      >
        <Logos />
        <Spacer className="h-8 md:h-10" />
        <div className="text-center text-muted-foreground">
          <p>Trained by IP Law Experts - anticipates unique TM challenges</p>
          <p>
            Faster & More Efficient - No more manual drafting or form-filling
          </p>
          <p>Increased Accuracy - AI analyzes every case instantly</p>
        </div>
      </Section>

      <Spacer className="h-20 md:h-24" />

      <FeatureSection
        label="Knowledge"
        title="Instant First-Cut Advise"
        description={
          <div className="space-y-4">
            <p>Lawyers simply review & send—saving hours per case.</p>
            <div className="space-y-2">
              <p>AI instantly drafts a first-cut legal review with:</p>
              <ul className="ml-4 list-disc space-y-1 text-muted-foreground/80">
                <li>Classes & marks to file</li>
                <li>IPOS search results</li>
                <li>Legal rationale & recommendations</li>
              </ul>
            </div>
          </div>
        }
        ctaText="Explore Knowledge"
        showcaseContent={<Email />}
      />

      <Spacer className="h-20 md:h-24" />

      <FeatureSection
        label="Speed"
        title="Automated Filing"
        description={
          <div className="space-y-4">
            <p>Frees up time for high-value legal work</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground/80 ">
              <li>AI pre-fills all required TM filing forms</li>
              <li>Reduces human errors & eliminates repetitive data entry</li>
            </ul>
          </div>
        }
        ctaText="See how fast we can work"
        showcaseContent={<AutomatedFilling />}
        position="left"
      />

      <Spacer className="h-20 md:h-24" />

      <FeatureSection
        label="Integrated"
        title="Seamlessly Integrated into Your Workflow"
        description={
          <div className="space-y-4">
            <p>No New Tools. No Extra Steps. Just Faster Work.</p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground/80">
              <li>
                <span className="inline-block">📩</span> Email. Get Advice. Send
                it to Clients.
                <p className="mt-1 text-sm">
                  Our AI lives in Outlook—just email your TM inquiry and get an
                  instant draft response to clients ready in your outbox.
                </p>
              </li>
              <li>
                <span className="inline-block">⚡</span> 24/7 AI-Powered
                Efficiency
                <p className="mt-1 text-sm">
                  Always on and responds instantly. Work at your convenience.
                </p>
              </li>
            </ul>
          </div>
        }
        ctaText="Learn more about integrations"
        showcaseContent={<Integrated />}
      />

      <Spacer className="h-20 md:h-24" />

      <Cta />
      <Spacer className="h-20 md:h-24" />

      <Footer />
    </div>
  );
}
