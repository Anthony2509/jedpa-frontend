"use client";

import { ParticipantHistoryContainer } from "@/features/audit";
import { ReprintDialogContainer } from "@/features/credentials";
import type { Participant } from "@/features/participants";
import { Modal } from "@/shared/ui/Modal";
import type { RecordDialog } from "../hooks/useRecordDialogs";
import { EditParticipantDialog } from "./EditParticipantDialog";

interface RecordDialogsProps {
  participant: Participant;
  dialog: RecordDialog;
  onClose: () => void;
}

export function RecordDialogs({ participant, dialog, onClose }: RecordDialogsProps) {
  return (
    <>
      <Modal open={dialog === "history"} title="Historial de cambios" description="Registro de auditoría de este participante" onClose={onClose}>
        <ParticipantHistoryContainer participantId={participant.id} />
      </Modal>
      <ReprintDialogContainer participant={participant} open={dialog === "reprint"} onClose={onClose} />
      {dialog === "edit" && <EditParticipantDialog participant={participant} onClose={onClose} />}
    </>
  );
}
