import { DataTable, type Column } from "@/shared/ui/DataTable";
import { RowSummary } from "@/shared/ui/RowSummary";
import { AUDIT_ACTION_LABELS } from "../domain/auditActions";
import { describeChange } from "../domain/describeChange";
import type { AuditEntry } from "../types";

interface AuditTableProps {
  entries: AuditEntry[];
  formatDate: (iso: string) => string;
  onSelect: (entry: AuditEntry) => void;
}

/** What happened leads; who and when support it. */
function ActionCell({ entry }: { entry: AuditEntry }) {
  return (
    <div className="leading-snug">
      <p className="font-semibold text-neutral-950">{AUDIT_ACTION_LABELS[entry.action]}</p>
      <p className="text-xs text-neutral-500">{entry.participantName}</p>
    </div>
  );
}

export function AuditTable({ entries, formatDate, onSelect }: AuditTableProps) {
  const columns: Column<AuditEntry>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (e) => (
        <RowSummary title={AUDIT_ACTION_LABELS[e.action]} subtitle={e.participantName} note={`${e.userName} · ${formatDate(e.at)}`}>
          {describeChange(e) && <p className="rounded-md bg-neutral-50 px-2.5 py-1.5 text-xs text-neutral-700">{describeChange(e)}</p>}
        </RowSummary>
      ),
    },
    { key: "action", header: "Acción", className: "w-[30%]", mobile: "hidden", render: (e) => <ActionCell entry={e} /> },
    { key: "change", header: "Detalle", className: "hidden xl:table-cell", mobile: "hidden", render: (e) => <span className="text-neutral-600">{describeChange(e) ?? "—"}</span> },
    { key: "user", header: "Usuario", mobile: "hidden", render: (e) => <span className="text-neutral-800">{e.userName}</span> },
    { key: "at", header: "Fecha y hora", className: "whitespace-nowrap", mobile: "hidden", render: (e) => <span className="tabular-nums text-neutral-500">{formatDate(e.at)}</span> },
  ];
  return (
    <DataTable columns={columns} rows={entries} getRowKey={(e) => e.id} onRowClick={onSelect} emptyMessage="No hay registros." />
  );
}
