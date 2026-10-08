import { getCurrentUser } from "@/features/auth";
import { logAuditEntry, type NewAuditEntry } from "@/features/audit";
import { nowIso } from "@/shared/lib/formatDate";
import { getFullName } from "../domain/participantName";
import type { Participant } from "../types";

type AuditDetails = Pick<NewAuditEntry, "action" | "field" | "before" | "after" | "detail">;

/** Every participant mutation goes through here so it is always audited. */
export function auditParticipantChange(participant: Participant, details: AuditDetails): void {
  logAuditEntry({
    ...details,
    at: nowIso(),
    userName: getCurrentUser().name,
    participantId: participant.id,
    participantName: getFullName(participant),
  });
}

export function currentActor() {
  return { at: nowIso(), by: getCurrentUser().name };
}
