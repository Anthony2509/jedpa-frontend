"use client";

import { usePermission } from "@/features/auth";
import {
  ParticipantStatusBadge, WORK_QUEUES, getFullName, getIdentityLabel, getParticipantContext, getParticipantStatus, isMockParticipantId, useParticipantRecord,
} from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ProblemBanner } from "../components/ProblemBanner";
import { RecordHeader } from "../components/RecordHeader";
import { RecordStepSection } from "../components/RecordStepSection";
import { getRecordProblems } from "../domain/recordProblems";
import { buildRecordSteps } from "../domain/recordSteps";
import { useRecordDialogs } from "../hooks/useRecordDialogs";
import { useRecordExpansion } from "../hooks/useRecordExpansion";
import { useRecordRoute } from "../hooks/useRecordRoute";
import { QueueNavigatorContainer } from "./QueueNavigatorContainer";
import { RecordDialogs } from "./RecordDialogs";
import { RecordHeaderActions } from "./RecordHeaderActions";
import { RecordHistoryPanel } from "./RecordHistoryPanel";
import { RecordStepContent } from "./RecordStepContent";

export function ParticipantRecordContainer() {
  const route = useRecordRoute();
  const { participant, loading, error } = useParticipantRecord(route.id);
  const expansion = useRecordExpansion(route.initialStep);
  const dialogs = useRecordDialogs();
  // TEMP(backend): the API only shows the audit log to ADMIN; there is no per-participant history yet.
  const canSeeHistory = usePermission("audit") || isMockParticipantId(route.id);

  if (!participant) return <EmptyState message={loading ? "Cargando participante…" : (error ?? "No se encontró el participante.")} />;

  const queue = route.fromQueue ? WORK_QUEUES[route.fromQueue] : null;

  return (
    <div className="mx-auto max-w-4xl xl:max-w-none">
      <RecordHeader
        fullName={getFullName(participant)}
        subtitle={`${getIdentityLabel(participant)} · ${getParticipantContext(participant)}`}
        backHref={queue?.href ?? "/participants"}
        backLabel={queue ? `Volver a ${queue.label}` : "Participantes"}
        statusBadge={<ParticipantStatusBadge status={getParticipantStatus(participant)} />}
        actions={<RecordHeaderActions participant={participant} showHistory={canSeeHistory} onOpenDialog={dialogs.open} />}
      />
      <div className={canSeeHistory ? "xl:grid xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start xl:gap-6" : undefined}>
        <div className="min-w-0">
          <ProblemBanner problems={getRecordProblems(participant)} onAction={(problem) => expansion.reveal(problem.stepId)} />
          <div className="space-y-3">
            {buildRecordSteps(participant, formatDateTime).map((step) => (
              <RecordStepSection key={step.id} step={step} expanded={expansion.isExpanded(step)} onToggle={() => expansion.toggle(step)}>
                <RecordStepContent stepId={step.id} participant={participant} onEdit={() => dialogs.open("edit")} />
              </RecordStepSection>
            ))}
          </div>
          {route.fromQueue && <QueueNavigatorContainer queue={route.fromQueue} participant={participant} />}
        </div>
        {canSeeHistory && <RecordHistoryPanel participantId={participant.id} />}
      </div>
      <RecordDialogs participant={participant} dialog={dialogs.dialog} onClose={dialogs.close} />
    </div>
  );
}
