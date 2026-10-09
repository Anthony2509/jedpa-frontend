import type { BadgeTone } from "@/shared/ui/Badge";
import type { Participant, ParticipantDocument, ParticipantStatus } from "../types";
import { getLatestCopy } from "./credentialCopies";
import { DOCUMENT_TYPE_LABELS, OPTIONAL_DOCUMENTS, REQUIRED_DOCUMENTS } from "./documentTypes";

export const PARTICIPANT_STATUS_META: Record<ParticipantStatus, { label: string; tone: BadgeTone }> = {
  // Red = needs someone to act; black outline = moving through the process; grey = done.
  pending_documents: { label: "Pendiente de documentos", tone: "brandOutline" },
  in_review: { label: "En revisión", tone: "outline" },
  observed: { label: "Observada", tone: "brand" },
  ready_to_print: { label: "Lista para imprimir", tone: "strong" },
  issued: { label: "Emitida", tone: "strong" },
  printed: { label: "Impresa", tone: "strong" },
  delivered: { label: "Entregada", tone: "muted" },
};

export const PARTICIPANT_STATUSES = Object.keys(PARTICIPANT_STATUS_META) as ParticipantStatus[];

/** API documents say whether they are required; mock documents use the frontend tables. */
const fromApi = (participant: Participant) => participant.documents.some((document) => document.required !== undefined);

export function getRequiredDocuments(participant: Participant): ParticipantDocument[] {
  if (fromApi(participant)) return participant.documents.filter((document) => document.required);
  const required = REQUIRED_DOCUMENTS[participant.type];
  return participant.documents.filter((document) => required.includes(document.type));
}

export function getOptionalDocuments(participant: Participant): ParticipantDocument[] {
  if (fromApi(participant)) return participant.documents.filter((d) => !d.required && d.status !== "not_applicable");
  const optional = OPTIONAL_DOCUMENTS[participant.type];
  return participant.documents.filter((document) => optional.includes(document.type));
}

export function getMissingRequirements(participant: Participant): string[] {
  return getRequiredDocuments(participant)
    .filter((document) => document.status !== "approved")
    .map((document) => DOCUMENT_TYPE_LABELS[document.type]);
}

/** The API stores and recalculates the status: when it is there, it is the source of truth. */
export function getParticipantStatus(participant: Participant): ParticipantStatus {
  if (participant.status) return participant.status;
  const latest = getLatestCopy(participant);
  if (latest?.delivery) return "delivered";
  if (latest) return "printed";
  if (participant.credential) return "issued";

  const required = getRequiredDocuments(participant);
  if (required.every((document) => document.status === "approved")) return "ready_to_print";
  if (required.some((document) => document.status === "observed")) return "observed";
  if (required.every((document) => document.fileName)) return "in_review";
  return "pending_documents";
}

export function countDocumentsToReview(participant: Participant): number {
  return getRequiredDocuments(participant).filter((document) => document.status === "pending" && document.fileName).length;
}
