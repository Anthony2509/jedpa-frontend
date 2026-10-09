"use client";

import { useRouter } from "next/navigation";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Pagination } from "@/shared/ui/Pagination";
import { ParticipantsFilters } from "../components/ParticipantsFilters";
import { ParticipantsTable } from "../components/ParticipantsTable";
import { PARTICIPANT_TYPE_LABELS } from "../domain/participantTypes";
import { useMacroRegions } from "../hooks/useCatalogs";
import { useParticipantFilters } from "../hooks/useParticipantFilters";
import { useParticipantsPage } from "../hooks/useParticipantsPage";
import { useParticipantTypes } from "../hooks/useParticipantTypes";

export function ParticipantsListContainer() {
  const router = useRouter();
  const { filters, applied, page, setFilter, setPage } = useParticipantFilters();
  const list = useParticipantsPage(applied, page);
  const macroOptions = useMacroRegions().map((m) => ({ value: m.id, label: m.name }));
  const typeOptions = (useParticipantTypes().data ?? []).map((t) => ({ value: t.id, label: PARTICIPANT_TYPE_LABELS[t.type] }));
  const meta = list.data?.meta;

  return (
    <>
      <PageHeader
        title="Participantes"
        description={meta ? `Consulta de todos los participantes · ${meta.total} ${meta.total === 1 ? "resultado" : "resultados"}` : "Consulta de todos los participantes"}
      />
      <ParticipantsFilters filters={filters} macroOptions={macroOptions} typeOptions={typeOptions} onChange={setFilter} />
      {list.data ? (
        <>
          <ParticipantsTable participants={list.data.data} onSelect={(p) => router.push(`/participants/${p.id}`)} />
          {meta && <Pagination page={meta.page} pageCount={meta.totalPages} total={meta.total} onChange={setPage} />}
        </>
      ) : (
        <EmptyState message={list.error ?? "Cargando participantes…"} />
      )}
    </>
  );
}
