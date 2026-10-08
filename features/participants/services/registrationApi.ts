import { DOCUMENT_TYPES, OPTIONAL_DOCUMENTS, REQUIRED_DOCUMENTS } from "../domain/documentTypes";
import { DEFAULT_ACCESS, PARTICIPANT_TYPE_LABELS } from "../domain/participantTypes";
import type { Gender, MacroId, Participant, ParticipantDocument, ParticipantDraft, ParticipantType, SpecialDraft } from "../types";
import { auditParticipantChange, currentActor } from "./auditContext";
import { participantsStore, updateParticipant } from "./participantsStore";

export function buildEmptyDocuments(type: ParticipantType): ParticipantDocument[] {
  const tracked = [...REQUIRED_DOCUMENTS[type], ...OPTIONAL_DOCUMENTS[type]];
  return DOCUMENT_TYPES.map((documentType) => ({
    type: documentType,
    status: tracked.includes(documentType) ? "pending" : "not_applicable",
  }));
}

function addParticipant(base: Omit<Participant, "id" | "documents" | "createdAt">): Participant {
  const existing = participantsStore.getSnapshot();
  if (existing.some((p) => p.idType === base.idType && p.idNumber === base.idNumber)) {
    throw new Error("Ya existe un participante con ese documento de identidad.");
  }
  const participant: Participant = {
    ...base,
    id: `p-${existing.length + 1}`,
    documents: buildEmptyDocuments(base.type),
    createdAt: currentActor().at,
  };
  participantsStore.update((participants) => [participant, ...participants]);
  auditParticipantChange(participant, { action: "participant_created", after: PARTICIPANT_TYPE_LABELS[base.type] });
  return participant;
}

export async function createParticipant(draft: ParticipantDraft): Promise<Participant> {
  const { school, macro, region, sport, sportCode, category, gender, ...identity } = draft;
  return addParticipant({
    ...identity,
    school: school || undefined,
    access: DEFAULT_ACCESS[draft.type],
    delegation: {
      macro: macro as MacroId,
      region,
      sport,
      sportCode: sportCode.toUpperCase(),
      category,
      gender: gender as Gender,
    },
  });
}

/** Special credentials (MINEDU, guests, suppliers): no documents, ready to generate right away. */
export async function createSpecialParticipant(draft: SpecialDraft): Promise<Participant> {
  return addParticipant(draft);
}

/** ASSUMPTION (pending confirmation): an athlete missing mandatory documents becomes a companion. */
export async function convertToCompanion(participantId: string): Promise<void> {
  const updated = updateParticipant(participantId, (participant) => ({
    ...participant,
    type: "companion",
    documents: buildEmptyDocuments("companion").map(
      (empty) => participant.documents.find((document) => document.type === empty.type && empty.status !== "not_applicable") ?? empty,
    ),
  }));
  auditParticipantChange(updated, { action: "participant_updated", field: "Tipo", before: "Deportista", after: "Acompañante" });
}
