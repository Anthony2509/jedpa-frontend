"use client";

import { useState } from "react";
import { printDuplicate, type Participant } from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { openBlob } from "@/shared/lib/openBlob";

export function useReprint(participant: Participant, onDone: () => void) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function confirm() {
    if (!reason.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const pdf = await printDuplicate(participant, reason.trim());
      if (pdf) openBlob(pdf);
      setReason("");
      onDone();
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo imprimir el duplicado."));
    } finally {
      setBusy(false);
    }
  }

  return { reason, setReason, error, busy, confirm };
}
