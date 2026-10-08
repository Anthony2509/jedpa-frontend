"use client";

import { BrandMark } from "@/shared/ui/BrandMark";
import { Sidebar } from "@/shared/ui/layout/Sidebar";
import { useSidebarGroups } from "../hooks/useSidebarGroups";
import { DrawerFooterContainer } from "./DrawerFooterContainer";

interface SidebarContainerProps {
  onNavigate?: () => void;
}

export function SidebarContainer({ onNavigate }: SidebarContainerProps) {
  const groups = useSidebarGroups();
  return (
    <Sidebar
      header={<BrandMark title="JEDPA 2026" subtitle="Credenciales" />}
      groups={groups}
      footer={<DrawerFooterContainer />}
      onNavigate={onNavigate}
    />
  );
}
