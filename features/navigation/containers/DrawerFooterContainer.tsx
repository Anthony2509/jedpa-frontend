"use client";

import { ROLE_META, RoleSwitcherContainer, useCurrentUser } from "@/features/auth";
import { Avatar } from "@/shared/ui/Avatar";

/** User and prototype role switcher, shown at the bottom of the mobile drawer. */
export function DrawerFooterContainer() {
  const user = useCurrentUser();
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Avatar name={user.name} />
        <div className="leading-tight">
          <p className="text-sm font-medium text-neutral-900">{user.name}</p>
          <p className="text-xs text-neutral-500">{ROLE_META[user.role].label}</p>
        </div>
      </div>
      <div className="sm:hidden">
        <RoleSwitcherContainer />
      </div>
    </div>
  );
}
