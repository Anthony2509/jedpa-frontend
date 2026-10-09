"use client";

import { WORK_QUEUES, isMockParticipantId, useParticipants, useWorkQueueParticipants, type Participant, type WorkQueueId } from "@/features/participants";
import { QueueNavigator } from "../components/QueueNavigator";
import { getQueuePosition } from "../domain/queueNavigation";

interface QueueNavigatorContainerProps {
  queue: WorkQueueId;
  participant: Participant;
}

export function QueueNavigatorContainer({ queue, participant }: QueueNavigatorContainerProps) {
  const mockParticipants = useParticipants();
  const apiQueue = useWorkQueueParticipants(queue).data?.participants;
  const participants = isMockParticipantId(participant.id) ? mockParticipants : (apiQueue ?? []);
  const position = getQueuePosition(queue, participants, participant);
  const meta = WORK_QUEUES[queue];
  return (
    <QueueNavigator
      queueLabel={meta.label}
      queueHref={meta.href}
      remaining={position.remaining}
      currentDone={position.currentDone}
      nextHref={position.nextId ? `/participants/${position.nextId}?from=${queue}` : undefined}
    />
  );
}
