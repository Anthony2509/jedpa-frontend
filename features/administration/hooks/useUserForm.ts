"use client";

import { useState } from "react";
import type { User } from "@/features/auth";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { validateUserDraft } from "../domain/validateUserDraft";
import { saveUser } from "../services/usersApi";
import type { RoleOption, UserDraft } from "../types";

const EMPTY_DRAFT: UserDraft = { name: "", email: "", role: "operator", password: "" };

export function useUserForm(roles: RoleOption[]) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | undefined>();
  const [draft, setDraft] = useState<UserDraft>(EMPTY_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function openForm(user?: User) {
    setEditing(user);
    setDraft(user ? { name: user.name, email: user.email, role: user.role, password: "" } : EMPTY_DRAFT);
    setError(null);
    setOpen(true);
  }

  function setField<K extends keyof UserDraft>(key: K, value: UserDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit() {
    const validationError = validateUserDraft(draft, Boolean(editing));
    if (validationError) return setError(validationError);
    const roleId = roles.find((option) => option.role === draft.role)?.id;
    if (!roleId) return setError("No se pudieron cargar los roles. Recarga la página.");
    setSubmitting(true);
    setError(null);
    try {
      await saveUser(draft, roleId, editing);
      setOpen(false);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo guardar el usuario."));
    } finally {
      setSubmitting(false);
    }
  }

  return { open, draft, error, submitting, isEditing: Boolean(editing), openForm, setField, submit, close: () => setOpen(false) };
}
