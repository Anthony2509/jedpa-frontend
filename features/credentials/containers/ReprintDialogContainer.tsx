"use client";

import { MAX_COPIES, getNextCopyLabel, type Participant } from "@/features/participants";
import { ReprintModal } from "../components/ReprintModal";
import { useReprint } from "../hooks/useReprint";

interface ReprintDialogContainerProps {
  participant: Participant;
  open: boolean;
  onClose: () => void;
}

export function ReprintDialogContainer({ participant, open, onClose }: ReprintDialogContainerProps) {
  const reprint = useReprint(participant.id, onClose);
  const printed = participant.credential?.copies.length ?? 0;
  return (
    <ReprintModal
      open={open}
      copyLabel={getNextCopyLabel(participant)}
      remaining={Math.max(0, MAX_COPIES - printed - 1)}
      reason={reprint.reason}
      onReasonChange={reprint.setReason}
      onConfirm={reprint.confirm}
      onClose={onClose}
    />
  );
}
