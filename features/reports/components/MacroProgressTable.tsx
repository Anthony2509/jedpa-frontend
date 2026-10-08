import { cn } from "@/shared/lib/cn";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { RowSummary } from "@/shared/ui/RowSummary";
import type { MacroProgress } from "../domain/macroProgress";

interface MacroProgressTableProps {
  rows: MacroProgress[];
}

const percentOf = (value: number, total: number) => (total ? Math.round((value / total) * 100) : 0);

function Bar({ value, total, wide }: { value: number; total: number; wide?: boolean }) {
  const percent = percentOf(value, total);
  return (
    <div className="flex items-center gap-3">
      <div className={cn("h-1.5 overflow-hidden rounded-full bg-neutral-100", wide ? "flex-1" : "w-24")}>
        <div className="h-full rounded-full bg-brand" style={{ width: `${percent}%` }} />
      </div>
      <span className={cn("w-10 text-right text-sm font-medium tabular-nums", percent ? "text-neutral-950" : "text-neutral-400")}>{percent}%</span>
    </div>
  );
}

/** "x de total": the count is what matters, the total is context. Zero stays quiet. */
function Count({ value, total }: { value: number; total: number }) {
  return (
    <span className="tabular-nums">
      <span className={value ? "font-medium text-neutral-950" : "text-neutral-400"}>{value}</span>
      <span className="text-xs text-neutral-400"> de {total}</span>
    </span>
  );
}

const COLUMNS: Column<MacroProgress>[] = [
  {
    key: "card",
    header: "",
    className: "hidden",
    mobile: "title",
    render: (r) => (
      <RowSummary title={`Macro ${r.macro.slice(1)}`} subtitle={`${r.total} participantes`}>
        <Bar value={r.delivered} total={r.total} wide />
        <dl className="grid grid-cols-3 gap-2 text-xs text-neutral-500">
          <div><dt>Docs. completos</dt><dd className="mt-0.5"><Count value={r.documentsComplete} total={r.total} /></dd></div>
          <div><dt>Impresas</dt><dd className="mt-0.5"><Count value={r.printed} total={r.total} /></dd></div>
          <div><dt>Entregadas</dt><dd className="mt-0.5"><Count value={r.delivered} total={r.total} /></dd></div>
        </dl>
      </RowSummary>
    ),
  },
  { key: "macro", header: "Macro", mobile: "hidden", render: (r) => <span className="font-semibold text-neutral-950">{r.macro}</span> },
  { key: "total", header: "Participantes", mobile: "hidden", render: (r) => <span className="tabular-nums text-neutral-700">{r.total}</span> },
  { key: "docs", header: "Documentos completos", mobile: "hidden", render: (r) => <Count value={r.documentsComplete} total={r.total} /> },
  { key: "printed", header: "Impresas", mobile: "hidden", render: (r) => <Count value={r.printed} total={r.total} /> },
  { key: "delivered", header: "Entregadas", mobile: "hidden", render: (r) => <Count value={r.delivered} total={r.total} /> },
  { key: "progress", header: "Avance de entrega", mobile: "hidden", render: (r) => <Bar value={r.delivered} total={r.total} /> },
];

export function MacroProgressTable({ rows }: MacroProgressTableProps) {
  return <DataTable columns={COLUMNS} rows={rows} getRowKey={(r) => r.macro} />;
}
