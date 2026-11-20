"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";
import { useAuth } from "@/hooks/useAuth";

// Guards private pages. It waits for the session to resolve first, so a page reload
// never bounces a logged-in user to the login page.
export default function RequireAuth({ children, roles }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading, user, router, pathname]);

  if (loading || !user) return <Loader label="Checking your session..." />;

  if (roles && !roles.includes(role)) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-extrabold">Access denied</h1>
        <p className="mt-3 muted">Your account role does not have permission to view this page.</p>
      </div>
    );
  }
  return children;
}
