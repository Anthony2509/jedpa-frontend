import { getFullName, getIdentityLabel, getParticipantContext } from "../domain/participantName";
import type { Participant, PendingSummary } from "../types";
import { NextUpCard } from "./NextUpCard";
import { PendingChips } from "./PendingChips";
import { QueueDoneState } from "./QueueDoneState";
import { WorkQueueTable } from "./WorkQueueTable";

export interface WorkQueueViewProps {
  participants: Participant[];
  /** Column header for what is pending; without getPending the column is not shown. */
  pendingHeader?: string;
  getPending?: (participant: Participant) => PendingSummary | null;
  nextCtaLabel: string;
  rowActionLabel: string;
  mobileRowAction?: boolean;
  mobileRowActionLabel?: string;
  doneTitle: string;
  doneMessage: string;
  onAction: (participant: Participant) => void;
  onOpen: (participant: Participant) => void;
}

export function WorkQueueView(props: WorkQueueViewProps) {
  const [next, ...rest] = props.participants;
  if (!next) return <QueueDoneState title={props.doneTitle} message={props.doneMessage} />;
  const nextPending = props.getPending?.(next);

  return (
    <div className="space-y-8">
      <NextUpCard
        positionLabel={`Siguiente · 1 de ${props.participants.length}`}
        fullName={getFullName(next)}
        details={`${getIdentityLabel(next)} · ${getParticipantContext(next)}`}
        pending={nextPending ? <PendingChips pending={nextPending} /> : undefined}
        ctaLabel={props.nextCtaLabel}
        onAction={() => props.onAction(next)}
        onOpen={() => props.onOpen(next)}
      />
      {rest.length > 0 && (
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-neutral-900">
            Después en la cola <span className="font-normal text-neutral-500">· {rest.length}</span>
          </h2>
          <WorkQueueTable
            participants={rest}
            pendingHeader={props.pendingHeader}
            getPending={props.getPending}
            actionLabel={props.rowActionLabel}
            mobileAction={props.mobileRowAction}
            mobileActionLabel={props.mobileRowActionLabel}
            onAction={props.onAction}
            onOpen={props.onOpen}
          />
        </section>
      )}
    </div>
  );
}
