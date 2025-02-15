import type { ReactNode } from "react";
import { siteConfig } from "~/lib/site-config";

type Position = "left" | "right";

interface FeatureSectionProps {
  label: string;
  title: ReactNode;
  description: ReactNode;
  ctaText: string;
  showcaseContent: ReactNode;
  position?: Position;
}

export function FeatureSection({
  label,
  title,
  description,
  ctaText,
  showcaseContent,
  position = "right",
}: FeatureSectionProps) {
  const ContentSection = (
    <div className="flex h-full items-center bg-[ #112b3c] px-4 py-10 md:px-12 md:py-24 lg:px-24 rounded-2xl">
      <div className="max-w-xl">
        <span className="font-medium text-muted-foreground text-sm rounded-lg">
          {label}
        </span>
        <h2 className="mt-6 font-medium font-serif text-5xl text-foreground leading-tight rounded-lg">
          {title}
        </h2>
        <div className="mt-6 text-lg text-muted-foreground">{description}</div>
        <a
          href={siteConfig.links.talkToUs}
          data-attr={ctaText}
          target="_blank"
          className="mt-8 flex items-center font-medium text-muted-foreground text-sm hover:text-foreground rounded-lg"
          rel="noreferrer"
        >
          {ctaText} &rarr;
        </a>
      </div>
    </div>
  );

  const ShowcaseSection = (
    <div className="flex h-full items-center bg-[#243447] px-4 py-24 md:px-12 lg:px-24 rounded-2xl">
      {showcaseContent}
    </div>
  );

  return (
    <section className="container max-w-7xl px-0 xl:rounded-lg overflow-hidden">
      <div className="grid w-full overflow-hidden md:grid-cols-2 xl:rounded-lg">
        {/* On mobile, ShowcaseSection is always first */}
        <div className="md:hidden">{ShowcaseSection}</div>
        <div className="md:hidden">{ContentSection}</div>

        {/* On desktop, order depends on position prop */}
        <div className="hidden md:block rounded-lg">
          {position === "left" ? ShowcaseSection : ContentSection}
        </div>
        <div className="hidden md:block rounded-lg">
          {position === "left" ? ContentSection : ShowcaseSection}
        </div>
      </div>
    </section>
  );
}
