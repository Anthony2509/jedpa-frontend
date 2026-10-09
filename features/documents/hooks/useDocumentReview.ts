"use client";

import { useState } from "react";
import {
  approveDocument, confirmInResolution, fetchDocumentFileLink, isMockParticipantId, observeDocument, uploadDocument,
  type DocumentType, type FileLink, type Participant,
} from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";

export function useDocumentReview(participant: Participant) {
  const [observing, setObserving] = useState<DocumentType | null>(null);
  const [observation, setObservation] = useState("");
  const [previewing, setPreviewing] = useState<DocumentType | null>(null);
  const [link, setLink] = useState<FileLink | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /** Every action reports its own error (permissions, file type, size) next to the documents. */
  async function run(action: () => Promise<void>): Promise<boolean> {
    setBusy(true);
    setError(null);
    try {
      await action();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setBusy(false);
    }
  }

  function startObserve(type: DocumentType) {
    setObservation("");
    setObserving(type);
  }

  async function confirmObserve() {
    if (!observing || !observation.trim()) return;
    if (await run(() => observeDocument(participant.id, observing, observation.trim()))) setObserving(null);
  }

  /** API files open through a short-lived signed link; mock files only show a placeholder. */
  async function openPreview(type: DocumentType) {
    setLink(null);
    if (!isMockParticipantId(participant.id)) {
      const ok = await run(async () => setLink(await fetchDocumentFileLink(participant.id, type)));
      if (!ok) return;
    }
    setPreviewing(type);
  }

  return {
    observing, observation, previewing, link, error, busy,
    setObservation, startObserve, confirmObserve, openPreview,
    cancelObserve: () => setObserving(null),
    closePreview: () => setPreviewing(null),
    approve: (type: DocumentType) => run(() => approveDocument(participant.id, type)),
    upload: (type: DocumentType, file: File) => run(() => uploadDocument(participant.id, type, file)),
    confirmResolution: (fileName: string) => run(() => confirmInResolution(participant, fileName)),
  };
}
