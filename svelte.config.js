import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
      $routes: "src/routes",
      $types: "src/@types",
    },
    paths: {
      base: process.argv.includes("dev") ? "/dev" : "",
    },
  },
};
export default config;
