import { createStore } from "@/shared/lib/createStore";
import type { AuditEntry, NewAuditEntry } from "../types";

/** Mock audit log. Entries are append-only: there is no update or delete. */
export const auditStore = createStore<AuditEntry[]>([]);

let sequence = 0;

/**
 * Loads the historical log once. Idempotent: in dev the server can evaluate the mock modules
 * more than once, and a duplicated seed made the server and the browser render different lists.
 */
export function seedAuditEntries(entries: NewAuditEntry[]): void {
  if (auditStore.getSnapshot().length > 0) return;
  auditStore.update(() => entries.map((entry, index) => ({ ...entry, id: `seed-${index + 1}` })));
}

export function logAuditEntry(entry: NewAuditEntry): void {
  sequence += 1;
  const created: AuditEntry = { ...entry, id: `a-${sequence}` };
  auditStore.update((entries) => [...entries, created]);
}
