"use client";

import type { Participant } from "@/features/participants";
import { EditParticipantModal } from "../components/EditParticipantModal";
import { useEditParticipant } from "../hooks/useEditParticipant";

interface EditParticipantDialogProps {
  participant: Participant;
  onClose: () => void;
}

/** Mounted only while open, so the form always starts from the current data. */
export function EditParticipantDialog({ participant, onClose }: EditParticipantDialogProps) {
  const edit = useEditParticipant(participant, onClose);
  return (
    <EditParticipantModal
      draft={edit.draft}
      special={edit.special}
      printed={Boolean(participant.credential)}
      error={edit.error}
      submitting={edit.submitting}
      onFieldChange={edit.setField}
      onSubmit={edit.submit}
      onClose={onClose}
    />
  );
}
