import type { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    // Phones: search on its own row, filters two per row (a lone last filter spans the row).
    <div className="mb-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:[&>select]:w-auto [&>*:first-child]:col-span-full [&>*:last-child:nth-child(even)]:col-span-full">
      {children}
    </div>
  );
}
