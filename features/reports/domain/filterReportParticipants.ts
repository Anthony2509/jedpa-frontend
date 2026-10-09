import {
  MACROS,
  PARTICIPANT_TYPES,
  PARTICIPANT_TYPE_LABELS,
  getDelegationCode,
  getFullName,
  getParticipantStatus,
  type Participant,
  type ParticipantFilters,
} from "@/features/participants";

/** TEMP(backend): reports still run on the mock data in the browser until the API exports them. */
export const EMPTY_REPORT_FILTERS: ParticipantFilters = { search: "", status: "", macro: "", type: "" };

export const MOCK_MACRO_OPTIONS = MACROS.map((macro) => ({ value: macro, label: `Macro ${macro.slice(1)}` }));
export const MOCK_TYPE_OPTIONS = PARTICIPANT_TYPES.map((type) => ({ value: type, label: PARTICIPANT_TYPE_LABELS[type] }));

function matchesSearch(participant: Participant, term: string): boolean {
  const search = term.trim().toLowerCase();
  if (!search) return true;
  return (
    participant.idNumber.includes(search) ||
    getFullName(participant).toLowerCase().includes(search) ||
    (getDelegationCode(participant)?.toLowerCase().includes(search) ?? false)
  );
}

export function filterReportParticipants(participants: Participant[], filters: ParticipantFilters): Participant[] {
  return participants.filter(
    (p) =>
      matchesSearch(p, filters.search) &&
      (!filters.status || getParticipantStatus(p) === filters.status) &&
      (!filters.macro || p.delegation?.macro === filters.macro) &&
      (!filters.type || p.type === filters.type),
  );
}
