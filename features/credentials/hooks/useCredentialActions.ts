"use client";

import { useState } from "react";
import { issueCredential, printCredential, reprintSameCopy, type CredentialCopy, type Participant } from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { openBlob } from "@/shared/lib/openBlob";

/** Print actions of the record. With the API every print returns the PDF, opened for the printer. */
export function useCredentialActions(participant: Participant) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run(action: () => Promise<Blob | null | void>) {
    setBusy(true);
    setError(null);
    try {
      const pdf = await action();
      if (pdf) openBlob(pdf);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return {
    error,
    busy,
    issue: () => run(() => issueCredential(participant.id)),
    print: () => run(() => printCredential(participant.id)),
    /** Same copy again (paper jam): does not create a duplicate. */
    download: (copy: CredentialCopy) => run(() => reprintSameCopy(participant.id, copy.number)),
  };
}
