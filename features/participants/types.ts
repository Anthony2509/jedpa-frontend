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

export interface ParticipantDocument {
  type: DocumentType;
  status: DocumentStatus;
  fileName?: string;
  observation?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Delivery {
  placeId: string;
  placeName: string;
  at: string;
  by: string;
  observation?: string;
}

/** 0 = original, 1..3 = duplicates. Each printed copy has its own delivery. */
export interface CredentialCopy {
  number: number;
  printedAt: string;
  printedBy: string;
  reason?: string;
  delivery?: Delivery;
}

export interface Credential {
  code: string;
  issuedAt: string;
  issuedBy: string;
  copies: CredentialCopy[];
}

/** Sports data. The delegation code is derived from it: M1-AJD-B-D. */
export interface DelegationInfo {
  macro: MacroId;
  region: string;
  sport: string;
  sportCode: string;
  category: string;
  gender: Gender;
}

export interface Participant {
  id: string;
  idType: IdentityType;
  idNumber: string;
  firstName: string;
  lastName: string;
  type: ParticipantType;
  school?: string;
  delegation?: DelegationInfo;
  institution?: string;
  access?: AccessLevel;
  documents: ParticipantDocument[];
  credential?: Credential;
  createdAt: string;
}

export interface ParticipantFilters {
  search: string;
  status: string;
  macro: string;
  type: string;
}

export type ParticipantDraft = Pick<Participant, "idType" | "idNumber" | "firstName" | "lastName" | "type"> & {
  school: string;
  macro: string;
  region: string;
  sport: string;
  sportCode: string;
  category: string;
  gender: string;
};

export type SpecialDraft = Pick<Participant, "idType" | "idNumber" | "firstName" | "lastName" | "type"> & {
  institution: string;
  access: AccessLevel;
};

/** What a queue row still needs, as data so the UI can give each document its own weight. */
export interface PendingSummary {
  tone: "observed" | "missing" | "review" | "neutral";
  lead?: string;
  items: string[];
  code?: string;
}
