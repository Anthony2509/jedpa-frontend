import type { AuditEntry } from "../types";

export function describeChange(entry: AuditEntry): string | undefined {
  const parts: string[] = [];
  if (entry.field) parts.push(entry.field);
  if (entry.before || entry.after) parts.push(`${entry.before || "—"} → ${entry.after || "—"}`);
  if (entry.detail) parts.push(entry.detail);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}
