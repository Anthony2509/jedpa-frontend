import type { IdentityType, ParticipantDraft, ParticipantEditDraft, SpecialDraft } from "../types";

export const EMPTY_PARTICIPANT_DRAFT: ParticipantDraft = {
  type: "athlete",
  idType: "dni",
  idNumber: "",
  firstName: "",
  paternalLastName: "",
  maternalLastName: "",
  personGender: "",
  birthDate: "",
  macroRegionId: "",
  sportId: "",
  category: "",
  gender: "",
  region: "",
  school: "",
};

interface IdentityDraft {
  idType: IdentityType;
  idNumber: string;
  firstName: string;
  paternalLastName: string;
}

/** Same rules as the API: DNI = 8 digits; CE and passport = 6 to 12 letters or digits. */
function validateIdentity(draft: IdentityDraft): string | null {
  if (draft.idType === "dni" && !/^\d{8}$/.test(draft.idNumber)) return "El DNI debe tener 8 dígitos.";
  if (draft.idType !== "dni" && !/^[A-Za-z0-9]{6,12}$/.test(draft.idNumber)) return "El CE o pasaporte debe tener de 6 a 12 letras o números.";
  if (!draft.firstName.trim() || !draft.paternalLastName.trim()) return "Ingresa nombres y apellido paterno.";
  return null;
}

const isPastDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && value < new Date().toISOString().slice(0, 10);

/** Returns an error message or null. */
export function validateParticipantDraft(draft: ParticipantDraft): string | null {
  const identityError = validateIdentity(draft);
  if (identityError) return identityError;
  if (!draft.personGender) return "Selecciona el sexo.";
  if (!isPastDate(draft.birthDate)) return "Ingresa una fecha de nacimiento válida.";
  if (!draft.macroRegionId || !draft.sportId || !draft.category || !draft.gender) {
    return "Completa macrorregión, disciplina, categoría y rama para ubicar la delegación.";
  }
  return null;
}

export function validateSpecialDraft(draft: SpecialDraft): string | null {
  return validateIdentity(draft) ?? (draft.institution.trim() ? null : "Ingresa la institución o el servicio.");
}

/** Members need sex and birth date; special credentials need the institution. */
export function validateEditDraft(draft: ParticipantEditDraft, special: boolean): string | null {
  const identityError = validateIdentity(draft);
  if (identityError) return identityError;
  if (special) return draft.institution.trim() ? null : "Ingresa la institución o el servicio.";
  if (!draft.personGender) return "Selecciona el sexo.";
  return isPastDate(draft.birthDate) ? null : "Ingresa una fecha de nacimiento válida.";
}
