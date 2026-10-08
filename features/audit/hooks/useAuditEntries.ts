"use client";

import { useMemo } from "react";
import { useStore } from "@/shared/lib/useStore";
import { sortByMostRecent } from "../domain/filterAuditEntries";
import { auditStore } from "../services/auditApi";

export function useAuditEntries(participantId?: string) {
  const entries = useStore(auditStore);
  return useMemo(() => {
    const scoped = participantId ? entries.filter((entry) => entry.participantId === participantId) : entries;
    return sortByMostRecent(scoped);
  }, [entries, participantId]);
}
