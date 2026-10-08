import { getDelegationCode } from "../domain/participantName";
import { PARTICIPANT_TYPE_LABELS } from "../domain/participantTypes";
import type { Participant } from "../types";

interface ParticipantTypeCellProps {
  participant: Participant;
}

/** Two levels: the role first, the delegation (or institution) underneath and quieter. */
export function ParticipantTypeCell({ participant }: ParticipantTypeCellProps) {
  const code = getDelegationCode(participant);
  return (
    <div className="leading-snug">
      <p className="text-neutral-900">{PARTICIPANT_TYPE_LABELS[participant.type]}</p>
      <p className={code ? "font-mono text-xs tracking-tight text-neutral-500" : "text-xs text-neutral-500"}>
        {code ?? participant.institution}
      </p>
    </div>
  );
}

