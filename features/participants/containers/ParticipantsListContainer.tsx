"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { usePagination } from "@/shared/lib/usePagination";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Pagination } from "@/shared/ui/Pagination";
import { ParticipantsFilters } from "../components/ParticipantsFilters";
import { ParticipantsTable } from "../components/ParticipantsTable";
import { useParticipantFilters } from "../hooks/useParticipantFilters";
import { useParticipants } from "../hooks/useParticipants";

export function ParticipantsListContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const participants = useParticipants();
  const { filters, filtered, setFilter } = useParticipantFilters(participants, {
    status: searchParams.get("status") ?? "",
  });
  const pagination = usePagination(filtered);

  return (
    <>
      <PageHeader
        title="Participantes"
        description={`Consulta de todos los participantes · ${filtered.length} de ${participants.length}`}
      />
      <ParticipantsFilters filters={filters} onChange={setFilter} />
      <ParticipantsTable participants={pagination.pageRows} onSelect={(p) => router.push(`/participants/${p.id}`)} />
      <Pagination page={pagination.page} pageCount={pagination.pageCount} total={pagination.total} onChange={pagination.setPage} />
    </>
  );
}
