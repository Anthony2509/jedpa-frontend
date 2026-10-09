/** The 8 credential types defined by the client ("Respuestas preguntas", question 1). */
export type ParticipantType =
  | "athlete"
  | "companion"
  | "delegate"
  | "coach"
  | "minedu"
  | "guest"
  | "supplier_full"
  | "supplier_partial";

export type IdentityType = "dni" | "ce" | "passport";

export type MacroId = "M1" | "M2" | "M3" | "M4" | "M5" | "M6" | "M7" | "M8";

/** V = varones, D = damas (same letters used in the delegation code). */
export type Gender = "V" | "D";

export type AccessLevel = "total" | "partial";

export type DocumentType =
  | "directoral_resolution"
  | "designation_document"
  | "dni"
  | "medical_certificate"
  | "disability_certificate"
  | "insurance"
  | "notarial_authorization"
  | "participation_responsibility"
  | "image_use_authorization"
  | "coach_delegate_affidavit"
  | "photo";

export type DocumentStatus = "pending" | "approved" | "observed" | "not_applicable";

export type ParticipantStatus =
  | "pending_documents"
  | "in_review"
  | "observed"
  | "ready_to_print"
  | "issued"
  | "printed"
  | "delivered";
