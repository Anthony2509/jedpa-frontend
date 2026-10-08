import type { AuditEntry, AuditFilters } from "../types";

export const EMPTY_AUDIT_FILTERS: AuditFilters = { search: "", userName: "", action: "" };

export function filterAuditEntries(entries: AuditEntry[], filters: AuditFilters): AuditEntry[] {
  const search = filters.search.trim().toLowerCase();
  return entries.filter(
    (entry) =>
      (!search || entry.participantName.toLowerCase().includes(search) || entry.participantId.includes(search)) &&
      (!filters.userName || entry.userName === filters.userName) &&
      (!filters.action || entry.action === filters.action),
  );
}

export function sortByMostRecent(entries: AuditEntry[]): AuditEntry[] {
  return [...entries].sort((a, b) => b.at.localeCompare(a.at));
}
