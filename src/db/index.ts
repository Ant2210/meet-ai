import { drizzle } from "drizzle-orm/neon-http";
import { resolveDbEnv } from "./resolve-db-env";

const { url } = resolveDbEnv();

export const db = drizzle(url);
