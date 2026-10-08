"use client";

import { useState } from "react";
import { DEFAULT_ACCESS, createSpecialParticipant, validateSpecialDraft, type ParticipantType, type SpecialDraft } from "@/features/participants";
import { EMPTY_SPECIAL_DRAFT } from "../domain/specialDraft";

export function useSpecialForm() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<SpecialDraft>(EMPTY_SPECIAL_DRAFT);
  const [error, setError] = useState<string | null>(null);

  function openForm() {
    setDraft(EMPTY_SPECIAL_DRAFT);
    setError(null);
    setOpen(true);
  }

  /** Changing the type also suggests its default access level. */
  function setField(key: keyof SpecialDraft, value: string) {
    setDraft((current) => {
      const next = { ...current, [key]: value } as SpecialDraft;
      return key === "type" ? { ...next, access: DEFAULT_ACCESS[value as ParticipantType] } : next;
    });
  }

  async function submit() {
    const validationError = validateSpecialDraft(draft);
    if (validationError) return setError(validationError);
    try {
      await createSpecialParticipant(draft);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la credencial.");
    }
  }

  return { open, draft, error, openForm, close: () => setOpen(false), setField, submit };
}
