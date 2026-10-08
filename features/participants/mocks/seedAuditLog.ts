import { seedAuditEntries, type NewAuditEntry } from "@/features/audit";
import { DOCUMENT_TYPE_LABELS } from "../domain/documentTypes";
import { getFullName } from "../domain/participantName";
import type { Participant } from "../types";
import { REGISTRAR_NAME } from "./seedData";

/** Generates the historical audit entries that match the mock participants. */
export function seedAuditLog(participants: Participant[]): void {
  const entries: NewAuditEntry[] = [];
  const logAuditEntry = (entry: NewAuditEntry) => entries.push(entry);
  for (const participant of participants) {
    const base = { participantId: participant.id, participantName: getFullName(participant) };
    logAuditEntry({ ...base, at: participant.createdAt, userName: REGISTRAR_NAME, action: "participant_created" });

    for (const document of participant.documents) {
      if (!document.reviewedAt || !document.reviewedBy) continue;
      const observed = document.status === "observed";
      logAuditEntry({
        ...base,
        at: document.reviewedAt,
        userName: document.reviewedBy,
        action: observed ? "document_observed" : "document_approved",
        field: DOCUMENT_TYPE_LABELS[document.type],
        before: "Pendiente",
        after: observed ? "Observado" : "Aprobado",
        detail: document.observation,
      });
    }

    const credential = participant.credential;
    if (!credential) continue;
    logAuditEntry({ ...base, at: credential.issuedAt, userName: credential.issuedBy, action: "credential_issued", after: credential.code });
    for (const copy of credential.copies) {
      const action = copy.number === 0 ? "credential_printed" : "credential_reprinted";
      logAuditEntry({ ...base, at: copy.printedAt, userName: copy.printedBy, action, detail: copy.reason });
      if (copy.delivery) {
        const { at, by, placeName } = copy.delivery;
        logAuditEntry({ ...base, at, userName: by, action: "credential_delivered", detail: `Lugar: ${placeName}` });
      }
    }
  }
  seedAuditEntries(entries);
}
