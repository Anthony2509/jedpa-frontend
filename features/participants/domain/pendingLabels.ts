import { DOCUMENT_TYPE_LABELS } from "./documentTypes";
import { getParticipantStatus, getRequiredDocuments } from "./participantStatus";
import type { Participant, PendingSummary } from "../types";

const labelsOf = (documents: { type: keyof typeof DOCUMENT_TYPE_LABELS }[]) =>
  documents.map((document) => DOCUMENT_TYPE_LABELS[document.type]);

/** What a participant still needs in step 1 (registration / document upload). Observed documents come first. */
export function getRegistrationPending(participant: Participant): PendingSummary {
  const required = getRequiredDocuments(participant);
  const observed = required.filter((document) => document.status === "observed");
  if (observed.length > 0) return { tone: "observed", lead: "Corregir", items: labelsOf(observed) };
  return { tone: "missing", lead: "Falta", items: labelsOf(required.filter((document) => !document.fileName)) };
}

/** Documents uploaded and waiting for a reviewer in step 2. */
export function getReviewPending(participant: Participant): PendingSummary {
  const toReview = getRequiredDocuments(participant).filter((document) => document.status === "pending" && document.fileName);
  return { tone: "review", items: labelsOf(toReview) };
}

/** For consultation lists: whatever is holding the participant back right now, if anything. */
export function getCurrentPending(participant: Participant): PendingSummary | null {
  // API list rows come without documents (TEMP(backend): no pending summary in the list yet).
  if (participant.documents.length === 0) return null;
  const status = getParticipantStatus(participant);
  if (status === "pending_documents" || status === "observed") return getRegistrationPending(participant);
  if (status === "in_review") return { ...getReviewPending(participant), lead: "Por revisar" };
  return null;
}
