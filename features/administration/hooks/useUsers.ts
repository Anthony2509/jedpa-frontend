"use client";

import { useState } from "react";
import { useApiQuery } from "@/shared/lib/useApiQuery";
import { ROLES_QUERY, USERS_QUERY, fetchRoleOptions, fetchUsers } from "../services/usersApi";

/** One page of users from the API. */
export function useUsers() {
  const [page, setPage] = useState(1);
  const query = useApiQuery(`${USERS_QUERY}?page=${page}`, () => fetchUsers(page));
  return { ...query, page, setPage };
}

export function useRoleOptions() {
  return useApiQuery(ROLES_QUERY, fetchRoleOptions).data ?? [];
}
