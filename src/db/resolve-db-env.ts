export type DbTarget = "uat" | "prod";

export function resolveDbEnv(): { target: DbTarget; url: string } {
	const target = process.env.DRIZZLE_TARGET as DbTarget | undefined;
	if (target !== "uat" && target !== "prod") {
		throw new Error('Expected DRIZZLE_TARGET to be "uat" or "prod"');
	}

	const url =
		target === "prod"
			? process.env.DATABASE_URL_PROD
			: process.env.DATABASE_URL_UAT;

	if (!url) {
		throw new Error(
			`Missing ${
				target === "prod" ? "DATABASE_URL_PROD" : "DATABASE_URL_UAT"
			} env var`,
		);
	}

	return { target, url };
}
