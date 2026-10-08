import { cn } from "@/shared/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div role="tablist" className="mb-5 flex gap-1 overflow-x-auto border-b border-neutral-200">
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "border-brand text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-900",
            )}
          >
            {tab.label}
            {tab.count !== undefined && <span className="ml-1.5 text-xs text-neutral-400">{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
