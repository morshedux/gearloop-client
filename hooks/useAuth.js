"use client";

import { authClient } from "@/lib/auth-client";

// Thin wrapper over the Better Auth session. `loading` stays true until the session
// is resolved, so private pages never redirect to login while a reload is in flight.
export function useAuth() {
  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user || null;
  return { user, role: user?.role || "customer", loading: isPending, refetch };
}
