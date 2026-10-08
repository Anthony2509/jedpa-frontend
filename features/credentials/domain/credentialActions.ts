import {
  ACCESS_LABELS,
  IDENTITY_TYPE_LABELS,
  PARTICIPANT_TYPE_LABELS,
  canPrintDuplicate,
  describeDiscipline,
  getFullName,
  getParticipantStatus,
  isSpecialType,
  type Participant,
} from "@/features/participants";
import type { CredentialCardData, CredentialField } from "../types";
import { buildQrPattern } from "./qrPattern";

export interface CredentialAvailability {
  canIssue: boolean;
  canPrint: boolean;
  canDuplicate: boolean;
}

export function getCredentialAvailability(participant: Participant): CredentialAvailability {
  const status = getParticipantStatus(participant);
  return { canIssue: status === "ready_to_print", canPrint: status === "issued", canDuplicate: canPrintDuplicate(participant) };
}

/** Fields printed on each card type, as in the client's 2024 cards. */
function buildFields(participant: Participant): CredentialField[] {
  if (isSpecialType(participant.type) || !participant.delegation) {
    return [{ label: "Servicio / Institución", value: participant.institution ?? "" }];
  }
  const d = participant.delegation;
  return [
    { label: "Condición", value: PARTICIPANT_TYPE_LABELS[participant.type] },
    { label: "Disciplina", value: describeDiscipline(d) },
    { label: "Categoría", value: d.category },
    { label: "Macrorregión", value: d.macro },
    { label: "Región", value: d.region },
  ];
}

export function buildCredentialCardData(participant: Participant): CredentialCardData {
  const code = participant.credential?.code ?? "JEDPA-2026-XXXX";
  return {
    typeLabel: PARTICIPANT_TYPE_LABELS[participant.type],
    fullName: getFullName(participant).toUpperCase(),
    identity: `${participant.idNumber} (${IDENTITY_TYPE_LABELS[participant.idType]})`,
    fields: buildFields(participant),
    accessLabel: isSpecialType(participant.type) && participant.access ? ACCESS_LABELS[participant.access] : undefined,
    code,
    qrCells: buildQrPattern(code),
  };
}
