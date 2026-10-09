import type { Permission, Role } from "../types";

/** Permission matrix from the client's table. "administration" is assumed admin-only. */
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ["participants", "special_credentials", "diplomas", "reports_basic", "reports_full", "audit", "resolutions", "administration", "import_participants", "manage_delegations", "calibrate_printer"],
  coordinator: ["participants", "special_credentials", "diplomas", "reports_basic", "resolutions", "import_participants", "manage_delegations", "calibrate_printer"],
  operator: ["participants", "diplomas"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
