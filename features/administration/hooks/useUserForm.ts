"use client";

import { useState } from "react";
import type { User } from "@/features/auth";
import { saveUser } from "../services/usersApi";
import type { UserDraft } from "../types";

const EMPTY_DRAFT: UserDraft = { name: "", email: "", role: "operator", active: true };

export function useUserForm() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [draft, setDraft] = useState<UserDraft>(EMPTY_DRAFT);

  function openForm(user?: User) {
    setEditingId(user?.id);
    setDraft(user ? { name: user.name, email: user.email, role: user.role, active: user.active } : EMPTY_DRAFT);
    setOpen(true);
  }

  function setField<K extends keyof UserDraft>(key: K, value: UserDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    if (!draft.name.trim() || !draft.email.trim()) return;
    saveUser(draft, editingId);
    setOpen(false);
  }

  return { open, draft, isEditing: Boolean(editingId), openForm, setField, submit, close: () => setOpen(false) };
}
