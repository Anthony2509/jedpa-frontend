"use client";

import { useStore } from "@/shared/lib/useStore";
import { hasPermission } from "../domain/permissions";
import { sessionStore } from "../services/session";
import type { Permission } from "../types";

export function useCurrentUser() {
  return useStore(sessionStore);
}

export function usePermission(permission: Permission): boolean {
  return hasPermission(useCurrentUser().role, permission);
}
