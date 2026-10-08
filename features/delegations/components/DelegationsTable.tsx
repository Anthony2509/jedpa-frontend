import { DataTable, type Column } from "@/shared/ui/DataTable";
import type { DelegationSummary } from "../domain/buildDelegations";
import { DelegationCard } from "./DelegationCard";
import { DelegationIdentity } from "./DelegationIdentity";
import { DelegationPendingDocs } from "./DelegationPendingDocs";
import { DelegationProgress } from "./DelegationProgress";

interface DelegationsTableProps {
  delegations: DelegationSummary[];
  onOpen: (delegation: DelegationSummary) => void;
}

const COLUMNS: Column<DelegationSummary>[] = [
  { key: "card", header: "", className: "hidden", mobile: "title", render: (d) => <DelegationCard delegation={d} /> },
  { key: "code", header: "Delegación", className: "w-[28%]", mobile: "hidden", render: (d) => <DelegationIdentity delegation={d} /> },
  {
    key: "region",
    header: "Región",
    mobile: "hidden",
    render: (d) => (
      <div className="leading-snug">
        <p className="text-neutral-900">{d.info.region}</p>
        <p className="text-xs text-neutral-500">{d.members.length} integrantes</p>
      </div>
    ),
  },
  { key: "pending", header: "Documentos", className: "hidden xl:table-cell", mobile: "hidden", render: (d) => <DelegationPendingDocs count={d.pendingDocuments} /> },
  { key: "progress", header: "Entrega", mobile: "hidden", render: (d) => <DelegationProgress delegation={d} /> },
];

export function DelegationsTable({ delegations, onOpen }: DelegationsTableProps) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={delegations}
      getRowKey={(d) => d.code}
      onRowClick={onOpen}
      emptyMessage="No hay delegaciones que coincidan con la búsqueda."
    />
  );
}
