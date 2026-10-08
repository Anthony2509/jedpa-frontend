import { MoreHorizontal } from "lucide-react";

export interface ActionMenuItem {
  id: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

interface ActionMenuProps {
  label: string;
  items: ActionMenuItem[];
  onSelect: (id: string) => void;
}

/** Native <details> dropdown: no internal React state needed. */
export function ActionMenu({ label, items, onSelect }: ActionMenuProps) {
  return (
    <details className="group relative">
      <summary className="inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
        <MoreHorizontal className="size-4" />
        {label}
      </summary>
      <ul className="absolute right-0 z-30 mt-1 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              disabled={item.disabled}
              onClick={(event) => {
                event.currentTarget.closest("details")?.removeAttribute("open");
                onSelect(item.id);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-neutral-800 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-400"
            >
              {item.label}
              {item.hint && <span className="block text-xs text-neutral-400">{item.hint}</span>}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
