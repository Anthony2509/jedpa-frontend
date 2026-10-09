import type { UserDraft } from "../types";

/** Same rule as the API: 12 to 72 characters, at least one letter and one number. */
export const PASSWORD_HINT = "De 12 a 72 caracteres, con al menos una letra y un número.";

export function validatePassword(password: string): string | null {
  if (password.length < 12 || password.length > 72) return "La contraseña debe tener entre 12 y 72 caracteres.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return "La contraseña debe tener al menos una letra y un número.";
  return null;
}

/** Returns an error message or null. The password is required only to create. */
export function validateUserDraft(draft: UserDraft, isEditing: boolean): string | null {
  if (!draft.name.trim()) return "Ingresa el nombre completo.";
  if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) return "Ingresa un correo electrónico válido.";
  if (!isEditing && !draft.password) return "Ingresa una contraseña inicial.";
  return draft.password ? validatePassword(draft.password) : null;
}
