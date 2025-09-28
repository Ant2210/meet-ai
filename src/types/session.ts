import { getCurrentSession } from "@/lib/auth-utils";

/**
 * The full session object returned by `getCurrentSession`, which can be null.
 */
export type SessionData = Awaited<ReturnType<typeof getCurrentSession>>;

/**
 * The full session object, guaranteed to be non-null.
 * Use this for components that are only rendered for authenticated users.
 */
export type AuthenticatedSession = NonNullable<SessionData>;
