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
        <div className="text-center text-muted-foreground">
          <p>Built by Silicon Valley AI experts and IP lawyers, Galleo seamlessly integrates AI into trademark filing—powering the future of IP practice.</p>
        </div>
        <Spacer className="h-8 md:h-10" />
        <Logos />
      </Section>

      <Spacer className="h-20 md:h-24" />
      <FeatureSection
        label="Features"
        title="Instantly Drafted Enquiry Reponses"
        description={
          <div className="space-y-4">
            <p>Leave manual drafting behind—Galleo analyzes queries and generates replies in seconds. Simply review & send.</p>
            <div className="space-y-2">
              <p>Galleo's Draft Includes:</p>
              <ul className="ml-4 list-disc space-y-1 text-muted-foreground/80">
                <li>Integrated Client Research for Smarter Responses</li>
                <li>Recommended NICE Classifications</li>
                <li>Automatically Calculated Fee Estimates</li>
                <li>Follow-Up Requests with Enquirer</li>
              </ul>
            </div>
          </div>
        }
        ctaText="Explore Knowledge"
        showcaseContent={<Email />}
      />

      <Spacer className="h-20 md:h-24" />
     
      <FeatureSection
        label="Features"
        title="Effortless Drafting, Fully in Your Control"
        description={
          <div className="space-y-4">
            <p>Save time without sacrificing quality—Galleo drafts replies in your style for consistent, professional client interactions. Need changes? Just prompt Galleo to refine or edit the draft in seconds.</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground/80 ">
              <li>Smart, Personalized Drafting 
                <p className="mt-1 text-sm"> 
                Galleo crafts replies that incorporate your firm’s templates, ensuring consistency and professionalism in every response.
                </p> 
              </li>
              <li>Customizable Content 
                <p className="mt-1 text-sm">
                Modify drafts as needed while maintaining structured, legally sound replies tailored to your client’s needs.
                </p>
              </li>
              <li>AI-Powered Refinements 
                <p className="mt-1 text-sm"> 
                  Simply prompt Galleo to adjust tone, wording, or details—so you stay in control without the hassle of manual edits.
                </p>
              </li>
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
        title="Your AI-Powered Associate—Right in Your Inbox"
        description={
          <div className="space-y-4">
            <p>No New Tools. No Extra Steps. Just Faster Work.</p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground/80">
              <li>
                <span className="inline-block">📩</span> Seamless Outlook Integration – Works directly in your inbox.
                <p className="mt-1 text-sm">
                  Our AI Lives In Outlook—Just Email Your TM Inquiry And Get An
                  Instant Draft Response To Clients Ready In Your Outbox..
                </p>
              </li>
              <li>
                <span className="inline-block">⚡</span> 24/7 AI-Powered
                Efficiency
                <p className="mt-1 text-sm">
                  Always On and Responds Instantly. Work At Your Convenience.
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
