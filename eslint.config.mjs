import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    // Rules to be adopted as part of the code quality analysis 
    rules: {
      // Check for the use of console statements - warnings are shown but does not fail the linting process
      "no-console": ["warn"],
      // Check for the use of undeclared variables
      "no-undef": "error",
      // Check for duplicated case labels 
      "no-duplicate-case": "error",
    },
  },
  {
    languageOptions: {
        globals: {
          window: "readonly",
          document: "readonly",
          // Add other globals as needed
        },
      },
      ...pluginJs.configs.recommended,
    },
  ];