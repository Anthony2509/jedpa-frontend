"use client";

import { useStore } from "@/shared/lib/useStore";
import { participantsStore } from "../services/participantsStore";

export function useParticipants() {
  return useStore(participantsStore);
}

export function useParticipant(id: string) {
  return useParticipants().find((participant) => participant.id === id);
}
