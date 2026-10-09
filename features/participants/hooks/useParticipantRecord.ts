"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import { isMockParticipantId } from "../domain/dataSource";
import { PARTICIPANTS_QUERY, fetchParticipantRecord } from "../services/participantsApi";
import { useParticipant } from "./useParticipants";

/** The participant record: from the API, or from the mock store for mock ids (TEMP). */
export function useParticipantRecord(id: string) {
  const mock = isMockParticipantId(id);
  const mockParticipant = useParticipant(id);
  const query = useApiQuery(mock ? null : `${PARTICIPANTS_QUERY}/${id}`, () => fetchParticipantRecord(id));
  if (mock) return { participant: mockParticipant, loading: false, error: null };
  return { participant: query.data, loading: query.loading, error: query.error };
}
