"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SessionLoading } from "../components/SessionLoading";
import { useSession } from "../hooks/useCurrentUser";
import { restoreSession } from "../services/session";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Protects every screen of app/(app). The token lives in the browser, so the check is
 * client-side: nothing renders until /auth/me confirms the session.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    void restoreSession();
  }, []);

  useEffect(() => {
    if (status === "anonymous") router.replace("/login");
  }, [status, router]);

  if (status !== "authenticated") return <SessionLoading />;
  return children;
}
