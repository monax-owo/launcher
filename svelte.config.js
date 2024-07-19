import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
    alias: {
      $routes: "src/routes",
      $components: "src/lib/components",
    },
    paths: {
      base: process.argv.includes("dev") ? "/dev" : "",
    },
  },
};
export default config;
