import { type Config } from "tailwindcss";
import DaisyUI from "daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    DaisyUI,
  ],
  daisyui: {
    themes: ["cupcake"],
  },
} satisfies Config;
