"use client";

import { useState } from "react";
import { useApiQuery } from "@/shared/lib/useApiQuery";
import { AUDIT_QUERY, fetchAuditPage } from "../services/auditRemote";
import type { AuditApiFilters, AuditEntry } from "../types";

export const AUDIT_PAGE_SIZE = 20;
const EMPTY: AuditApiFilters = { userId: "", action: "", from: "", to: "" };

/** The audit log from the API, filtered and paginated on the server (ADMIN only). */
export function useAuditLog() {
  const [filters, setFilters] = useState<AuditApiFilters>(EMPTY);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<AuditEntry | null>(null);
  const params = { ...filters, page, limit: AUDIT_PAGE_SIZE };
  const query = useApiQuery(`${AUDIT_QUERY}?${JSON.stringify(params)}`, () => fetchAuditPage(params));

  function setFilter(key: keyof AuditApiFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  return { filters, setFilter, page, setPage, selected, setSelected, ...query };
}

/** History of one participant, most recent first (first 100 entries). */
export function useParticipantAuditLog(participantId: string, enabled: boolean) {
  const params = { participantId, limit: 100 };
  return useApiQuery(enabled ? `${AUDIT_QUERY}?participant=${participantId}` : null, () => fetchAuditPage(params));
}
