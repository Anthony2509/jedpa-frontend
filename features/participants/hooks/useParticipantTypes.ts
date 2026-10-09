"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import { PARTICIPANT_TYPES_QUERY, fetchParticipantTypes } from "../services/participantsApi";

/** Participant type catalog from the API (ids, category and access level). */
export function useParticipantTypes() {
  return useApiQuery(PARTICIPANT_TYPES_QUERY, fetchParticipantTypes);
}
