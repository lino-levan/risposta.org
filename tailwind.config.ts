import { type Config } from "tailwindcss";
import DaisyUI from "daisyui";
import {daisyThemes} from "lib/daisy_themes.ts"

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    // deno-lint-ignore no-explicit-any
    DaisyUI as any,
  ],
  daisyui: {
    themes: daisyThemes,
    logs: false,
  },
} satisfies Config;