import type { BadgeTone } from "@/shared/ui/Badge";
import type { DocumentStatus, DocumentType, ParticipantType } from "../types";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  directoral_resolution: "Resolución directoral",
  designation_document: "Documento de designación",
  dni: "DNI",
  medical_certificate: "Certificado médico",
  disability_certificate: "Certificado de discapacidad",
  insurance: "Seguro",
  notarial_authorization: "Autorización notarial",
  participation_responsibility: "Responsabilidad de participación",
  image_use_authorization: "Autorización de uso de imagen",
  coach_delegate_affidavit: "DDJJ entrenador-delegado",
  photo: "Foto",
};

export const DOCUMENT_TYPES = Object.keys(DOCUMENT_TYPE_LABELS) as DocumentType[];

export const DOCUMENT_STATUS_META: Record<DocumentStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: "Pendiente", tone: "outline" },
  approved: { label: "Aprobado", tone: "muted" },
  observed: { label: "Observado", tone: "brand" },
  not_applicable: { label: "No aplica", tone: "muted" },
};

/** Mandatory documents per type, from the client's table. They block printing. */
export const REQUIRED_DOCUMENTS: Record<ParticipantType, DocumentType[]> = {
  athlete: ["directoral_resolution", "dni", "medical_certificate", "insurance", "photo"],
  delegate: ["directoral_resolution", "dni", "photo"],
  coach: ["directoral_resolution", "dni"],
  // ASSUMPTION: companions are athletes that could not complete their documents; nothing blocks them.
  companion: [],
  minedu: [],
  guest: [],
  supplier_full: [],
  supplier_partial: [],
};

/**
 * Documents tracked but not blocking (columns without an X in the client's table,
 * kept optional by decision of the team until the client confirms).
 */
export const OPTIONAL_DOCUMENTS: Record<ParticipantType, DocumentType[]> = {
  athlete: ["disability_certificate", "notarial_authorization", "participation_responsibility", "image_use_authorization"],
  delegate: ["designation_document", "coach_delegate_affidavit"],
  coach: ["designation_document", "coach_delegate_affidavit", "photo"],
  companion: ["dni", "photo"],
  minedu: [],
  guest: [],
  supplier_full: [],
  supplier_partial: [],
};
