import type { AccessLevel, DocumentStatus, DocumentType, Gender, IdentityType, MacroId, ParticipantStatus, ParticipantType } from "./catalog";

export interface ParticipantDocument {
  type: DocumentType;
  status: DocumentStatus;
  /** From the API: whether it blocks printing. Mock data uses REQUIRED_DOCUMENTS instead. */
  required?: boolean;
  mimeType?: string;
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
  /** API copies only. */
  id?: string;
  /** Replaced by a later duplicate: its QR no longer validates. */
  revoked?: boolean;
  verificationUrl?: string;
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
  /** API ids, to filter and to link the macro's directoral resolution. */
  delegationId?: string;
  macroRegionId?: string;
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
  /** Stored and recalculated by the API. Mock data has none: use getParticipantStatus. */
  status?: ParticipantStatus;
  /** Raw API fields the edit form needs. Absent in mock data. */
  api?: ParticipantApiData;
  createdAt: string;
}

export type PersonGender = "female" | "male";

export interface ParticipantApiData {
  participantTypeId: string;
  paternalLastName: string;
  maternalLastName: string | null;
  birthDate: string | null;
  gender: PersonGender | null;
  region: string | null;
  schoolName: string | null;
  isActive: boolean;
}
