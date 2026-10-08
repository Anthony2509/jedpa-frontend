"use client";

import { BottomNav } from "@/shared/ui/layout/BottomNav";
import { useSidebarGroups } from "../hooks/useSidebarGroups";

export function BottomNavContainer() {
  const [home, process] = useSidebarGroups();
  return <BottomNav items={[...home.items, ...(process?.items ?? [])]} />;
}
