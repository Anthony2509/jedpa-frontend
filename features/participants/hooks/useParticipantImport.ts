"use client";

import { useState } from "react";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { confirmImport, previewImport, type ImportPreview, type ImportResult } from "../services/importApi";

/** Two steps: preview (nothing saved) and confirm with the same file. */
export function useParticipantImport() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function reset() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }

  async function run<T>(action: () => Promise<T>, onDone: (value: T) => void) {
    setBusy(true);
    setError(null);
    try {
      onDone(await action());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function selectFile(selected: File) {
    reset();
    setFile(selected);
    void run(() => previewImport(selected), setPreview);
  }

  const confirm = () => file && run(() => confirmImport(file), setResult);

  return {
    open, file, preview, result, error, busy,
    openImport: () => { reset(); setOpen(true); },
    close: () => setOpen(false),
    selectFile, confirm,
  };
}
