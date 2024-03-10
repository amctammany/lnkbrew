import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: colors.gray,
        primary: colors.slate,
        secondary: colors.emerald,
        error: colors.red,
        warning: colors.rose,
        info: colors.cyan,
        success: colors.green,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        default: colors.gray,
        paper: "#fefae0",
      },
      textColor: {
        contrast: {
          default: "#fff",
          primary: "#fff",
          secondary: "#fff",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
