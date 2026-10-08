import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, actions, children, className }: CardProps) {
  return (
    <section className={cn("rounded-lg border border-neutral-200 bg-white", className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3 sm:px-5">
          {title && <h2 className="text-[15px] font-semibold text-neutral-900">{title}</h2>}
          {actions}
        </header>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}
