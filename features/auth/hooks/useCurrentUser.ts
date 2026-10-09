"use client";

import { useStore } from "@/shared/lib/useStore";
import { hasPermission } from "../domain/permissions";
import { getCurrentUser, sessionStore } from "../services/session";
import type { Permission, User } from "../types";

export function useSession() {
  return useStore(sessionStore);
}

/** Signed-in user. Only used under AuthGuard, so the session is always there. */
export function useCurrentUser(): User {
  useSession();
  return getCurrentUser();
}

export function usePermission(permission: Permission): boolean {
  return hasPermission(useCurrentUser().role, permission);
}
