import {
  DOCUMENT_STATUS_META,
  DOCUMENT_TYPE_LABELS,
  getOptionalDocuments,
  getRequiredDocuments,
  type Participant,
  type ParticipantDocument,
} from "@/features/participants";
import type { BadgeTone } from "@/shared/ui/Badge";

export interface DocumentDisplay {
  label: string;
  tone: BadgeTone;
}

/** The one thing to do with this document right now. */
export type DocumentNextAction = "upload" | "replace" | "review" | "confirm_resolution" | null;

export interface DocumentRowModel {
  document: ParticipantDocument;
  label: string;
  required: boolean;
  display: DocumentDisplay;
  nextAction: DocumentNextAction;
}

export function getDocumentDisplay(document: ParticipantDocument, required: boolean): DocumentDisplay {
  if (document.status === "pending") {
    if (document.fileName) return { label: "Por revisar", tone: "strong" };
    return required ? { label: "Sin archivo", tone: "outline" } : { label: "Opcional", tone: "muted" };
  }
  return DOCUMENT_STATUS_META[document.status];
}

function getNextAction(document: ParticipantDocument): DocumentNextAction {
  if (document.status === "not_applicable" || document.status === "approved") return null;
  if (document.type === "directoral_resolution") return "confirm_resolution";
  if (!document.fileName) return "upload";
  if (document.status === "observed") return "replace";
  return "review";
}

function toRow(document: ParticipantDocument, required: boolean): DocumentRowModel {
  return {
    document,
    label: DOCUMENT_TYPE_LABELS[document.type],
    required,
    display: getDocumentDisplay(document, required),
    nextAction: getNextAction(document),
  };
}

/** Documents that need something first, then the rest. */
function pendingFirst(rows: DocumentRowModel[]): DocumentRowModel[] {
  return [...rows].sort((a, b) => Number(!a.nextAction) - Number(!b.nextAction));
}

export function buildDocumentRows(participant: Participant) {
  return {
    required: pendingFirst(getRequiredDocuments(participant).map((d) => toRow(d, true))),
    optional: getOptionalDocuments(participant).map((d) => toRow(d, false)),
  };
}
