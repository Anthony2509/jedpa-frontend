import {
  DOCUMENT_STATUS_META,
  DOCUMENT_TYPE_LABELS,
  PARTICIPANT_STATUS_META,
  PARTICIPANT_TYPE_LABELS,
  getDelegationCode,
  getFullName,
  getParticipantStatus,
  getRequiredDocuments,
  type Participant,
} from "@/features/participants";
import type { BadgeTone } from "@/shared/ui/Badge";

export interface VerificationView {
  fullName: string;
  typeLabel: string;
  group: string;
  statusLabel: string;
  statusTone: BadgeTone;
  documentsComplete: boolean;
  documents: Array<{ label: string; statusLabel: string; ok: boolean }>;
}

/**
 * What the credential QR shows: documentation status ("Respuestas preguntas", question 1).
 * No identity numbers or files are exposed. Who can open it is still pending confirmation.
 */
export function buildVerificationView(participant: Participant): VerificationView {
  const status = getParticipantStatus(participant);
  const documents = getRequiredDocuments(participant).map((document) => ({
    label: DOCUMENT_TYPE_LABELS[document.type],
    statusLabel: DOCUMENT_STATUS_META[document.status].label,
    ok: document.status === "approved",
  }));
  return {
    fullName: getFullName(participant),
    typeLabel: PARTICIPANT_TYPE_LABELS[participant.type],
    group: getDelegationCode(participant) ?? participant.institution ?? "",
    statusLabel: PARTICIPANT_STATUS_META[status].label,
    statusTone: PARTICIPANT_STATUS_META[status].tone,
    documentsComplete: documents.every((document) => document.ok),
    documents,
  };
}
