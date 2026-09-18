import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Never ours to lint. Ashpley/ is a second project checked out inside this
    // one, with its own node_modules and its own tsconfig — linting it reports
    // problems in code this repo does not own and cannot fix. node_modules is
    // listed for the same reason, and because Ashpley/node_modules would
    // otherwise be walked as part of that directory.
    "Ashpley/**",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
