"use client";

import { Suspense, useState, type ReactNode } from "react";
import { AppFrame } from "@/shared/ui/layout/AppFrame";
import { BottomNavContainer } from "./BottomNavContainer";
import { SidebarContainer } from "./SidebarContainer";
import { TopbarContainer } from "./TopbarContainer";

interface AppShellProps {
  children: ReactNode;
}

const SIDEBAR_FALLBACK = <aside className="h-full w-full border-r border-neutral-200 bg-white" />;

export function AppShell({ children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <AppFrame
      sidebar={
        <Suspense fallback={SIDEBAR_FALLBACK}>
          <SidebarContainer onNavigate={closeNav} />
        </Suspense>
      }
      topbar={<TopbarContainer onOpenNav={() => setNavOpen(true)} />}
      bottomNav={
        <Suspense fallback={null}>
          <BottomNavContainer />
        </Suspense>
      }
      navOpen={navOpen}
      onCloseNav={closeNav}
    >
      {children}
    </AppFrame>
  );
}
