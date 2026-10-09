import { DOCUMENT_STATUS_META, DOCUMENT_TYPE_LABELS } from "../domain/documentTypes";
import { isMockParticipantId } from "../domain/dataSource";
import type { DocumentType, Participant, ParticipantDocument } from "../types";
import { auditParticipantChange, currentActor } from "./auditContext";
import { linkResolution, reviewDocument, uploadDocumentFile } from "./documentsRemote";
import { updateParticipant } from "./participantsStore";

function patchDocument(participant: Participant, type: DocumentType, patch: Partial<ParticipantDocument>): Participant {
  return {
    ...participant,
    documents: participant.documents.map((document) => (document.type === type ? { ...document, ...patch } : document)),
  };
}

function getStatusLabel(participant: Participant, type: DocumentType): string {
  const document = participant.documents.find((item) => item.type === type);
  return document ? DOCUMENT_STATUS_META[document.status].label : "";
}

// Real participants go to the API; the mock ones (TEMP, see dataSource.ts) keep the in-memory flow.

export async function uploadDocument(participantId: string, type: DocumentType, file: File): Promise<void> {
  if (!isMockParticipantId(participantId)) return uploadDocumentFile(participantId, type, file);
  const fileName = file.name;
  const updated = updateParticipant(participantId, (participant) =>
    patchDocument(participant, type, { fileName, status: "pending", observation: undefined }),
  );
  auditParticipantChange(updated, { action: "document_uploaded", field: DOCUMENT_TYPE_LABELS[type], after: fileName });
}

export async function approveDocument(participantId: string, type: DocumentType): Promise<void> {
  if (!isMockParticipantId(participantId)) return reviewDocument(participantId, type, "approved");
  let before = "";
  const { at, by } = currentActor();
  const updated = updateParticipant(participantId, (participant) => {
    before = getStatusLabel(participant, type);
    return patchDocument(participant, type, { status: "approved", observation: undefined, reviewedAt: at, reviewedBy: by });
  });
  auditParticipantChange(updated, { action: "document_approved", field: DOCUMENT_TYPE_LABELS[type], before, after: "Aprobado" });
}

export async function observeDocument(participantId: string, type: DocumentType, observation: string): Promise<void> {
  if (!isMockParticipantId(participantId)) return reviewDocument(participantId, type, "observed", observation);
  let before = "";
  const { at, by } = currentActor();
  const updated = updateParticipant(participantId, (participant) => {
    before = getStatusLabel(participant, type);
    return patchDocument(participant, type, { status: "observed", observation, reviewedAt: at, reviewedBy: by });
  });
  auditParticipantChange(updated, {
    action: "document_observed",
    field: DOCUMENT_TYPE_LABELS[type],
    before,
    after: "Observado",
    detail: observation,
  });
}

/**
 * The directoral resolution is one PDF per macro-region. "Uploading it" to a profile means
 * confirming that the person appears in it, so the document is linked and approved in one step.
 */
export async function confirmInResolution(participant: Participant, resolutionFileName: string): Promise<void> {
  if (!isMockParticipantId(participant.id)) {
    if (!participant.delegation?.macroRegionId) throw new Error("El participante no tiene macrorregión.");
    return linkResolution(participant.delegation.macroRegionId, [participant.id]);
  }
  const { at, by } = currentActor();
  const updated = updateParticipant(participant.id, (participant) =>
    patchDocument(participant, "directoral_resolution", {
      fileName: resolutionFileName,
      status: "approved",
      observation: undefined,
      reviewedAt: at,
      reviewedBy: by,
    }),
  );
  auditParticipantChange(updated, {
    action: "document_approved",
    field: DOCUMENT_TYPE_LABELS.directoral_resolution,
    after: `Figura en ${resolutionFileName}`,
  });
}
