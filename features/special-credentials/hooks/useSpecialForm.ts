"use client";

import { useState } from "react";
import { createSpecialParticipant, validateSpecialDraft, type ParticipantTypeInfo, type SpecialDraft } from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { EMPTY_SPECIAL_DRAFT } from "../domain/specialDraft";

export function useSpecialForm(types: ParticipantTypeInfo[]) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<SpecialDraft>(EMPTY_SPECIAL_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const selectedType = types.find((info) => info.type === draft.type);

  function openForm() {
    setDraft(EMPTY_SPECIAL_DRAFT);
    setError(null);
    setOpen(true);
  }

  function setField(key: keyof SpecialDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }) as SpecialDraft);
  }

  async function submit() {
    const validationError = validateSpecialDraft(draft);
    if (validationError) return setError(validationError);
    if (!selectedType) return setError("No se pudo cargar el catálogo de tipos. Recarga la página.");
    setSubmitting(true);
    setError(null);
    try {
      await createSpecialParticipant(draft, selectedType.id);
      setOpen(false);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo crear la credencial."));
    } finally {
      setSubmitting(false);
    }
  }

  return { open, draft, selectedType, error, submitting, openForm, close: () => setOpen(false), setField, submit };
}
