import { fixupConfigRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules/", "**/dist/"],
  },
  js.configs.recommended,
  ...fixupConfigRules(
    compat.extends(
      "plugin:@typescript-eslint/recommended",
      "react-app",
      "plugin:storybook/recommended",
    ),
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
      },
      react: {
        version: "detect",
      },
    },

    rules: {
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-use-before-define": ["error"],
      "arrow-parens": ["error", "as-needed"],

      "comma-dangle": ["error", {
        arrays: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
        imports: "always-multiline",
        objects: "always-multiline",
      }],

      "eol-last": ["error", "always"],
      "import/no-unresolved": "off",
      "import/extensions": "off",

      "import/no-extraneous-dependencies": ["error", {
        devDependencies: ["**/*.test.ts", "**/*.test.tsx", "rollup.config.ts", "./src/setupTests.ts"],
      }],

      "import/prefer-default-export": "off",

      indent: [2, 2, {
        SwitchCase: 1,
      }],

      "jsx-a11y/control-has-associated-label": "off",

      "max-len": ["error", {
        code: 120,
        comments: 120,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      }],

      "no-console": ["error", {
        allow: ["error", "info"],
      }],

      "no-multiple-empty-lines": ["error", {
        max: 1,
      }],

      "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
      "no-trailing-spaces": "error",
      "no-underscore-dangle": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",

      "object-curly-newline": ["error", {
        consistent: true,
        minProperties: 5,
        multiline: true,
      }],

      "react/jsx-filename-extension": [2, {
        extensions: [".ts", ".tsx"],
      }],

      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      semi: ["error", "always"],

      "space-infix-ops": ["error", {
        int32Hint: false,
      }],

      "testing-library/no-container": "off",
      "testing-library/no-node-access": "off",
    },
  },
];
