"use client";

import { useState } from "react";
import { EMPTY_PARTICIPANT_DRAFT, validateParticipantDraft } from "../domain/validateParticipantDraft";
import { findSportCode } from "../domain/sports";
import { createParticipant } from "../services/registrationApi";
import type { Participant, ParticipantDraft } from "../types";

export function useParticipantForm(onCreated: (participant: Participant) => void) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ParticipantDraft>(EMPTY_PARTICIPANT_DRAFT);
  const [error, setError] = useState<string | null>(null);

  function openForm() {
    setDraft(EMPTY_PARTICIPANT_DRAFT);
    setError(null);
    setOpen(true);
  }

  function setField(key: keyof ParticipantDraft, value: string) {
    setDraft((current) => {
      const next = { ...current, [key]: value } as ParticipantDraft;
      return key === "sport" ? { ...next, sportCode: findSportCode(value) } : next;
    });
  }

  async function submit() {
    const validationError = validateParticipantDraft(draft);
    if (validationError) return setError(validationError);
    try {
      const participant = await createParticipant(draft);
      setOpen(false);
      onCreated(participant);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar.");
    }
  }

  return { open, draft, error, openForm, close: () => setOpen(false), setField, submit };
}
