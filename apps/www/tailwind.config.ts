import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@galleo/ui/tailwind.web.config";

module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx,mdx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Arial", "Helvetica", "sans-serif"], 
      },
    },
  },
  plugins: [],
} satisfies Config;
