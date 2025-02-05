import type { Config } from "tailwindcss";

import baseConfig from "@galleo/ui/tailwind.web.config";

module.exports = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx,mdx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
