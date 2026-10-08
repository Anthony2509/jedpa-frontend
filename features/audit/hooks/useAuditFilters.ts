"use client";

import { useMemo, useState } from "react";
import { EMPTY_AUDIT_FILTERS, filterAuditEntries } from "../domain/filterAuditEntries";
import type { AuditEntry, AuditFilters } from "../types";

export function useAuditFilters(entries: AuditEntry[]) {
  const [filters, setFilters] = useState<AuditFilters>(EMPTY_AUDIT_FILTERS);
  const [selected, setSelected] = useState<AuditEntry | null>(null);

  const filtered = useMemo(() => filterAuditEntries(entries, filters), [entries, filters]);
  const userNames = useMemo(() => [...new Set(entries.map((entry) => entry.userName))].sort(), [entries]);

  function setFilter(key: keyof AuditFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return { filters, filtered, userNames, selected, setSelected, setFilter };
}
