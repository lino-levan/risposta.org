import { type Config } from "tailwindcss";
import DaisyUI from "daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    // deno-lint-ignore no-explicit-any
    DaisyUI as any,
  ],
  daisyui: {
    themes: ["cupcake"],
    logs: false,
  },
} satisfies Config;
