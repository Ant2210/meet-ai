import "dotenv/config";

import { defineConfig } from "drizzle-kit";

import { resolveDbEnv } from "@/db/resolve-db-env";

const { url } = resolveDbEnv();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url },
});
