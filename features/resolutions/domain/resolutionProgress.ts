import { getRequiredDocuments, type MacroId, type Participant } from "@/features/participants";

/** Participants of a macro whose directoral resolution is still not confirmed. */
export function countPendingConfirmations(participants: Participant[], macro: MacroId): number {
  return participants.filter(
    (participant) =>
      participant.delegation?.macro === macro &&
      getRequiredDocuments(participant).some((d) => d.type === "directoral_resolution" && d.status !== "approved"),
  ).length;
}
