import { ACCESS_LABELS, type AccessLevel } from "@/features/participants";

/**
 * TEMP(backend): access comes from the participant type (API catalog), not per person.
 * MINEDU has no level in the API yet (client question P7), so it reads "Por definir".
 */
export function getAccessLabel(access: AccessLevel | undefined): string {
  return access ? ACCESS_LABELS[access] : "Acceso por definir";
}
