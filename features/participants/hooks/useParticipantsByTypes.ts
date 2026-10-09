"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import { PARTICIPANTS_QUERY, fetchParticipantsByTypes } from "../services/participantsApi";

/** Participants of the given types, from the API. Pass null to wait for the type ids. */
export function useParticipantsByTypes(typeIds: string[] | null) {
  const key = typeIds ? `${PARTICIPANTS_QUERY}?types=${typeIds.join(",")}` : null;
  return useApiQuery(key, () => fetchParticipantsByTypes(typeIds ?? []));
}
