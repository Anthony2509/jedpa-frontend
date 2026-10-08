import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { Column } from "./DataTable";

interface DataTableCardsProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
}

function roleOf<T>(column: Column<T>, index: number): NonNullable<Column<T>["mobile"]> {
  if (column.mobile) return column.mobile;
  if (index === 0) return "title";
  return column.header ? "detail" : "action";
}

/** Phone layout of DataTable: separate cards with air between them instead of a squeezed table. */
export function DataTableCards<T>({ columns, rows, getRowKey, onRowClick }: DataTableCardsProps<T>) {
  const pick = (role: string) => columns.filter((column, index) => roleOf(column, index) === role);
  const [title] = pick("title");
  const details = pick("detail");
  const actions = pick("action");

  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li
          key={getRowKey(row)}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
          className={cn(
            "relative rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700",
            onRowClick && "cursor-pointer active:bg-neutral-50",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">{title?.render(row)}</div>
            {actions.length > 0 && (
              <div className="flex shrink-0 items-center gap-2">
                {actions.map((column) => <span key={column.key}>{column.render(row)}</span>)}
              </div>
            )}
            {/* Floating, so full-width card content (stats, bars) is not narrowed by the chevron column. */}
            {actions.length === 0 && onRowClick && <ChevronRight className="absolute right-3 top-4 size-5 text-neutral-300" aria-hidden />}
          </div>
          {details.length > 0 && (
            <dl className="mt-3 space-y-1.5 border-t border-neutral-100 pt-3">
              {details.map((column) => (
                <div key={column.key} className="flex justify-between gap-4">
                  <dt className="text-xs text-neutral-500">{column.mobileLabel ?? column.header}</dt>
                  <dd className="min-w-0 text-right text-[13px] text-neutral-900">{column.render(row)}</dd>
                </div>
              ))}
            </dl>
          )}
        </li>
      ))}
    </ul>
  );
}
