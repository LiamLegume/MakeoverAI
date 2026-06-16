import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        linen: "#FAF8F3",
        paper: "#FFFFFF",
        ink: "#1F1F1F",
        muted: "#6B6B6B",
        line: "#E8E1D8",
        clay: "#A8784F",
        tan: "#B88A5A",
        coral: "#FF7048",
        plum: "#2F1236",
        oat: "#F6F1EA",
        sage: "#6F7D65",
        moss: "#425241"
      },
      boxShadow: {
        soft: "0 22px 60px rgba(31, 31, 31, 0.08)",
        card: "0 12px 32px rgba(31, 31, 31, 0.06)"
      },
      borderRadius: {
        soft: "8px"
      }
    }
  },
  plugins: []
};

export default config;
