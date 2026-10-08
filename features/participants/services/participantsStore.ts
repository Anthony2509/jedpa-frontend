import { createStore } from "@/shared/lib/createStore";
import { buildMockParticipants } from "../mocks/buildMockParticipants";
import { seedAuditLog } from "../mocks/seedAuditLog";
import type { Participant } from "../types";

const initialParticipants = buildMockParticipants();
seedAuditLog(initialParticipants);

/** In-memory mock database. Replace with API calls when the backend is available. */
export const participantsStore = createStore<Participant[]>(initialParticipants);

export function updateParticipant(id: string, recipe: (participant: Participant) => Participant): Participant {
  const current = participantsStore.getSnapshot().find((participant) => participant.id === id);
  if (!current) throw new Error(`Participant ${id} not found`);
  const updated = recipe(current);
  participantsStore.update((participants) => participants.map((p) => (p.id === id ? updated : p)));
  return updated;
}
