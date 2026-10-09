"use client";

import { useState } from "react";

export type RecordDialog = "history" | "reprint" | "edit" | null;

export function useRecordDialogs() {
  const [dialog, setDialog] = useState<RecordDialog>(null);
  return {
    dialog,
    open: (next: Exclude<RecordDialog, null>) => setDialog(next),
    close: () => setDialog(null),
  };
}
