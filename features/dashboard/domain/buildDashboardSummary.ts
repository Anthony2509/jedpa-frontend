import {
  PARTICIPANT_STATUSES,
  WORK_QUEUES,
  WORK_QUEUE_IDS,
  getParticipantStatus,
  getWorkQueue,
  type Participant,
  type ParticipantStatus,
  type WorkQueueMeta,
} from "@/features/participants";

export interface ProcessStepSummary extends WorkQueueMeta {
  count: number;
}

export interface DashboardSummary {
  total: number;
  delivered: number;
  byStatus: Record<ParticipantStatus, number>;
  steps: ProcessStepSummary[];
}

export function buildDashboardSummary(participants: Participant[]): DashboardSummary {
  const byStatus = Object.fromEntries(PARTICIPANT_STATUSES.map((status) => [status, 0])) as Record<ParticipantStatus, number>;
  for (const participant of participants) byStatus[getParticipantStatus(participant)] += 1;

  return {
    total: participants.length,
    delivered: byStatus.delivered,
    byStatus,
    steps: WORK_QUEUE_IDS.map((id) => ({ ...WORK_QUEUES[id], count: getWorkQueue(id, participants).length })),
  };
}
