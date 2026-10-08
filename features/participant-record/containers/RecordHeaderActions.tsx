"use client";

import { History } from "lucide-react";
import { convertToCompanion, type Participant } from "@/features/participants";
import { ActionMenu } from "@/shared/ui/ActionMenu";
import { Button } from "@/shared/ui/Button";
import { buildRecordActions } from "../domain/recordActions";
import type { RecordDialog } from "../hooks/useRecordDialogs";

interface RecordHeaderActionsProps {
  participant: Participant;
  onOpenDialog: (dialog: Exclude<RecordDialog, null>) => void;
}

export function RecordHeaderActions({ participant, onOpenDialog }: RecordHeaderActionsProps) {
  return (
    <>
      <Button variant="ghost" className="xl:hidden" icon={<History className="size-4" />} onClick={() => onOpenDialog("history")}>
        Historial
      </Button>
      <ActionMenu
        label="Más acciones"
        items={buildRecordActions(participant)}
        onSelect={(id) => (id === "duplicate" ? onOpenDialog("reprint") : id === "companion" && convertToCompanion(participant.id))}
      />
    </>
  );
}
