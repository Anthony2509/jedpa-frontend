import type { Participant, ParticipantFilters } from "../types";
import { getDelegationCode, getFullName } from "./participantName";
import { getParticipantStatus } from "./participantStatus";

export const EMPTY_PARTICIPANT_FILTERS: ParticipantFilters = { search: "", status: "", macro: "", type: "" };

export function matchesSearch(participant: Participant, term: string): boolean {
  const search = term.trim().toLowerCase();
  if (!search) return true;
  return (
    participant.idNumber.includes(search) ||
    getFullName(participant).toLowerCase().includes(search) ||
    (getDelegationCode(participant)?.toLowerCase().includes(search) ?? false)
  );
}

export function filterParticipants(participants: Participant[], filters: ParticipantFilters): Participant[] {
  return participants.filter(
    (participant) =>
      matchesSearch(participant, filters.search) &&
      (!filters.status || getParticipantStatus(participant) === filters.status) &&
      (!filters.macro || participant.delegation?.macro === filters.macro) &&
      (!filters.type || participant.type === filters.type),
  );
}

export function getSchools(participants: Participant[]): string[] {
  return [...new Set(participants.flatMap((participant) => (participant.school ? [participant.school] : [])))].sort();
}
