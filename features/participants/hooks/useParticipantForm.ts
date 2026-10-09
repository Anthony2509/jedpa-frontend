"use client";

import { useState } from "react";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { buildDelegationCode } from "../domain/macros";
import { EMPTY_PARTICIPANT_DRAFT, validateParticipantDraft } from "../domain/validateParticipantDraft";
import { createMember } from "../services/membersApi";
import type { Gender, MacroId, Participant, ParticipantDraft } from "../types";
import { useMacroRegions, useSports } from "./useCatalogs";
import { useParticipantTypes } from "./useParticipantTypes";

interface Options {
  /** ADMIN and COORDINADOR may create a missing delegation; an operator only picks existing ones. */
  canCreateDelegation: boolean;
  onCreated: (participant: Participant) => void;
}

export function useParticipantForm({ canCreateDelegation, onCreated }: Options) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ParticipantDraft>(EMPTY_PARTICIPANT_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const types = useParticipantTypes().data ?? [];
  const macros = useMacroRegions();
  const sports = useSports();

  const macro = macros.find((m) => m.id === draft.macroRegionId);
  const sport = sports.find((s) => s.id === draft.sportId);
  const delegationCode =
    macro && sport && draft.category && draft.gender
      ? buildDelegationCode({ macro: macro.code as MacroId, sportCode: sport.code, category: draft.category, gender: draft.gender as Gender })
      : null;

  function openForm() {
    setDraft(EMPTY_PARTICIPANT_DRAFT);
    setError(null);
    setOpen(true);
  }

  function setField(key: keyof ParticipantDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }) as ParticipantDraft);
  }

  async function submit() {
    const validationError = validateParticipantDraft(draft);
    if (validationError) return setError(validationError);
    const typeId = types.find((info) => info.type === draft.type)?.id;
    if (!typeId) return setError("No se pudo cargar el catálogo de tipos. Recarga la página.");
    setSubmitting(true);
    setError(null);
    try {
      const participant = await createMember(draft, typeId, canCreateDelegation);
      setOpen(false);
      onCreated(participant);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo registrar."));
    } finally {
      setSubmitting(false);
    }
  }

  return {
    open, draft, error, submitting, delegationCode,
    macroOptions: macros.map((m) => ({ value: m.id, label: m.name })),
    sportOptions: sports.map((s) => ({ value: s.id, label: s.name })),
    openForm, close: () => setOpen(false), setField, submit,
  };
}
