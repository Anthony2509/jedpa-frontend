"use client";

import { useMemo } from "react";
import { useParticipantTypes, useParticipantsByTypes, type ParticipantTypeInfo } from "@/features/participants";

const NO_TYPES: ParticipantTypeInfo[] = [];

/** Special types from the API catalog and the participants of those types. */
export function useSpecialCredentials() {
  const typesQuery = useParticipantTypes();
  const specialTypes = useMemo(() => (typesQuery.data ?? NO_TYPES).filter((info) => info.special), [typesQuery.data]);
  const list = useParticipantsByTypes(typesQuery.data ? specialTypes.map((info) => info.id) : null);

  return {
    specialTypes,
    participants: list.data?.participants,
    total: list.data?.total ?? 0,
    error: typesQuery.error ?? list.error,
  };
}
