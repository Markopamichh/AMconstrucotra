import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "am-primary": "#1E3A6E",
        "am-secondary": "#2E5CB8",
        "am-bg": "#F5F7FA",
        "am-text": "#1A1A1A",
        "am-muted": "#6B7280",
        "am-whatsapp": "#25D366",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
