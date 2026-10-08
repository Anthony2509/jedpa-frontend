import type { AccessLevel, IdentityType, ParticipantType } from "../types";

export const PARTICIPANT_TYPE_LABELS: Record<ParticipantType, string> = {
  athlete: "Deportista",
  companion: "Acompañante",
  delegate: "Delegado",
  coach: "Entrenador",
  minedu: "MINEDU",
  guest: "Invitado",
  supplier_full: "Proveedor acceso total",
  supplier_partial: "Proveedor acceso parcial",
};

export const PARTICIPANT_TYPES = Object.keys(PARTICIPANT_TYPE_LABELS) as ParticipantType[];

/** Belong to a delegation and go through document review. */
export const DELEGATION_TYPES: ParticipantType[] = ["athlete", "companion", "delegate", "coach"];

/** Created and printed without documents (admin and coordinator only). */
export const SPECIAL_TYPES: ParticipantType[] = ["minedu", "guest", "supplier_full", "supplier_partial"];

export function isSpecialType(type: ParticipantType): boolean {
  return SPECIAL_TYPES.includes(type);
}

/** ASSUMPTION: default access by type; the client only confirmed it for suppliers. */
export const DEFAULT_ACCESS: Record<ParticipantType, AccessLevel> = {
  athlete: "partial",
  companion: "partial",
  delegate: "partial",
  coach: "partial",
  minedu: "total",
  guest: "partial",
  supplier_full: "total",
  supplier_partial: "partial",
};

export const ACCESS_LABELS: Record<AccessLevel, string> = { total: "Acceso total", partial: "Acceso parcial" };

export const IDENTITY_TYPE_LABELS: Record<IdentityType, string> = { dni: "DNI", ce: "CE", passport: "Pasaporte" };

export const IDENTITY_TYPES = Object.keys(IDENTITY_TYPE_LABELS) as IdentityType[];
