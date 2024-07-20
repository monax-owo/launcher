import svelteParser from "svelte-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// "off" | 0
// "warn" | 1
// "error" | 2

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...compat.extends("plugin:svelte/recommended", "prettier"),
  {
    ignores: [
      "**/.DS_Store",
      "**/node_modules",
      "build",
      "**/.svelte-kit",
      "package",
      "**/.env",
      "**/.env.*",
      "!**/.env.example",
      "**/pnpm-lock.yaml",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/.git",
      "**/.github",
      "**/src-tauri",
    ],
  },
  {
    plugins: {
      "@typescript-eslint": ts.plugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: ts.parser,
      ecmaVersion: 6,
      sourceType: "module",
      parserOptions: {
        extraFileExtensions: [".svelte"],
      },
    },
    rules: {
      "no-undef": 0,
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      ecmaVersion: 6,
      sourceType: "script",
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      "no-undef": 0,
    },
  },
];
