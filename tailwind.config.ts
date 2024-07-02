import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "12",
        width: "12",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#65c3c8",
          "primary-focus": "#42b3ba",
          "primary-content": "#ffffff",
          secondary: "#ef9fbc",
          "secondary-focus": "#e06387",
          "secondary-content": "#ffffff",
          accent: "#eeaf3a",
          "accent-focus": "#e19208",
          "accent-content": "#ffffff",
          neutral: "#291334",
          "neutral-focus": "#200f29",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#e3e5e8",
          "base-content": "#291334",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
          "--rounded-box": "1rem", // custom roundedness for box
          "--rounded-btn": "1rem", // custom roundedness for buttons
          "--rounded-badge": "1rem", // custom roundedness for badges
        },
      },
    ],
  },
};
export default config;
