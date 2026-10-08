"use client";

import { formatDateTime } from "@/shared/lib/formatDate";
import { usePagination } from "@/shared/lib/usePagination";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Pagination } from "@/shared/ui/Pagination";
import { AuditDetailModal } from "../components/AuditDetailModal";
import { AuditFiltersBar } from "../components/AuditFiltersBar";
import { AuditTable } from "../components/AuditTable";
import { useAuditEntries } from "../hooks/useAuditEntries";
import { useAuditFilters } from "../hooks/useAuditFilters";

export function AuditContainer() {
  const entries = useAuditEntries();
  const audit = useAuditFilters(entries);
  const pagination = usePagination(audit.filtered, 20);

  return (
    <>
      <PageHeader
        title="Auditoría"
        description={`${audit.filtered.length} registros · los registros no se pueden editar ni eliminar`}
      />
      <AuditFiltersBar filters={audit.filters} userNames={audit.userNames} onChange={audit.setFilter} />
      <AuditTable entries={pagination.pageRows} formatDate={formatDateTime} onSelect={audit.setSelected} />
      <Pagination page={pagination.page} pageCount={pagination.pageCount} total={pagination.total} onChange={pagination.setPage} />
      <AuditDetailModal entry={audit.selected} formatDate={formatDateTime} onClose={() => audit.setSelected(null)} />
    </>
  );
}
