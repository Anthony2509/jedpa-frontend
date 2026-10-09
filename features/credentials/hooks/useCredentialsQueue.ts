"use client";

import { useState } from "react";
import {
  downloadCopiesPdf, downloadTestSheet, printCredential, registerOriginals, useParticipantsByStatus, useWorkQueueParticipants, type Participant,
} from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { openBlob } from "@/shared/lib/openBlob";
import { PRINT_BATCH_SIZE } from "../domain/credentialsViews";
import type { CredentialsView } from "../types";

export function useCredentialsQueue() {
  const [view, setView] = useState<CredentialsView>("print");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const toPrint = useWorkQueueParticipants("credentials");
  const printed = useParticipantsByStatus(["printed", "delivered"]);

  async function run(action: () => Promise<Blob | null>) {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const pdf = await action();
      if (pdf) openBlob(pdf);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  /** Registers the originals (up to 100) and opens a single PDF with all of them. */
  async function printBatch(): Promise<Blob | null> {
    const ids = (toPrint.data?.participants ?? []).slice(0, PRINT_BATCH_SIZE).map((p) => p.id);
    const result = await registerOriginals(ids);
    if (result.skipped.length > 0) setNotice(`${result.skipped.length} no se imprimieron: ${result.skipped[0].reason}`);
    return result.issued.length > 0 ? downloadCopiesPdf(result.issued.map((item) => item.copyId)) : null;
  }

  return {
    view, setView, error, notice, busy,
    toPrint: toPrint.data?.participants,
    toPrintError: toPrint.error,
    printed: printed.data?.participants,
    printedError: printed.error,
    print: (p: Participant) => run(() => printCredential(p.id)),
    printAll: () => run(printBatch),
    testSheet: () => run(downloadTestSheet),
  };
}
