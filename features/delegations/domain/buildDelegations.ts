import {
  getDelegationCode,
  getParticipantStatus,
  type DelegationInfo,
  type Participant,
} from "@/features/participants";

export interface DelegationSummary {
  code: string;
  info: DelegationInfo;
  members: Participant[];
  pendingDocuments: number;
  readyToPrint: number;
  toDeliver: number;
  delivered: number;
}

function summarize(code: string, members: Participant[]): DelegationSummary {
  const statuses = members.map(getParticipantStatus);
  const count = (...wanted: string[]) => statuses.filter((status) => wanted.includes(status)).length;
  return {
    code,
    info: members[0].delegation as DelegationInfo,
    members,
    pendingDocuments: count("pending_documents", "in_review", "observed"),
    readyToPrint: count("ready_to_print", "issued"),
    toDeliver: count("printed"),
    delivered: count("delivered"),
  };
}

/** Groups delegation members by code (e.g. M1-AJD-B-D), ordered by code. */
export function buildDelegations(participants: Participant[]): DelegationSummary[] {
  const groups = new Map<string, Participant[]>();
  for (const participant of participants) {
    const code = getDelegationCode(participant);
    if (code) groups.set(code, [...(groups.get(code) ?? []), participant]);
  }
  return [...groups.entries()].map(([code, members]) => summarize(code, members)).sort((a, b) => a.code.localeCompare(b.code));
}

export function filterDelegations(delegations: DelegationSummary[], search: string, macro: string): DelegationSummary[] {
  const term = search.trim().toLowerCase();
  return delegations.filter(
    (d) =>
      (!macro || d.info.macro === macro) &&
      (!term || d.code.toLowerCase().includes(term) || d.info.region.toLowerCase().includes(term) || d.info.sport.toLowerCase().includes(term)),
  );
}
