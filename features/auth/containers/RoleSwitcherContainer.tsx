"use client";

import { RoleSwitcher } from "../components/RoleSwitcher";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { setDemoRole } from "../services/session";

export function RoleSwitcherContainer() {
  const user = useCurrentUser();
  return <RoleSwitcher role={user.role} onChange={setDemoRole} />;
}
