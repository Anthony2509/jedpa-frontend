"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { usePermission } from "@/features/auth";
import { ParticipantsFilters, useParticipants, type ParticipantFilters } from "@/features/participants";
import { downloadCsv } from "@/shared/lib/downloadCsv";
import { formatDateTime } from "@/shared/lib/formatDate";
import { Button } from "@/shared/ui/Button";
import { PageHeader } from "@/shared/ui/PageHeader";
import { MacroProgressTable } from "../components/MacroProgressTable";
import { ReportPreviewTable } from "../components/ReportPreviewTable";
import { buildMacroProgress } from "../domain/macroProgress";
import { EMPTY_REPORT_FILTERS, MOCK_MACRO_OPTIONS, MOCK_TYPE_OPTIONS, filterReportParticipants } from "../domain/filterReportParticipants";
import { REPORT_COLUMNS, buildReportRows, buildReportSheet } from "../domain/reportColumns";
import { MockDataNotice } from "@/shared/ui/MockDataNotice";

export function ReportsContainer() {
  const participants = useParticipants();
  const fullAccess = usePermission("reports_full");
  const [filters, setFilters] = useState<ParticipantFilters>(EMPTY_REPORT_FILTERS);
  const filtered = useMemo(() => filterReportParticipants(participants, filters), [participants, filters]);
  const setFilter = (key: keyof ParticipantFilters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const exportCsv = (name: string, rows: typeof participants) => downloadCsv(name, buildReportSheet(rows, formatDateTime));

  return (
    <>
      <PageHeader
        title="Reportes"
        description="Avance por macrorregión y, para administradores, el consolidado completo exportable a Excel."
        actions={
          fullAccess && (
            <>
              <Button variant="secondary" icon={<Download className="size-4" />} onClick={() => exportCsv("jedpa-consolidado.csv", participants)}>
                Consolidado completo
              </Button>
              <Button icon={<Download className="size-4" />} disabled={filtered.length === 0} onClick={() => exportCsv("jedpa-filtrado.csv", filtered)}>
                Exportar filtrado ({filtered.length})
              </Button>
            </>
          )
        }
      />
      <MockDataNotice />
      <section className="mb-10">
        <h2 className="mb-3 text-[15px] font-semibold text-neutral-900">Avance por macrorregión</h2>
        <MacroProgressTable rows={buildMacroProgress(participants)} />
      </section>
      {fullAccess && (
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-neutral-900">Detalle por participante</h2>
          <ParticipantsFilters filters={filters} macroOptions={MOCK_MACRO_OPTIONS} typeOptions={MOCK_TYPE_OPTIONS} onChange={setFilter} />
          <ReportPreviewTable headers={REPORT_COLUMNS.map((c) => c.header)} rows={buildReportRows(filtered, formatDateTime)} />
        </section>
      )}
    </>
  );
}
