import { drizzle } from "drizzle-orm/d1";
import { usersTable } from "./schema";
export interface Env {
	DB: D1Database;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	async fetch(request: Request, env: Env) {
		const db = drizzle(env.DB);
		const result = await db.select().from(usersTable).all();
		return Response.json(result);
	},
};
