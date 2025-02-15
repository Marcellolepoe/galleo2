"use client";
import { Spacer } from "@galleo/ui/components/base/spacer";
import { Cta } from "./_components/cta";
import { AutomatedFilling } from "./_components/feature/automated-filling";
import { AIDrafting } from "./_components/feature/ai-drafting";
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
        label="Drafting"
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
                <li>Follow-Up Requests Customized for Each Client</li>
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
        title="Effortless Drafting, Always In Your Control"
        description={
          <div className="space-y-4">
            <p>Save time without sacrificing quality—Galleo drafts replies in your style for consistent, professional client interactions. Need changes? Just prompt Galleo to refine or edit the draft in seconds.</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground/80 ">
              <li>Smart, Personalized Drafting </li>
              <li>Customizable Content Incorporating Your Templates </li>
              <li>Prompt Galleo to Refine Tone & Wording Instantly </li>
            </ul>
          </div>
        }
        ctaText="See how fast we can work"
        showcaseContent={<AIDrafting />}
        position="left"
      />

      <Spacer className="h-20 md:h-24" />

      <FeatureSection
        label="Integrated"
        title="Your AI-Powered Associate—Right in Your Inbox"
        description={
          <div className="space-y-4">
            <p>Galleo works like a digital first-year associate, saving you hours by handling trademark tasks instantly—all within Outlook. No extra tools, no disruptions.</p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground/80">
              <li>
                Direct Outlook Integration, Sent Instantly to Your Drafts
              </li>
              <li>Works Whenever, Wherever You Are
              </li> 
            </ul>
          </div>
        }
        ctaText="Learn more about integrations"
        showcaseContent={<Integrated />}
      />
      
      <Spacer className="h-20 md:h-24" />
     
      <FeatureSection
        label="Features"
        title="Your Data, Fully Protected"
        description={
          <div className="space-y-4">
            <p>Galleo keeps your information secure with encryption at every step. No data storage, no unnecessary access—just complete privacy and control.</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground/80 ">
              <li>End-to-End Encryption </li>
              <li>No Data Storage </li>
              <li>Strict Access Control  
                <p className="mt-1 text-sm"> 
                  Galleo only reads the emails you select for drafting, ensuring complete privacy and control 123.
                </p>
              </li>
            </ul>
          </div>
        }
        ctaText="See how fast we can work"
        showcaseContent={<AIDrafting />}
        position="left"
      />
      
      <Spacer className="h-20 md:h-24" />

      <Cta />
      <Spacer className="h-20 md:h-24" />

      <Footer />
    </div>
  );
}
