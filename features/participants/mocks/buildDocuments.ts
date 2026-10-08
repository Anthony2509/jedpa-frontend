import { DOCUMENT_TYPES, OPTIONAL_DOCUMENTS, REQUIRED_DOCUMENTS } from "../domain/documentTypes";
import type { DocumentType, MacroId, ParticipantDocument, ParticipantType } from "../types";
import { REVIEWER_NAME } from "./seedData";

/** Scenario → status: 0 pending, 1 review, 2 observed, 3 ready, 4 issued, 5 printed, 6 delivered. */
function buildRequired(type: DocumentType, position: number, scenario: number, fileName: string | undefined, at: string): ParticipantDocument {
  if (scenario === 0) return position < 2 ? { type, status: "pending", fileName } : { type, status: "pending" };
  if (scenario === 1) return { type, status: "pending", fileName };
  const reviewed = { reviewedBy: REVIEWER_NAME, reviewedAt: at };
  if (scenario === 2 && position === 1) {
    return { type, status: "observed", fileName, observation: "Documento ilegible, volver a cargar.", ...reviewed };
  }
  return { type, status: "approved", fileName, ...reviewed };
}

function buildFileName(type: DocumentType, idNumber: string, macro?: MacroId): string {
  if (type === "directoral_resolution") return macro === "M8" ? "" : `RD_${macro ?? "M0"}.pdf`;
  return `${type}_${idNumber}.${type === "photo" ? "jpg" : "pdf"}`;
}

export function buildDocuments(
  participantType: ParticipantType,
  scenario: number,
  idNumber: string,
  at: string,
  macro?: MacroId,
): ParticipantDocument[] {
  const required = REQUIRED_DOCUMENTS[participantType];
  const optional = OPTIONAL_DOCUMENTS[participantType];
  return DOCUMENT_TYPES.map((type): ParticipantDocument => {
    const fileName = buildFileName(type, idNumber, macro) || undefined;
    if (required.includes(type)) return buildRequired(type, required.indexOf(type), scenario, fileName, at);
    if (optional.includes(type)) {
      return scenario >= 3 && optional.indexOf(type) === 0
        ? { type, status: "approved", fileName, reviewedBy: REVIEWER_NAME, reviewedAt: at }
        : { type, status: "pending" };
    }
    return { type, status: "not_applicable" };
  });
}
