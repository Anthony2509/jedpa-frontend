import { apiGet, type Paginated } from "@/shared/lib/apiClient";

/** Users for the audit filter (the audit screen is ADMIN only, like /users). */
export async function fetchUserOptions(): Promise<{ value: string; label: string }[]> {
  const page = await apiGet<Paginated<{ id: string; fullName: string }>>("/users", { limit: 100 });
  return page.data.map((user) => ({ value: user.id, label: user.fullName }));
}
