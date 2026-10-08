"use client";

import { WORK_QUEUES, useParticipants, type Participant, type WorkQueueId } from "@/features/participants";
import { QueueNavigator } from "../components/QueueNavigator";
import { getQueuePosition } from "../domain/queueNavigation";

interface QueueNavigatorContainerProps {
  queue: WorkQueueId;
  participant: Participant;
}

export function QueueNavigatorContainer({ queue, participant }: QueueNavigatorContainerProps) {
  const position = getQueuePosition(queue, useParticipants(), participant);
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
