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

/** Same rule as the API: DNI = 8 digits; CE and passport = 6 to 12 letters or digits. */
function validateDocumentNumber(draft: Pick<ParticipantDraft, "idType" | "idNumber">): string | null {
  if (draft.idType === "dni") return /^\d{8}$/.test(draft.idNumber) ? null : "El DNI debe tener 8 dígitos.";
  return /^[A-Za-z0-9]{6,12}$/.test(draft.idNumber) ? null : "El CE o pasaporte debe tener de 6 a 12 letras o números.";
}

function validateIdentity(draft: Pick<ParticipantDraft, "idType" | "idNumber" | "firstName" | "lastName">): string | null {
  const documentError = validateDocumentNumber(draft);
  if (documentError) return documentError;
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
  const documentError = validateDocumentNumber(draft);
  if (documentError) return documentError;
  if (!draft.firstName.trim() || !draft.paternalLastName.trim()) return "Ingresa nombres y apellido paterno.";
  return draft.institution.trim() ? null : "Ingresa la institución o el servicio.";
}
