import type { ReactNode } from "react";
import { LogOut, Menu } from "lucide-react";
import { Avatar } from "../Avatar";

interface TopbarProps {
  userName: string;
  userRole: string;
  search?: ReactNode;
  tools?: ReactNode;
  onOpenNav: () => void;
  onLogout: () => void;
}

export function Topbar({ userName, userRole, search, tools, onOpenNav, onLogout }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-3 sm:gap-4 md:h-16 md:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Abrir menú"
        className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      <div className="min-w-0 flex-1">{search}</div>
      {tools && <div className="hidden sm:block">{tools}</div>}
      <div className="flex items-center gap-3">
        <Avatar name={userName} />
        <div className="hidden leading-tight md:block">
          <p className="text-sm font-medium text-neutral-900">{userName}</p>
          <p className="text-xs text-neutral-500">{userRole}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onLogout}
        aria-label="Cerrar sesión"
        className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
      >
        <LogOut className="size-4" />
      </button>
    </header>
  );
}
