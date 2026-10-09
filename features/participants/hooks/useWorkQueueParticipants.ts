"use client";

import { useApiQuery } from "@/shared/lib/useApiQuery";
import type { WorkQueueId } from "../domain/workQueues";
import type { ParticipantStatus } from "../types";
import { PARTICIPANTS_QUERY, QUEUE_COUNTS_QUERY } from "../services/participantsApi";
import { fetchByStatuses, fetchQueueCounts, fetchWorkQueue } from "../services/queuesApi";

/** A work queue from the API (oldest first). */
export function useWorkQueueParticipants(queue: WorkQueueId) {
  return useApiQuery(`${PARTICIPANTS_QUERY}:queue:${queue}`, () => fetchWorkQueue(queue));
}

/** Participants in any of the statuses (for tabs that are not a work queue, such as "Impresas"). */
export function useParticipantsByStatus(statuses: ParticipantStatus[]) {
  return useApiQuery(`${PARTICIPANTS_QUERY}:status:${statuses.join(",")}`, () => fetchByStatuses(statuses));
}

/**
 * One request per status: reloaded shortly after each action (refreshParticipants) and at most
 * every 30 s otherwise, to catch what other users did.
 */
const COUNTS_MAX_AGE_MS = 30_000;

/** Counters for the menu and the bottom bar. */
export function useQueueCounts() {
  return useApiQuery(QUEUE_COUNTS_QUERY, fetchQueueCounts, { maxAgeMs: COUNTS_MAX_AGE_MS }).data;
}
