"use client";

import { useState } from "react";
import { isSpecialType, updateParticipantData, validateEditDraft, type Participant, type ParticipantEditDraft } from "@/features/participants";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { buildEditDraft } from "../domain/editDraft";

export function useEditParticipant(participant: Participant, onDone: () => void) {
  const special = isSpecialType(participant.type);
  const [draft, setDraft] = useState<ParticipantEditDraft>(() => buildEditDraft(participant));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function setField(key: keyof ParticipantEditDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }) as ParticipantEditDraft);
  }

  async function submit() {
    const validationError = validateEditDraft(draft, special);
    if (validationError) return setError(validationError);
    setSubmitting(true);
    setError(null);
    try {
      await updateParticipantData(participant, draft, special);
      onDone();
    } catch (err) {
      setError(getErrorMessage(err, "No se pudieron guardar los cambios."));
    } finally {
      setSubmitting(false);
    }
  }

  return { draft, special, error, submitting, setField, submit };
}
