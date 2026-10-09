import type { AuditEntry } from "../types";

export function sortByMostRecent(entries: AuditEntry[]): AuditEntry[] {
  return [...entries].sort((a, b) => b.at.localeCompare(a.at));
}
