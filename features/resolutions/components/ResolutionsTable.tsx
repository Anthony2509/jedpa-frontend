import { Badge } from "@/shared/ui/Badge";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { FileUploadButton } from "@/shared/ui/FileUploadButton";
import { RowSummary } from "@/shared/ui/RowSummary";
import type { Resolution } from "../types";

export interface ResolutionRow extends Resolution {
  pendingConfirmations: number;
}

interface ResolutionsTableProps {
  rows: ResolutionRow[];
  formatDate: (iso: string) => string;
  onUpload: (row: ResolutionRow, fileName: string) => void;
}

function Pending({ count }: { count: number }) {
  if (!count) return <span className="text-xs text-neutral-400">Nadie por confirmar</span>;
  return (
    <span className="tabular-nums">
      <span className="text-sm font-semibold text-brand">{count}</span>
      <span className="text-xs text-neutral-600"> por confirmar</span>
    </span>
  );
}

function ResolutionFile({ row, formatDate }: { row: ResolutionRow; formatDate: (iso: string) => string }) {
  if (!row.fileName) return <Badge tone="brand">Falta cargar</Badge>;
  return (
    <div className="leading-snug">
      <p className="text-neutral-900">{row.fileName}</p>
      <p className="text-xs text-neutral-500">{row.uploadedBy} · {row.uploadedAt ? formatDate(row.uploadedAt) : ""}</p>
    </div>
  );
}

export function ResolutionsTable({ rows, formatDate, onUpload }: ResolutionsTableProps) {
  const columns: Column<ResolutionRow>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (r) => (
        <RowSummary
          title={`Macro ${r.macro.slice(1)}`}
          subtitle={r.fileName}
          note={r.uploadedAt ? `${r.uploadedBy} · ${formatDate(r.uploadedAt)}` : undefined}
        >
          {!r.fileName && <Badge tone="brand">Falta cargar</Badge>}
          <Pending count={r.pendingConfirmations} />
        </RowSummary>
      ),
    },
    { key: "macro", header: "Macro", className: "w-[10%]", mobile: "hidden", render: (r) => <span className="font-semibold text-neutral-950">{r.macro}</span> },
    { key: "file", header: "Resolución", mobile: "hidden", render: (r) => <ResolutionFile row={r} formatDate={formatDate} /> },
    { key: "pending", header: "Participantes", mobile: "hidden", render: (r) => <Pending count={r.pendingConfirmations} /> },
    {
      key: "action",
      header: "",
      className: "w-px text-right",
      render: (r) => (
        <FileUploadButton
          label={r.fileName ? "Reemplazar" : "Cargar resolución"}
          emphasis={r.fileName ? "quiet" : "primary"}
          onSelect={(fileName) => onUpload(r, fileName)}
        />
      ),
    },
  ];
  return <DataTable columns={columns} rows={rows} getRowKey={(r) => r.macro} />;
}
