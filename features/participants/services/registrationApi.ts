import { isMockParticipantId } from "../domain/dataSource";
import { DOCUMENT_TYPES, OPTIONAL_DOCUMENTS, REQUIRED_DOCUMENTS } from "../domain/documentTypes";
import type { ParticipantDocument, ParticipantType } from "../types";
import { auditParticipantChange } from "./auditContext";
import { changeParticipantType, fetchParticipantTypes } from "./participantsApi";
import { updateParticipant } from "./participantsStore";

function buildEmptyDocuments(type: ParticipantType): ParticipantDocument[] {
  const tracked = [...REQUIRED_DOCUMENTS[type], ...OPTIONAL_DOCUMENTS[type]];
  return DOCUMENT_TYPES.map((documentType) => ({
    type: documentType,
    status: tracked.includes(documentType) ? "pending" : "not_applicable",
  }));
}

/** ASSUMPTION (pending confirmation): an athlete missing mandatory documents becomes a companion. */
export async function convertToCompanion(participantId: string): Promise<void> {
  if (!isMockParticipantId(participantId)) {
    const companion = (await fetchParticipantTypes()).find((info) => info.type === "companion");
    if (!companion) throw new Error("No se encontró el tipo Acompañante en el catálogo.");
    return changeParticipantType(participantId, companion.id);
  }
  const updated = updateParticipant(participantId, (participant) => ({
    ...participant,
    type: "companion",
    documents: buildEmptyDocuments("companion").map(
      (empty) => participant.documents.find((document) => document.type === empty.type && empty.status !== "not_applicable") ?? empty,
    ),
  }));
  auditParticipantChange(updated, { action: "participant_updated", field: "Tipo", before: "Deportista", after: "Acompañante" });
}
