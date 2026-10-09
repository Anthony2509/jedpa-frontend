import type { MacroRegionOption } from "@/features/participants";
import { Button } from "@/shared/ui/Button";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { FileUploadButton } from "@/shared/ui/FileUploadButton";
import { RowSummary } from "@/shared/ui/RowSummary";
import { ResolutionStatusBadge } from "./ResolutionStatusBadge";

interface ResolutionsTableProps {
  rows: MacroRegionOption[];
  busyId: string | null;
  onUpload: (row: MacroRegionOption, file: File) => void;
  onView: (row: MacroRegionOption) => void;
}

/** TEMP(backend): no "participants to confirm" count per macro until the API has a summary endpoint. */
export function ResolutionsTable({ rows, busyId, onUpload, onView }: ResolutionsTableProps) {
  const actions = (r: MacroRegionOption) => (
    <div className="flex gap-2 md:justify-end">
      {r.hasResolution && <Button size="sm" variant="ghost" disabled={busyId === r.id} onClick={() => onView(r)}>Ver PDF</Button>}
      <FileUploadButton
        label={r.hasResolution ? "Reemplazar" : "Cargar resolución"}
        emphasis={r.hasResolution ? "quiet" : "primary"}
        accept=".pdf"
        disabled={busyId === r.id}
        onSelect={(file) => onUpload(r, file)}
      />
    </div>
  );
  const columns: Column<MacroRegionOption>[] = [
    {
      key: "card",
      header: "",
      className: "hidden",
      mobile: "title",
      render: (r) => (
        <RowSummary title={r.name} subtitle={r.code}>
          <ResolutionStatusBadge uploaded={r.hasResolution} />
          <div className="-ml-3">{actions(r)}</div>
        </RowSummary>
      ),
    },
    { key: "macro", header: "Macrorregión", className: "w-[30%]", mobile: "hidden", render: (r) => <span className="font-semibold text-neutral-950">{r.name}</span> },
    { key: "file", header: "Resolución", mobile: "hidden", render: (r) => <ResolutionStatusBadge uploaded={r.hasResolution} /> },
    { key: "action", header: "", className: "w-px text-right", mobile: "hidden", render: actions },
  ];
  return <DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} />;
}
