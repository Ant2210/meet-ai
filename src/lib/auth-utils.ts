import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/**
 * In a Server Component, gets the current session object.
 * A convenience wrapper around auth.api.getSession.
 */
export const getCurrentSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

/**
 * For Server Components. Redirects to a specified path if the user IS authenticated.
 * Use this for pages like /sign-in or /sign-up.
 * @param redirectTo The path to redirect to if authenticated. Defaults to "/".
 */
export const redirectIfAuthenticated = async (redirectTo: string = "/") => {
  const session = await getCurrentSession();

  if (session) {
    redirect(redirectTo);
  }

  return session;
};

/**
 * For Server Components. Redirects to a specified path if the user is NOT authenticated.
 * Use this to protect pages that require a user to be logged in.
 * @param redirectTo The path to redirect to if not authenticated. Defaults to "/sign-in".
 */
export const redirectIfNotAuthenticated = async (
  redirectTo: string = "/sign-in",
) => {
  const session = await getCurrentSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
};
