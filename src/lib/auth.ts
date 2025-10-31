import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";

const isDev = process.env.NODE_ENV === "development";

// Determine base URL - NODE_ENV takes priority
const getBaseURL = () => {
  if (isDev) {
    return process.env.BETTER_AUTH_URL_DEV || "http://localhost:3000";
  }

  // In production builds, use DRIZZLE_TARGET to determine URL
  if (process.env.DRIZZLE_TARGET === "prod") {
    return process.env.BETTER_AUTH_URL_PROD;
  }

  if (process.env.DRIZZLE_TARGET === "uat") {
    return process.env.BETTER_AUTH_URL_UAT;
  }
};

export const auth = betterAuth({
  baseURL: getBaseURL(),

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    process.env.BETTER_AUTH_URL_PROD,
    process.env.BETTER_AUTH_URL_UAT,
    process.env.BETTER_AUTH_URL_DEV || "http://localhost:3000",
  ].filter(Boolean) as string[],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update every 24 hours
  },

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});
