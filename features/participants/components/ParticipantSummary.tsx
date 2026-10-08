import type { ReactNode } from "react";
import { RowSummary } from "@/shared/ui/RowSummary";
import { getFullName, getIdentityLabel, getParticipantContext } from "../domain/participantName";
import type { Participant } from "../types";

interface ParticipantSummaryProps {
  participant: Participant;
  /** Overrides the default "Tipo · delegación" line, e.g. inside a delegation where the code is redundant. */
  context?: string;
  children?: ReactNode;
}

/** Phone card for a participant: name, context, ID number, then what matters. */
export function ParticipantSummary({ participant, context, children }: ParticipantSummaryProps) {
  return (
    <RowSummary
      title={getFullName(participant)}
      subtitle={context ?? getParticipantContext(participant)}
      note={getIdentityLabel(participant)}
    >
      {children}
    </RowSummary>
  );
}
