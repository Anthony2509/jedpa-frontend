import { getCopyLabel, type CredentialCopy } from "@/features/participants";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface CopiesTableProps {
  copies: CredentialCopy[];
  formatDate: (iso: string) => string;
}

export function CopiesTable({ copies, formatDate }: CopiesTableProps) {
  const columns: Column<CredentialCopy>[] = [
    { key: "copy", header: "Copia", render: (c) => <span className="font-medium text-neutral-900">{getCopyLabel(c)}</span> },
    { key: "printed", header: "Impresa", render: (c) => `${formatDate(c.printedAt)} · ${c.printedBy}` },
    { key: "reason", header: "Motivo", render: (c) => c.reason ?? "—" },
    {
      key: "delivery",
      header: "Entrega",
      render: (c) => (c.delivery ? `${c.delivery.placeName} · ${formatDate(c.delivery.at)}` : "Pendiente"),
    },
  ];
  return <DataTable columns={columns} rows={copies} getRowKey={(c) => String(c.number)} />;
}
