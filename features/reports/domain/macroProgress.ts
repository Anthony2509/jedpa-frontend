import { MACROS, getParticipantStatus, type MacroId, type Participant } from "@/features/participants";

export interface MacroProgress {
  macro: MacroId;
  total: number;
  documentsComplete: number;
  printed: number;
  delivered: number;
}

const COMPLETE = ["ready_to_print", "issued", "printed", "delivered"];

/** Basic progress report (level 1), the same breakdown the client tracked in the "Avance" sheet. */
export function buildMacroProgress(participants: Participant[]): MacroProgress[] {
  return MACROS.map((macro) => {
    const members = participants.filter((participant) => participant.delegation?.macro === macro);
    const statuses = members.map(getParticipantStatus);
    return {
      macro,
      total: members.length,
      documentsComplete: statuses.filter((status) => COMPLETE.includes(status)).length,
      printed: statuses.filter((status) => status === "printed" || status === "delivered").length,
      delivered: statuses.filter((status) => status === "delivered").length,
    };
  });
}
