import { Badge } from "@/shared/ui/Badge";
import { PARTICIPANT_STATUS_META } from "../domain/participantStatus";
import type { ParticipantStatus } from "../types";

interface ParticipantStatusBadgeProps {
  status: ParticipantStatus;
}

export function ParticipantStatusBadge({ status }: ParticipantStatusBadgeProps) {
  const meta = PARTICIPANT_STATUS_META[status];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
