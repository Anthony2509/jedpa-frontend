import { getWorkQueue, isInWorkQueue, type Participant, type WorkQueueId } from "@/features/participants";

export interface QueuePosition {
  queue: WorkQueueId;
  remaining: number;
  currentDone: boolean;
  nextId?: string;
}

/** Where the user is inside a work queue, so they can continue without going back to the list. */
export function getQueuePosition(queue: WorkQueueId, participants: Participant[], current: Participant): QueuePosition {
  const others = getWorkQueue(queue, participants).filter((participant) => participant.id !== current.id);
  return {
    queue,
    remaining: others.length,
    currentDone: !isInWorkQueue(queue, current),
    nextId: others[0]?.id,
  };
}
