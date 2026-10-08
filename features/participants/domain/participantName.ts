import type { Participant } from "../types";
import { buildDelegationCode } from "./macros";
import { IDENTITY_TYPE_LABELS, PARTICIPANT_TYPE_LABELS } from "./participantTypes";

export function getFullName(participant: Pick<Participant, "firstName" | "lastName">): string {
  return `${participant.firstName} ${participant.lastName}`;
}

export function getIdentityLabel(participant: Pick<Participant, "idType" | "idNumber">): string {
  return `${IDENTITY_TYPE_LABELS[participant.idType]} ${participant.idNumber}`;
}

export function getDelegationCode(participant: Participant): string | undefined {
  return participant.delegation ? buildDelegationCode(participant.delegation) : undefined;
}

/** One line of context: delegation for delegation members, institution for special credentials. */
export function getParticipantContext(participant: Participant): string {
  const code = getDelegationCode(participant);
  if (code) return `${PARTICIPANT_TYPE_LABELS[participant.type]} · ${code}`;
  return `${PARTICIPANT_TYPE_LABELS[participant.type]} · ${participant.institution ?? "Sin institución"}`;
}
