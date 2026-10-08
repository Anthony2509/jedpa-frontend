import { DataTable, type Column } from "@/shared/ui/DataTable";

interface ReportPreviewTableProps {
  headers: string[];
  rows: string[][];
}

export function ReportPreviewTable({ headers, rows }: ReportPreviewTableProps) {
  const columns: Column<string[]>[] = headers.map((header, index) => ({
    key: header,
    header,
    className: "whitespace-nowrap",
    render: (row) => row[index] || "—",
  }));

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(row) => row[0]}
      mobileLayout="scroll"
      emptyMessage="No hay datos para los filtros seleccionados."
    />
  );
}
