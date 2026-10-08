import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import type { SidebarItem } from "./Sidebar";

interface BottomNavProps {
  items: SidebarItem[];
}

/** Phone-only tab bar: home plus the four process steps, with pending counts. */
export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="grid grid-cols-5 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)]">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "relative flex flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-[11px]",
            item.active ? "font-medium text-neutral-900" : "text-neutral-500",
          )}
        >
          {item.active && <span className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-brand" aria-hidden />}
          <span className="relative flex h-5 items-center">
            {item.step ? (
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full text-[11px] font-semibold",
                  item.active ? "bg-brand text-white" : "bg-neutral-200 text-neutral-700",
                )}
              >
                {item.step}
              </span>
            ) : (
              item.icon
            )}
            {item.badge ? (
              <span className="absolute -right-4 -top-1.5 min-w-4 rounded-full bg-neutral-900 px-1 text-center text-[10px] font-medium leading-4 text-white">
                {item.badge}
              </span>
            ) : null}
          </span>
          <span className="max-w-full truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
