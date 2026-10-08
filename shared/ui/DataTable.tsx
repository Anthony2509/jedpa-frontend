import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { DataTableCards } from "./DataTableCards";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Applies to the desktop/tablet table only, e.g. "hidden lg:table-cell" to drop a column on tablets. */
  className?: string;
  /** Role in the phone card. Defaults: first column = title, columns without header = action, rest = detail. */
  mobile?: "title" | "detail" | "action" | "hidden";
  mobileLabel?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  /** "scroll" keeps the table on phones (wide spreadsheet-like previews). */
  mobileLayout?: "cards" | "scroll";
}

export function DataTable<T>({ columns, rows, getRowKey, onRowClick, emptyMessage, mobileLayout = "cards" }: DataTableProps<T>) {
  if (rows.length === 0) return <EmptyState message={emptyMessage ?? "No hay resultados."} />;
  const cards = mobileLayout === "cards";

  return (
    <>
      {cards && (
        <div className="md:hidden">
          <DataTableCards columns={columns} rows={rows} getRowKey={getRowKey} onRowClick={onRowClick} />
        </div>
      )}
      <div className={cn("overflow-x-auto rounded-lg border border-neutral-200 bg-white", cards && "hidden md:block")}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50/80 text-xs text-neutral-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={cn("px-4 py-2.5 font-medium", column.className)}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((row) => (
              <tr
                key={getRowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer hover:bg-neutral-50")}
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-4 py-3.5 text-neutral-700", column.className)}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
