"use client";

import { ParticipantStatusBadge, getFullName, getIdentityLabel, getParticipantContext, getParticipantStatus } from "@/features/participants";
import { SearchBox } from "@/shared/ui/SearchBox";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

export function GlobalSearchContainer() {
  const search = useGlobalSearch();

  return (
    <SearchBox
      query={search.query}
      placeholder="Buscar por nombre, documento o delegación…"
      emptyMessage="No se encontraron participantes."
      onQueryChange={search.setQuery}
      onSelect={(result) => search.open(result.id)}
      results={search.matches.map((participant) => ({
        id: participant.id,
        title: getFullName(participant),
        subtitle: `${getIdentityLabel(participant)} · ${getParticipantContext(participant)}`,
        aside: <ParticipantStatusBadge status={getParticipantStatus(participant)} />,
      }))}
    />
  );
}
