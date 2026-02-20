// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";
import prettier from "eslint-config-prettier";

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  plugins: {
    "react-hooks": reactHooks,
    "react-compiler": reactCompiler,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "error",
  },
}, prettier, {
  ignores: ["build/", "dist/", "node_modules/"],
}, storybook.configs["flat/recommended"]);
