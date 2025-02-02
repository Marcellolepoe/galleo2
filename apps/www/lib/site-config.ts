import type { ButtonProps } from "@galleo/ui/components/button";
import { type IconProps, Icons } from "@galleo/ui/icon";
import { ROUTE_CONTACT_US } from "./routes";

const COMPANY_NAME = "Ink & Scribe";
const SUPPORT_EMAIL = "support@inkandscribe.com";

export const siteConfig: SiteConfig = {
  name: COMPANY_NAME,
  description:
    "Free your team from repetitive TM tasks with AI-powered trademark advice and filing automation tailored for law firms and TM agencies. Built by IP professionals and trained by IP law experts, our solution anticipates unique trademark challenges while delivering faster, more efficient processing and increased accuracy through instant AI analysis.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:6969",
  icon: Icons.logo,
  keywords: ["Trademark", "Branding", "Patent", "IP"],
  links: {
    email: SUPPORT_EMAIL,
    talkToUs: ROUTE_CONTACT_US,
    twitter: "https://twitter.com/inkandscribe",
  },
  header: [
    {
      variant: "button",
      buttonVariant: "default",
      target: "_blank",
      href: ROUTE_CONTACT_US,
      label: "Save 5 hours per week",
    },
  ],
  hero: {
    title: ["Instantly Draft TM Advice &", "Automate Filings"],
    description:
      "Free your team from repetitive TM tasks—get AI-powered TM advice & filing automation tailored for law firms and TM agencies.",
    cta: {
      href: ROUTE_CONTACT_US,
      label: "Save 5 hours per week",
      target: "_blank",
      buttonVariant: "default",
    },
  },
  socialProof: {
    icons: [
      {
        href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIOj-PJ7_F-RpOkFwiIxrvgue_UDHs_lJbyQ&s",
        name: "Oxford",
      },
      {
        href: "https://media.licdn.com/dms/image/v2/C560BAQG-6MUyGaEjKg/company-logo_100_100/company-logo_100_100/0/1662956008666/drew__napier_llc_logo?e=1745452800&v=beta&t=S1UKpdga7cH3Ssna0frfIyVtc5SzObME9ZZb5MqJAjg",
        name: "Drew and Napier",
      },
      {
        href: "https://i0.wp.com/thecustodian.ca/wp-content/uploads/2022/02/waterloo.png?fit=600%2C600&ssl=1",
        name: "Waterloo",
      },
      {
        href: "https://media.licdn.com/dms/image/v2/C4E0BAQFDslWTgw1Q4g/company-logo_100_100/company-logo_100_100/0/1631325721627?e=1745452800&v=beta&t=1gTqTZW0OJYP-LeGxoBxPL3mhZOYw6MCfRrkmYb_I80",
        name: "Baker",
      },
      {
        href: "https://upload.wikimedia.org/wikipedia/en/b/b9/NUS_coat_of_arms.svg",
        name: "NUS",
      },
      {
        href: "https://media.licdn.com/dms/image/v2/D4E0BAQGnGELqq6HXHw/company-logo_100_100/company-logo_100_100/0/1720517867022/pwc_logo?e=1745452800&v=beta&t=Zbrob75hisyL8NOgTetZresqF-wCwsdlo410J2iWRXQ",
        name: "PWC",
      },
    ],
  },
  cta: {
    subtitle: "See how AI can close you more deals this week",
    buttonText: "Close more deals",
    href: ROUTE_CONTACT_US,
  },
  footer: {
    items: [],
  },
};

export type HeaderButtonConfig = {
  variant: "button";
  buttonVariant: ButtonProps["variant"] | "navigation";
  target?: "_blank" | "_self" | "_parent" | "_top";
  href: string;
  label: string;
};

export type HeaderDropdownConfig = {
  variant: "dropdown";
  label: string;
  content: {
    main?: {
      icon: React.ReactNode;
      title: string;
      description: string;
      href: string;
    };
    items: {
      href: string;
      title: string;
      description: string;
    }[];
  };
};

export type SiteConfig = {
  name: string;
  description: string;
  icon: (props: IconProps) => React.ReactNode;
  url: string;
  keywords: string[];
  links: {
    email?: string;
    talkToUs?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  header: (HeaderButtonConfig | HeaderDropdownConfig)[];
  announcement?: {
    title: string;
    href: string;
  };
  hero: {
    title: string[];
    description: string;
    cta: {
      href: string;
      label: string;
      buttonVariant: ButtonProps["variant"];
      target?: HeaderButtonConfig["target"];
      subtitle?: string;
    };
    showcase?: {
      videoSrc?: string | undefined;
      thumbnailSrc: string;
      thumbnailAlt: string;
    };
  };
  socialProof?: {
    title?: string;
    icons: {
      href: string;
      name: string;
    }[];
  };
  problems?: {
    title?: string;
    subtitle: string;
    description?: string;
    items: {
      title: string;
      description: string;
      icon: (props: IconProps) => React.ReactNode;
    }[];
  };
  benefits?: {
    title?: string;
    subtitle: string;
    description?: string;
    items: {
      title: string;
      description: string;
      wrapperClassName?: string;
      content: React.ReactNode;
    }[];
  };
  solution?: {
    title?: string;
    subtitle: string;
    description?: string;
    items: {
      icon: (props: IconProps) => React.ReactNode;
      title: string;
      description: string;
      className?: string;
      cta?: {
        href: string;
        label: string;
      };
      background?: React.ReactNode;
    }[];
  };
  howItWorks?: {
    title?: string;
    subtitle: string;
    description?: string;
    items: {
      title: string;
      description: string;
      icon?: React.ReactNode;
      image?: string;
      video?: string;
      content?: React.ReactNode;
    }[];
  };
  testimonials?: {
    title?: string;
    subtitle: string;
    description?: string;
    items: {
      name: string;
      role: string;
      quote: string;
      company: string;
    }[];
  };
  pricing?: {
    title?: string;
    subtitle: string;
    description?: string;
  } & (
    | {
        variant: "subscription";
        items: {
          name: string;
          href: string;
          price: string;
          billingPeriod: string;
          period: string;
          yearlyPrice: string;
          yearlyBillingPeriod: string;
          features: string[];
          description: string;
          buttonText: string;
          isPopular: boolean;
        }[];
      }
    | {
        variant: "one-time";
        items: {
          name: string;
          href: string;
          price: string;
          unit: string;
          description?: string;
          features?: string[];
          buttonText: string;
        }[];
      }
  );
  faq?: {
    title?: string;
    subtitle?: string;
    items: {
      question: string;
      answer: React.ReactNode;
    }[];
  };
  blog?: {
    title: string;
    description?: string;
  };
  cta?: {
    title?: string;
    subtitle: string;
    buttonText: string;
    href: string;
  };
  footer: {
    termsOfUseAndPrivacyPolicy?: string;
    privacyPolicy?: string;
    termsOfService?: string;
    items: {
      title: string;
      links: {
        href: string;
        text: string;
        icon?: React.ReactNode;
      }[];
    }[];
  };
};
