import { defineConfig } from "orval";

export default defineConfig({
  forks: {
    input: {
      target: "http://localhost:1291/v3/api-docs",
    },
    output: {
      namingConvention: "camelCase",
      target: "src/api/endpoints/",
      baseUrl: "http://localhost:1291",
      schemas: "src/api/model",
      headers: true,
      mode: "tags-split",
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "src/utils/customFetch.ts",
          name: "useCustomFetch",
        },
      },
    },
  },
  forkZod: {
    input: {
      target: "http://localhost:1291/v3/api-docs",
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "src/api/endpoints/",
      fileExtension: ".zod.ts",
    },
  },
});
