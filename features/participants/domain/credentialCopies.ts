import type { CredentialCopy, Participant } from "../types";

/** Original + up to 3 duplicates ("Respuestas preguntas", question 4). */
export const COPY_LABELS = ["Original", "Duplicado 1", "Duplicado 2", "Duplicado 3"];

export const MAX_COPIES = COPY_LABELS.length;

export function getLatestCopy(participant: Participant): CredentialCopy | undefined {
  return participant.credential?.copies.at(-1);
}

export function getCopyLabel(copy: Pick<CredentialCopy, "number">): string {
  return COPY_LABELS[copy.number] ?? `Copia ${copy.number}`;
}

export function canPrintDuplicate(participant: Participant): boolean {
  const copies = participant.credential?.copies.length ?? 0;
  return copies > 0 && copies < MAX_COPIES;
}

export function getNextCopyLabel(participant: Participant): string {
  return COPY_LABELS[participant.credential?.copies.length ?? 0] ?? "";
}
