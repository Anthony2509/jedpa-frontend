import type { ReactNode } from "react";

export interface DefinitionItem {
  label: string;
  value: ReactNode;
}

interface DefinitionListProps {
  items: DefinitionItem[];
}

export function DefinitionList({ items }: DefinitionListProps) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-medium text-neutral-500">{item.label}</dt>
          <dd className="mt-0.5 text-sm text-neutral-900">{item.value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
