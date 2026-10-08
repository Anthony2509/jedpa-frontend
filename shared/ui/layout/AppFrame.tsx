import type { ReactNode } from "react";
import { X } from "lucide-react";

interface AppFrameProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  bottomNav?: ReactNode;
  navOpen: boolean;
  onCloseNav: () => void;
  children: ReactNode;
}

/**
 * Desktop (lg+): fixed sidebar. Below lg the same sidebar opens as a drawer,
 * and on phones a bottom bar keeps the four process steps one tap away.
 */
export function AppFrame({ sidebar, topbar, bottomNav, navOpen, onCloseNav, children }: AppFrameProps) {
  return (
    <div className="flex h-dvh bg-neutral-50">
      <div className="hidden w-60 shrink-0 lg:flex">{sidebar}</div>
      {navOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onCloseNav} aria-hidden />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] shadow-xl">
            {sidebar}
            <button
              type="button"
              onClick={onCloseNav}
              aria-label="Cerrar menú"
              className="absolute right-3 top-3.5 rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-6 lg:px-8 lg:py-6">{children}</main>
        {bottomNav && <div className="md:hidden">{bottomNav}</div>}
      </div>
    </div>
  );
}
