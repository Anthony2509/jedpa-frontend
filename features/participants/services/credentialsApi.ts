import { getCopyLabel, MAX_COPIES } from "../domain/credentialCopies";
import { isMockParticipantId } from "../domain/dataSource";
import type { CredentialCopy, Participant } from "../types";
import { auditParticipantChange, currentActor } from "./auditContext";
import { downloadCopyPdf, registerCopy } from "./credentialsRemote";
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

/** Mock only: the API has no "issued" step (printing creates the copy and its QR). */
export async function issueCredential(participantId: string): Promise<void> {
  const { at, by } = currentActor();
  const updated = updateParticipant(participantId, (participant) => ({
    ...participant,
    credential: participant.credential ?? { code: buildCode(participant), issuedAt: at, issuedBy: by, copies: [] },
  }));
  auditParticipantChange(updated, { action: "credential_issued", after: updated.credential?.code });
}

/**
 * Prints the original. With the API it registers the copy and returns its PDF to send to the
 * printer; the mock returns null.
 */
export async function printCredential(participantId: string): Promise<Blob | null> {
  if (!isMockParticipantId(participantId)) {
    await registerCopy(participantId, 0);
    return downloadCopyPdf(participantId, 0);
  }
  const updated = updateParticipant(participantId, (participant) => addCopy(participant));
  auditParticipantChange(updated, { action: "credential_printed", after: updated.credential?.code });
  return null;
}

/** Prints the next duplicate (up to 3). The reason is mandatory and audited; the API revokes the previous QR. */
export async function printDuplicate(participant: Participant, reason: string): Promise<Blob | null> {
  if (!isMockParticipantId(participant.id)) {
    const next = participant.credential?.copies.length ?? 0;
    await registerCopy(participant.id, next, reason);
    return downloadCopyPdf(participant.id, next);
  }
  const updated = updateParticipant(participant.id, (current) => addCopy(current, reason));
  const copy = updated.credential?.copies.at(-1);
  auditParticipantChange(updated, { action: "credential_reprinted", after: copy && getCopyLabel(copy), detail: reason });
  return null;
}

/** Downloads the PDF of a copy already printed (paper jam, printer change). API only. */
export function reprintSameCopy(participantId: string, copyNumber: number): Promise<Blob> {
  return downloadCopyPdf(participantId, copyNumber);
}
