"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { hasPermission, useCurrentUser } from "@/features/auth";
import { WORK_QUEUES, getWorkQueue, parseWorkQueueId, useParticipants } from "@/features/participants";
import type { SidebarGroup, SidebarItem } from "@/shared/ui/layout/Sidebar";
import { PROCESS_QUEUES, STATIC_GROUPS, isActivePath, type NavigationGroup } from "../domain/navigationItems";

export function useSidebarGroups(): SidebarGroup[] {
  const pathname = usePathname();
  const fromQueue = parseWorkQueueId(useSearchParams().get("from"));
  const participants = useParticipants();
  const { role } = useCurrentUser();

  // A record opened from a queue keeps that process step highlighted.
  const isActive = (href: string) => (fromQueue ? href === WORK_QUEUES[fromQueue].href : isActivePath(pathname, href));

  const toGroup = (group: NavigationGroup): SidebarGroup => ({
    ...group,
    items: group.items
      .filter((item) => !item.permission || hasPermission(role, item.permission))
      .map((item) => ({ ...item, icon: item.icon ?? null, active: isActive(item.href) })),
  });

  const processItems: SidebarItem[] = PROCESS_QUEUES.map((queue) => {
    const meta = WORK_QUEUES[queue];
    return {
      href: meta.href,
      label: meta.label,
      icon: null,
      step: meta.step,
      badge: getWorkQueue(queue, participants).length,
      active: isActive(meta.href),
    };
  });

  const groups = [toGroup(STATIC_GROUPS.home), { title: "Proceso", items: processItems }, ...STATIC_GROUPS.rest.map(toGroup)];
  return groups.filter((group) => group.items.length > 0);
}
