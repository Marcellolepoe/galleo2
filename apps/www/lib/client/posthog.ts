import posthog from "posthog-js";

export function getPosthog() {
  if (typeof window === "undefined") posthog;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
    api_host: "/ingest",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "",
  });
  return posthog;
}
