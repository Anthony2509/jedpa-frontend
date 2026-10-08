import { getCopyLabel, MAX_COPIES } from "../domain/credentialCopies";
import type { CredentialCopy, Participant } from "../types";
import { auditParticipantChange, currentActor } from "./auditContext";
import { updateParticipant } from "./participantsStore";

function buildCode(participant: Participant): string {
  return `JEDPA-2026-${participant.id.replace("p-", "").padStart(4, "0")}`;
}

function addCopy(participant: Participant, reason?: string): Participant {
  const credential = participant.credential;
  if (!credential) throw new Error("La credencial todavía no fue generada.");
  if (credential.copies.length >= MAX_COPIES) throw new Error("Ya se imprimieron el original y los 3 duplicados.");
  const { at, by } = currentActor();
  const copy: CredentialCopy = { number: credential.copies.length, printedAt: at, printedBy: by, reason };
  return { ...participant, credential: { ...credential, copies: [...credential.copies, copy] } };
}

/** Issues the credential: creates its unique code (the backend will also create the QR token). */
export async function issueCredential(participantId: string): Promise<void> {
  const { at, by } = currentActor();
  const updated = updateParticipant(participantId, (participant) => ({
    ...participant,
    credential: participant.credential ?? { code: buildCode(participant), issuedAt: at, issuedBy: by, copies: [] },
  }));
  auditParticipantChange(updated, { action: "credential_issued", after: updated.credential?.code });
}

export async function printCredential(participantId: string): Promise<void> {
  const updated = updateParticipant(participantId, (participant) => addCopy(participant));
  auditParticipantChange(updated, { action: "credential_printed", after: updated.credential?.code });
}

/** Prints the next duplicate (up to 3). The reason is mandatory and audited. */
export async function printDuplicate(participantId: string, reason: string): Promise<void> {
  const updated = updateParticipant(participantId, (participant) => addCopy(participant, reason));
  const copy = updated.credential?.copies.at(-1);
  auditParticipantChange(updated, { action: "credential_reprinted", after: copy && getCopyLabel(copy), detail: reason });
}
