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
        console: "readonly",
        fetch: "readonly",
      },
    },
    // Rules to be adopted as part of the code quality analysis 
    rules: {
      // Check for any extra semicolons
      "no-extra-semi":"error",
      // Check for duplicated case labels 
      "no-duplicate-case": "error",
      // Check for max line length of 120
      "max-len": ["warn", { "code": 120 }],
      // Check for duplicate imports
      "no-duplicate-imports": "error"
    },
  },
  {
    languageOptions: {
        globals: {},
      },
      ...pluginJs.configs.recommended,
    },
  ];