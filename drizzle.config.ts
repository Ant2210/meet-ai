import "dotenv/config";
import { resolveDbEnv } from "@/db/resolve-db-env";
import { defineConfig } from "drizzle-kit";

const { url } = resolveDbEnv();

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: { url },
});
