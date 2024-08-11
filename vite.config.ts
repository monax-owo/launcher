import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import AutoImport from "unplugin-auto-import/vite";
import autoprefixer from "autoprefixer";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    sveltekit(),
    AutoImport({
      dts: "./src/@types/auto-imports.d.ts",
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.svelte$/, // .svelte
      ],
      exclude: [/[\\/]src[\\/]lib[\\/]components[\\/]/],
      imports: [
        "svelte",
        {
          zod: [["default", "z"]], // import z from "zod"
          [path.resolve(__dirname, "./src/lib/auto-imports").replaceAll("\\", "/")]: ["Template"],
          "$lib/auto-imports.ts": ["$", "$$", "todo", "ifThen", "ifDev"],
        },
      ],
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
