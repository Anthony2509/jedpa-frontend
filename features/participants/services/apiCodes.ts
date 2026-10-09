import type { DocumentStatus, DocumentType, IdentityType, ParticipantStatus, ParticipantType, PersonGender } from "../types";

/** Codes as the API stores them, mapped to the frontend's own names. */
const invert = <K extends string, V extends string>(map: Record<K, V>) =>
  Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key])) as Record<V, K>;

export const TYPE_TO_API: Record<ParticipantType, string> = {
  athlete: "DEPORTISTA",
  companion: "ACOMPANANTE",
  delegate: "DELEGADO",
  coach: "ENTRENADOR",
  minedu: "MINEDU",
  guest: "INVITADO",
  supplier_full: "PROVEEDOR_TOTAL",
  supplier_partial: "PROVEEDOR_PARCIAL",
};
export const TYPE_FROM_API = invert(TYPE_TO_API);

export type ApiIdentityType = "DNI" | "CE" | "PASAPORTE";
export const IDENTITY_TO_API: Record<IdentityType, ApiIdentityType> = { dni: "DNI", ce: "CE", passport: "PASAPORTE" };
export const IDENTITY_FROM_API = invert(IDENTITY_TO_API);

/** The API has no "issued" step: printing creates the copy and its QR in one go. */
export const STATUS_TO_API: Partial<Record<ParticipantStatus, string>> = {
  pending_documents: "PENDING_DOCUMENTS",
  in_review: "IN_REVIEW",
  observed: "OBSERVED",
  ready_to_print: "READY_TO_PRINT",
  printed: "PRINTED",
  delivered: "DELIVERED",
};
export const STATUS_FROM_API = invert(STATUS_TO_API as Record<ParticipantStatus, string>);

export const DOCUMENT_TO_API: Record<DocumentType, string> = {
  directoral_resolution: "RESOLUCION_DIRECTORAL",
  designation_document: "DOCUMENTO_DESIGNACION",
  dni: "DNI",
  medical_certificate: "CERTIFICADO_MEDICO",
  disability_certificate: "CERTIFICADO_DISCAPACIDAD",
  insurance: "SEGURO",
  notarial_authorization: "AUTORIZACION_NOTARIAL",
  participation_responsibility: "RESPONSABILIDAD_PARTICIPACION",
  image_use_authorization: "AUTORIZACION_USO_IMAGEN",
  coach_delegate_affidavit: "DDJJ_ENTRENADOR_DELEGADO",
  photo: "FOTO",
};
export const DOCUMENT_FROM_API = invert(DOCUMENT_TO_API);

export const DOCUMENT_STATUS_TO_API: Record<DocumentStatus, string> = {
  pending: "PENDING",
  approved: "APPROVED",
  observed: "OBSERVED",
  not_applicable: "NOT_APPLICABLE",
};
export const DOCUMENT_STATUS_FROM_API = invert(DOCUMENT_STATUS_TO_API);

export const GENDER_TO_API: Record<PersonGender, string> = { female: "FEMALE", male: "MALE" };
export const GENDER_FROM_API = invert(GENDER_TO_API);

