"use client";

import { useRouter } from "next/navigation";
import { ROLE_META, logout, useCurrentUser } from "@/features/auth";
import { Topbar } from "@/shared/ui/layout/Topbar";
import { GlobalSearchContainer } from "./GlobalSearchContainer";

interface TopbarContainerProps {
  onOpenNav: () => void;
}

export function TopbarContainer({ onOpenNav }: TopbarContainerProps) {
  const router = useRouter();
  const user = useCurrentUser();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <Topbar
      search={<GlobalSearchContainer />}
      userName={user.name}
      userRole={ROLE_META[user.role].label}
      onOpenNav={onOpenNav}
      onLogout={handleLogout}
    />
  );
}
