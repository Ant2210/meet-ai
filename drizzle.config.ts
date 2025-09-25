import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const target = (process.env.DRIZZLE_TARGET ?? "uat").toLowerCase();
const suffix = target === "prod" ? "PROD" : "UAT";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env[`CLOUDFLARE_DATABASE_ID_${suffix}`];
const D1_TOKEN = process.env[`CLOUDFLARE_D1_TOKEN_${suffix}`];

if (!ACCOUNT_ID || !DATABASE_ID || !D1_TOKEN) {
	throw new Error(
		`Missing Cloudflare envs for DRIZZLE_TARGET=${target}. ` +
			`Expected CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID_${suffix}, CLOUDFLARE_D1_TOKEN_${suffix}`,
	);
}

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		accountId: ACCOUNT_ID,
		databaseId: DATABASE_ID,
		token: D1_TOKEN,
	},
});
