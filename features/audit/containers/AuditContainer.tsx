"use client";

import { formatDateTime } from "@/shared/lib/formatDate";
import { useApiQuery } from "@/shared/lib/useApiQuery";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Pagination } from "@/shared/ui/Pagination";
import { AuditApiFiltersBar } from "../components/AuditApiFiltersBar";
import { AuditDetailModal } from "../components/AuditDetailModal";
import { AuditTable } from "../components/AuditTable";
import { useAuditLog } from "../hooks/useAuditLog";
import { fetchUserOptions } from "../services/usersOptions";

export function AuditContainer() {
  const audit = useAuditLog();
  const users = useApiQuery("users:options", fetchUserOptions).data ?? [];
  const meta = audit.data?.meta;

  return (
    <>
      <PageHeader
        title="Auditoría"
        description={`${meta ? `${meta.total} registros · ` : ""}los registros no se pueden editar ni eliminar`}
      />
      <AuditApiFiltersBar filters={audit.filters} userOptions={users} onChange={audit.setFilter} />
      {audit.data ? (
        <>
          <AuditTable entries={audit.data.data} formatDate={formatDateTime} onSelect={audit.setSelected} />
          {meta && <Pagination page={meta.page} pageCount={meta.totalPages} total={meta.total} onChange={audit.setPage} />}
        </>
      ) : (
        <EmptyState message={audit.error ?? "Cargando auditoría…"} />
      )}
      <AuditDetailModal entry={audit.selected} formatDate={formatDateTime} onClose={() => audit.setSelected(null)} />
    </>
  );
}
