import {
  ACCESS_LABELS,
  IDENTITY_TYPE_LABELS,
  PARTICIPANT_TYPE_LABELS,
  canPrintDuplicate,
  describeDiscipline,
  getFullName,
  getParticipantStatus,
  isMockParticipantId,
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
  const canDuplicate = canPrintDuplicate(participant);
  // The API prints and issues in one step: there is no "issued" status.
  if (!isMockParticipantId(participant.id)) return { canIssue: false, canPrint: status === "ready_to_print" && !participant.credential, canDuplicate };
  return { canIssue: status === "ready_to_print", canPrint: status === "issued", canDuplicate };
}

/** Relative link to the public page the QR opens (/verificar/<token>). */
export function getVerificationHref(participant: Participant): string | null {
  const credential = participant.credential;
  if (!credential) return null;
  const current = credential.copies.find((copy) => !copy.revoked && copy.verificationUrl);
  if (current?.verificationUrl) return new URL(current.verificationUrl).pathname;
  return `/verificar/${credential.code}`;
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
  const placeholder = isMockParticipantId(participant.id) ? "JEDPA-2026-XXXX" : "Se crea al imprimir";
  const code = participant.credential?.code ?? placeholder;
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
