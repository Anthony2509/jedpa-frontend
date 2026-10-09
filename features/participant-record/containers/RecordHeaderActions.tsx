"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { convertToCompanion, type Participant } from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { ActionMenu } from "@/shared/ui/ActionMenu";
import { Button } from "@/shared/ui/Button";
import { InlineError } from "@/shared/ui/InlineError";
import { buildRecordActions } from "../domain/recordActions";
import type { RecordDialog } from "../hooks/useRecordDialogs";

interface RecordHeaderActionsProps {
  participant: Participant;
  showHistory: boolean;
  onOpenDialog: (dialog: Exclude<RecordDialog, null>) => void;
}

export function RecordHeaderActions({ participant, showHistory, onOpenDialog }: RecordHeaderActionsProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(id: string) {
    setError(null);
    if (id === "duplicate") return onOpenDialog("reprint");
    if (id !== "companion") return;
    try {
      await convertToCompanion(participant.id);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo cambiar el tipo."));
    }
  }

  return (
    <>
      {showHistory && (
        <Button variant="ghost" className="xl:hidden" icon={<History className="size-4" />} onClick={() => onOpenDialog("history")}>
          Historial
        </Button>
      )}
      <ActionMenu label="Más acciones" items={buildRecordActions(participant)} onSelect={handleSelect} />
      <InlineError message={error} className="w-full sm:text-right" />
    </>
  );
}
