import { getCopyLabel, type CredentialCopy } from "@/features/participants";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { DataTable, type Column } from "@/shared/ui/DataTable";

interface CopiesTableProps {
  copies: CredentialCopy[];
  formatDate: (iso: string) => string;
  /** API copies: download the same copy's PDF again. */
  onDownload?: (copy: CredentialCopy) => void;
}

export function CopiesTable({ copies, formatDate, onDownload }: CopiesTableProps) {
  const columns: Column<CredentialCopy>[] = [
    {
      key: "copy",
      header: "Copia",
      render: (c) => (
        <span className="flex items-center gap-2 font-medium text-neutral-900">
          {getCopyLabel(c)}
          {c.revoked && <Badge tone="outline">QR revocado</Badge>}
        </span>
      ),
    },
    { key: "printed", header: "Impresa", render: (c) => `${formatDate(c.printedAt)} · ${c.printedBy}` },
    { key: "reason", header: "Motivo", render: (c) => c.reason ?? "—" },
    {
      key: "delivery",
      header: "Entrega",
      render: (c) => (c.delivery ? `${c.delivery.placeName} · ${formatDate(c.delivery.at)}` : "Pendiente"),
    },
    ...(onDownload
      ? [{
          key: "pdf",
          header: "",
          className: "w-px text-right",
          render: (c: CredentialCopy) =>
            c.revoked ? null : <Button size="sm" variant="ghost" onClick={() => onDownload(c)}>PDF</Button>,
        }]
      : []),
  ];
  return <DataTable columns={columns} rows={copies} getRowKey={(c) => String(c.number)} />;
}
