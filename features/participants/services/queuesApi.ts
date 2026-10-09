import { QUEUE_STATUSES, type WorkQueueId } from "../domain/workQueues";
import type { Participant, ParticipantStatus } from "../types";
import { STATUS_TO_API } from "./apiCodes";
import { MAX_PAGE_SIZE, fetchParticipantsPage } from "./participantsApi";

export interface QueuePage {
  participants: Participant[];
  total: number;
}

/** Participants with any of the statuses, oldest first (first come, first served). First page of each. */
export async function fetchByStatuses(statuses: ParticipantStatus[]): Promise<QueuePage> {
  const pages = await Promise.all(
    statuses.map((status) => fetchParticipantsPage({ status: STATUS_TO_API[status], page: 1, limit: MAX_PAGE_SIZE })),
  );
  const participants = pages.flatMap((page) => page.data).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return { participants, total: pages.reduce((sum, page) => sum + page.meta.total, 0) };
}

export const fetchWorkQueue = (queue: WorkQueueId) => fetchByStatuses(QUEUE_STATUSES[queue]);

/** Totals for the menu counters: one request per status asking for a single row. */
export async function fetchQueueCounts(): Promise<Record<WorkQueueId, number>> {
  const statuses = [...new Set(Object.values(QUEUE_STATUSES).flat())];
  const totals = await Promise.all(statuses.map((status) => fetchParticipantsPage({ status: STATUS_TO_API[status], limit: 1 })));
  const byStatus = new Map(statuses.map((status, index) => [status, totals[index].meta.total]));
  const count = (queue: WorkQueueId) => QUEUE_STATUSES[queue].reduce((sum, status) => sum + (byStatus.get(status) ?? 0), 0);
  return { registration: count("registration"), review: count("review"), credentials: count("credentials"), delivery: count("delivery") };
}
