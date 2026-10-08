import { EmptyState } from "./EmptyState";

export interface TimelineItem {
  id: string;
  title: string;
  meta: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  emptyMessage?: string;
}

export function Timeline({ items, emptyMessage = "Sin actividad registrada." }: TimelineProps) {
  if (items.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <ol className="relative ml-2 border-l border-neutral-200">
      {items.map((item) => (
        <li key={item.id} className="mb-5 ml-5 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full border-2 border-white bg-neutral-400" />
          <p className="text-sm font-semibold text-neutral-950">{item.title}</p>
          {item.description && <p className="text-[13px] text-neutral-700">{item.description}</p>}
          <p className="mt-0.5 text-xs text-neutral-400">{item.meta}</p>
        </li>
      ))}
    </ol>
  );
}
