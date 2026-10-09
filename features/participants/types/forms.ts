import type { AccessLevel, IdentityType, ParticipantType } from "./catalog";
import type { Participant, PersonGender } from "./participant";

/** List filters, kept in the URL. `macro` and `type` hold API ids. */
export interface ParticipantFilters {
  search: string;
  status: string;
  macro: string;
  type: string;
}

/** New delegation member (step 1). Ids come from the API catalogs. */
export interface ParticipantDraft {
  type: ParticipantType;
  idType: IdentityType;
  idNumber: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  personGender: PersonGender | "";
  birthDate: string;
  macroRegionId: string;
  sportId: string;
  category: string;
  /** Delegation gender: V = varones, D = damas. */
  gender: string;
  region: string;
  school: string;
}

/** Personal data editable from the record. */
export interface ParticipantEditDraft {
  idType: IdentityType;
  idNumber: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  personGender: PersonGender | "";
  birthDate: string;
  region: string;
  school: string;
  institution: string;
}

/** Special credential form. Access comes from the type (API catalog), not from the form. */
export type SpecialDraft = Pick<Participant, "idType" | "idNumber" | "firstName" | "type"> & {
  paternalLastName: string;
  maternalLastName: string;
  institution: string;
};

/** Participant type from the API catalog: `id` is what the API expects when writing. */
export interface ParticipantTypeInfo {
  id: string;
  type: ParticipantType;
  special: boolean;
  access?: AccessLevel;
}

/** What a queue row still needs, as data so the UI can give each document its own weight. */
export interface PendingSummary {
  tone: "observed" | "missing" | "review" | "neutral";
  lead?: string;
  items: string[];
  code?: string;
}
