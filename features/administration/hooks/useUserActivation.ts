"use client";

import { useState } from "react";
import type { User } from "@/features/auth";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { setUserActive } from "../services/usersApi";

/** Activate/deactivate, surfacing the API's rules (not yourself, not the last admin). */
export function useUserActivation() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function toggle(user: User) {
    setBusy(true);
    setError(null);
    try {
      await setUserActive(user.id, !user.active);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return { error, busy, toggle };
}
