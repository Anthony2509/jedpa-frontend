"use client";

import { ParticipantHistoryContainer } from "@/features/audit";
import { Card } from "@/shared/ui/Card";

interface RecordHistoryPanelProps {
  participantId: string;
}

/** Side column on wide screens: the history stays visible instead of hiding behind a modal. */
export function RecordHistoryPanel({ participantId }: RecordHistoryPanelProps) {
  return (
    <aside className="hidden xl:sticky xl:top-6 xl:block">
      <Card title="Historial" className="max-h-[calc(100vh-10rem)] overflow-y-auto">
        <ParticipantHistoryContainer participantId={participantId} />
      </Card>
    </aside>
  );
}
