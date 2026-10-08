"use client";

import { formatDateTime } from "@/shared/lib/formatDate";
import { Timeline } from "@/shared/ui/Timeline";
import { AUDIT_ACTION_LABELS } from "../domain/auditActions";
import { describeChange } from "../domain/describeChange";
import { useAuditEntries } from "../hooks/useAuditEntries";

interface ParticipantHistoryContainerProps {
  participantId: string;
}

export function ParticipantHistoryContainer({ participantId }: ParticipantHistoryContainerProps) {
  const entries = useAuditEntries(participantId);
  return (
    <Timeline
      items={entries.map((entry) => ({
        id: entry.id,
        title: AUDIT_ACTION_LABELS[entry.action],
        meta: `${entry.userName} · ${formatDateTime(entry.at)}`,
        description: describeChange(entry),
      }))}
    />
  );
}
