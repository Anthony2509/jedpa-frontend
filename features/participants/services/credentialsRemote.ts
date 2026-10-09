import { apiGetBlob, apiPost, apiPostBlob } from "@/shared/lib/apiClient";
import type { CredentialCopyDto } from "./participantDtos";
import { refreshParticipants } from "./participantsApi";

/**
 * Registers the next copy (0 = original, 1-3 = duplicates, with reason) and returns it.
 * `copyNumber` is the one expected: the API rejects it if someone printed in the meantime.
 */
export async function registerCopy(participantId: string, copyNumber: number, reason?: string): Promise<CredentialCopyDto> {
  const copy = await apiPost<CredentialCopyDto>(`/participants/${participantId}/credentials`, { copyNumber, reason });
  refreshParticipants();
  return copy;
}

/** The PDF of an existing copy (for example after a paper jam): it does not create a duplicate. */
export function downloadCopyPdf(participantId: string, copyNumber: number): Promise<Blob> {
  return apiGetBlob(`/participants/${participantId}/credentials/${copyNumber}/pdf`);
}

export interface BatchResult {
  issued: { participantId: string; copyId: string }[];
  skipped: { participantId: string; reason: string }[];
}

/** Prints the originals of up to 100 participants; the ones that can't be printed come back as skipped. */
export async function registerOriginals(participantIds: string[]): Promise<BatchResult> {
  const result = await apiPost<BatchResult>("/credentials/batch", { participantIds });
  refreshParticipants();
  return result;
}

export function downloadCopiesPdf(copyIds: string[]): Promise<Blob> {
  return apiPostBlob("/credentials/pdf", { copyIds });
}

export function downloadTestSheet(): Promise<Blob> {
  return apiGetBlob("/credentials/test-sheet");
}
