import { apiGet, apiPatch, apiPost, apiUpload } from "@/shared/lib/apiClient";
import type { DocumentStatus, DocumentType } from "../types";
import { DOCUMENT_STATUS_TO_API, DOCUMENT_TO_API } from "./apiCodes";
import { refreshParticipants } from "./participantsApi";

const documentPath = (participantId: string, type: DocumentType) => `/participants/${participantId}/documents/${DOCUMENT_TO_API[type]}`;

/** Uploads or replaces the file; the document goes back to "pending" for review. */
export async function uploadDocumentFile(participantId: string, type: DocumentType, file: File): Promise<void> {
  const form = new FormData();
  form.append("file", file);
  await apiUpload(documentPath(participantId, type), form);
  refreshParticipants();
}

export async function reviewDocument(participantId: string, type: DocumentType, status: DocumentStatus, observation?: string): Promise<void> {
  await apiPatch(`${documentPath(participantId, type)}/review`, { status: DOCUMENT_STATUS_TO_API[status], observation });
  refreshParticipants();
}

export interface FileLink {
  url: string;
  expiresAt: string;
}

/** Short-lived signed link (5 min; 60 s for health documents). Every link is audited. */
export function fetchDocumentFileLink(participantId: string, type: DocumentType): Promise<FileLink> {
  return apiGet<FileLink>(`${documentPath(participantId, type)}/file`);
}

/** "Figura en la RD": links the macro's resolution to the participant, which approves the requirement. */
export async function linkResolution(macroRegionId: string, participantIds: string[]): Promise<void> {
  await apiPost(`/macro-regions/${macroRegionId}/resolution/links`, { participantIds });
  refreshParticipants();
}
