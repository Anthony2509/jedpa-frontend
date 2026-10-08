"use client";

import { useStore } from "@/shared/lib/useStore";
import { usersStore } from "../services/usersApi";

export function useUsers() {
  return useStore(usersStore);
}
