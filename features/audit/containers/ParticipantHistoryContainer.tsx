"use client";

import { isMockParticipantId } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { Timeline } from "@/shared/ui/Timeline";
import { AUDIT_ACTION_LABELS } from "../domain/auditActions";
import { describeChange } from "../domain/describeChange";
import { useAuditEntries } from "../hooks/useAuditEntries";
import { useParticipantAuditLog } from "../hooks/useAuditLog";

interface ParticipantHistoryContainerProps {
  participantId: string;
}

/** API history for real participants (ADMIN only, see the record); the mock log for mock ones. */
export function ParticipantHistoryContainer({ participantId }: ParticipantHistoryContainerProps) {
  const mock = isMockParticipantId(participantId);
  const mockEntries = useAuditEntries(participantId);
  const api = useParticipantAuditLog(participantId, !mock);
  const entries = mock ? mockEntries : (api.data?.data ?? []);
  if (!mock && !api.data) return <p className="text-sm text-neutral-500">{api.error ?? "Cargando historial…"}</p>;

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
