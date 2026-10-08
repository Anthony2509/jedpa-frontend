"use client";

import { useMemo, useState } from "react";
import { EMPTY_PARTICIPANT_FILTERS, filterParticipants } from "../domain/filterParticipants";
import type { Participant, ParticipantFilters } from "../types";

export function useParticipantFilters(participants: Participant[], initial?: Partial<ParticipantFilters>) {
  const [filters, setFilters] = useState<ParticipantFilters>({ ...EMPTY_PARTICIPANT_FILTERS, ...initial });

  const filtered = useMemo(() => filterParticipants(participants, filters), [participants, filters]);

  function setFilter(key: keyof ParticipantFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return { filters, filtered, setFilter };
}
