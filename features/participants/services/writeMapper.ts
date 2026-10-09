import type { ParticipantDraft, ParticipantEditDraft, SpecialDraft } from "../types";
import { GENDER_TO_API, IDENTITY_TO_API } from "./apiCodes";

const text = (value: string) => value.trim();
/** Optional fields: empty means "no value" (the API clears a field with null). */
const optional = (value: string) => (value.trim() ? value.trim() : null);

function identity(draft: Pick<ParticipantDraft, "idType" | "idNumber" | "firstName" | "paternalLastName" | "maternalLastName">) {
  return {
    documentType: IDENTITY_TO_API[draft.idType],
    documentNumber: text(draft.idNumber),
    firstNames: text(draft.firstName),
    paternalLastName: text(draft.paternalLastName),
    maternalLastName: optional(draft.maternalLastName),
  };
}

export function toCreateSpecialBody(draft: SpecialDraft, participantTypeId: string) {
  return { ...identity(draft), maternalLastName: optional(draft.maternalLastName) ?? undefined, participantTypeId, institution: text(draft.institution) };
}

export function toCreateMemberBody(draft: ParticipantDraft, participantTypeId: string, delegationId: string) {
  return {
    ...identity(draft),
    maternalLastName: optional(draft.maternalLastName) ?? undefined,
    participantTypeId,
    delegationId,
    gender: draft.personGender ? GENDER_TO_API[draft.personGender] : undefined,
    birthDate: draft.birthDate,
    region: optional(draft.region) ?? undefined,
    schoolName: optional(draft.school) ?? undefined,
  };
}

/** Only the fields that apply: special credentials have an institution, members a school. */
export function toUpdateBody(draft: ParticipantEditDraft, special: boolean) {
  const common = {
    ...identity(draft),
    gender: draft.personGender ? GENDER_TO_API[draft.personGender] : null,
    birthDate: draft.birthDate || null,
  };
  return special
    ? { ...common, institution: text(draft.institution) }
    : { ...common, region: optional(draft.region), schoolName: optional(draft.school) };
}
