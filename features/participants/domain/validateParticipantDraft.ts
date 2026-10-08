import type { ParticipantDraft, SpecialDraft } from "../types";

export const EMPTY_PARTICIPANT_DRAFT: ParticipantDraft = {
  idType: "dni",
  idNumber: "",
  firstName: "",
  lastName: "",
  type: "athlete",
  school: "",
  macro: "",
  region: "",
  sport: "",
  sportCode: "",
  category: "",
  gender: "",
};

function validateIdentity(draft: Pick<ParticipantDraft, "idType" | "idNumber" | "firstName" | "lastName">): string | null {
  if (draft.idType === "dni" && !/^\d{8}$/.test(draft.idNumber)) return "El DNI debe tener 8 dígitos.";
  if (draft.idType !== "dni" && draft.idNumber.trim().length < 6) return "Ingresa un número de documento válido.";
  if (!draft.firstName.trim() || !draft.lastName.trim()) return "Ingresa nombres y apellidos.";
  return null;
}

/** Returns an error message or null. Fields follow the client's 2024 spreadsheet. */
export function validateParticipantDraft(draft: ParticipantDraft): string | null {
  const identityError = validateIdentity(draft);
  if (identityError) return identityError;
  if (!draft.macro || !draft.region.trim()) return "Selecciona la macrorregión e ingresa la región.";
  if (!draft.sport.trim() || !draft.sportCode.trim() || !draft.category || !draft.gender) {
    return "Completa disciplina, código de deporte, categoría y género para formar la delegación.";
  }
  return null;
}

export function validateSpecialDraft(draft: SpecialDraft): string | null {
  return validateIdentity(draft) ?? (draft.institution.trim() ? null : "Ingresa la institución o el servicio.");
}
