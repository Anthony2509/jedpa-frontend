"use client";

import type { ReactNode } from "react";
import { EmptyState } from "@/shared/ui/EmptyState";
import { usePermission } from "../hooks/useCurrentUser";
import type { Permission } from "../types";

interface RequirePermissionProps {
  permission: Permission;
  children: ReactNode;
}

export function RequirePermission({ permission, children }: RequirePermissionProps) {
  const allowed = usePermission(permission);
  if (!allowed) return <EmptyState message="Tu rol no tiene acceso a esta sección. Pide acceso a un administrador." />;
  return children;
}
