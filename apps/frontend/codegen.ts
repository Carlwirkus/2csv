import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost/graphql",
  documents: ["./**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: "@/lib/GraphQL/fetcher#fetcher",
      },
    },
  },
};

export default config;
