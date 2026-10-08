"use client";

import { useState } from "react";
import { printDuplicate } from "@/features/participants";

export function useReprint(participantId: string, onDone: () => void) {
  const [reason, setReason] = useState("");

  async function confirm() {
    if (!reason.trim()) return;
    await printDuplicate(participantId, reason.trim());
    setReason("");
    onDone();
  }

  return { reason, setReason, confirm };
}
