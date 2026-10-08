import type { DelegationInfo, MacroId } from "../types";

/** 8 macro-regions for 2026 ("Respuestas preguntas", question 3). */
export const MACROS: MacroId[] = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"];

export const GENDER_LABELS = { V: "Varones", D: "Damas" } as const;

/** Delegation code: macro - sport code - category - gender. Example: M1-AJD-B-D. */
export function buildDelegationCode(info: Pick<DelegationInfo, "macro" | "sportCode" | "category" | "gender">): string {
  return `${info.macro}-${info.sportCode}-${info.category}-${info.gender}`;
}

export function describeDiscipline(info: DelegationInfo): string {
  return `${info.sport} ${GENDER_LABELS[info.gender].toLowerCase()}`;
}
