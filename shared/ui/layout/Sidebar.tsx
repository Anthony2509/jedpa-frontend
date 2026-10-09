import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { CountBadge, StepNumber } from "./SidebarMarkers";

export interface SidebarItem {
  href: string;
  label: string;
  /** Shorter text for the bottom bar on phones; falls back to `label`. */
  shortLabel?: string;
  icon: ReactNode;
  active: boolean;
  step?: number;
  badge?: number;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

interface SidebarProps {
  header: ReactNode;
  groups: SidebarGroup[];
  /** Only shown inside the mobile drawer (below lg). */
  footer?: ReactNode;
  onNavigate?: () => void;
}

export function Sidebar({ header, groups, footer, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-16 items-center border-b border-neutral-200 px-5">{header}</div>
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
        {groups.map((group, index) => (
          <div key={group.title ?? index}>
            {group.title && (
              <p className="mb-1 px-2 text-[11px] font-medium text-neutral-400">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2 rounded-md border-l-2 px-2 py-2 text-[13px] leading-tight lg:py-1.5",
                      item.active
                        ? "border-brand bg-neutral-100 font-medium text-neutral-900"
                        : "border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
                    )}
                  >
                    {item.step ? <StepNumber step={item.step} active={item.active} /> : item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? <CountBadge count={item.badge} /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="border-t border-neutral-200 p-4 lg:hidden">{footer}</div>}
    </aside>
  );
}
