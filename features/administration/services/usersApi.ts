import { fromApiRole, type User } from "@/features/auth";
import { apiGet, apiPatch, apiPost, type Paginated } from "@/shared/lib/apiClient";
import { invalidateQueries } from "@/shared/lib/useApiQuery";
import type { RoleOption, UserDraft } from "../types";

interface RoleDto {
  id: string;
  name: string;
}

interface UserDto {
  id: string;
  email: string;
  fullName: string;
  role: RoleDto;
  isActive: boolean;
}

export const USERS_QUERY = "users";
export const ROLES_QUERY = "roles";
export const USERS_PAGE_SIZE = 20;

const toUser = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.fullName,
  email: dto.email,
  role: fromApiRole(dto.role.name),
  active: dto.isActive,
});

export async function fetchUsers(page: number): Promise<Paginated<User>> {
  const result = await apiGet<Paginated<UserDto>>("/users", { page, limit: USERS_PAGE_SIZE });
  return { ...result, data: result.data.map(toUser) };
}

export async function fetchRoleOptions(): Promise<RoleOption[]> {
  const roles = await apiGet<RoleDto[]>("/roles");
  return roles.map((role) => ({ id: role.id, role: fromApiRole(role.name) }));
}

/**
 * Creates or updates a user. On edit the role is only sent when it changed (the API
 * rejects any role change on your own account) and the password only when typed.
 */
export async function saveUser(draft: UserDraft, roleId: string, original?: User): Promise<void> {
  const body = {
    fullName: draft.name.trim(),
    email: draft.email.trim(),
    ...(!original || original.role !== draft.role ? { roleId } : {}),
    ...(draft.password ? { password: draft.password } : {}),
  };
  if (original) await apiPatch(`/users/${original.id}`, body);
  else await apiPost("/users", body);
  invalidateQueries(USERS_QUERY);
}

export async function setUserActive(id: string, active: boolean): Promise<void> {
  await apiPatch(`/users/${id}/active`, { isActive: active });
  invalidateQueries(USERS_QUERY);
}
