"use client";

import { useState } from "react";
import {
  approveDocument,
  confirmInResolution,
  observeDocument,
  uploadDocument,
  type DocumentType,
} from "@/features/participants";

export function useDocumentReview(participantId: string) {
  const [observing, setObserving] = useState<DocumentType | null>(null);
  const [observation, setObservation] = useState("");
  const [previewing, setPreviewing] = useState<DocumentType | null>(null);

  function startObserve(type: DocumentType) {
    setObservation("");
    setObserving(type);
  }

  async function confirmObserve() {
    if (!observing || !observation.trim()) return;
    await observeDocument(participantId, observing, observation.trim());
    setObserving(null);
  }

  return {
    observing,
    observation,
    previewing,
    setObservation,
    startObserve,
    confirmObserve,
    cancelObserve: () => setObserving(null),
    openPreview: setPreviewing,
    closePreview: () => setPreviewing(null),
    approve: (type: DocumentType) => approveDocument(participantId, type),
    upload: (type: DocumentType, fileName: string) => uploadDocument(participantId, type, fileName),
    confirmResolution: (fileName: string) => confirmInResolution(participantId, fileName),
  };
}
