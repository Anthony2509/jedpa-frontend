import type { Role } from "../types";

/** Role names as the API stores them (`roles.name`). */
export type ApiRole = "ADMIN" | "COORDINADOR" | "OPERADOR";

const FROM_API: Record<ApiRole, Role> = { ADMIN: "admin", COORDINADOR: "coordinator", OPERADOR: "operator" };
const TO_API: Record<Role, ApiRole> = { admin: "ADMIN", coordinator: "COORDINADOR", operator: "OPERADOR" };

export function fromApiRole(role: string): Role {
  return FROM_API[role as ApiRole] ?? "operator";
}

export function toApiRole(role: Role): ApiRole {
  return TO_API[role];
}
