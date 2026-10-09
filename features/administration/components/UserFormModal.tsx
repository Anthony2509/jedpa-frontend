import { ROLES, ROLE_META, type Role } from "@/features/auth";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { InlineError } from "@/shared/ui/InlineError";
import { Modal } from "@/shared/ui/Modal";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";
import { PASSWORD_HINT } from "../domain/validateUserDraft";
import type { UserDraft } from "../types";

interface UserFormModalProps {
  open: boolean;
  isEditing: boolean;
  draft: UserDraft;
  error: string | null;
  submitting: boolean;
  onFieldChange: <K extends keyof UserDraft>(key: K, value: UserDraft[K]) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const ROLE_OPTIONS = ROLES.map((role) => ({ value: role, label: ROLE_META[role].label }));

export function UserFormModal({ open, isEditing, draft, error, submitting, onFieldChange, onSubmit, onClose }: UserFormModalProps) {
  return (
    <Modal
      open={open}
      title={isEditing ? "Editar usuario" : "Nuevo usuario"}
      description="Cada persona debe tener su propia cuenta para que la auditoría sea válida."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit} disabled={submitting}>{submitting ? "Guardando…" : "Guardar"}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Nombre completo" htmlFor="user-name" required>
          <TextInput id="user-name" value={draft.name} onChange={(e) => onFieldChange("name", e.target.value)} />
        </Field>
        <Field label="Correo electrónico" htmlFor="user-email" required>
          <TextInput id="user-email" type="email" value={draft.email} onChange={(e) => onFieldChange("email", e.target.value)} />
        </Field>
        <Field label="Rol" required hint={ROLE_META[draft.role].description}>
          <Select value={draft.role} options={ROLE_OPTIONS} onChange={(v) => onFieldChange("role", v as Role)} />
        </Field>
        <Field
          label={isEditing ? "Nueva contraseña" : "Contraseña inicial"}
          htmlFor="user-password"
          required={!isEditing}
          hint={isEditing ? `Déjala vacía para no cambiarla. ${PASSWORD_HINT}` : PASSWORD_HINT}
        >
          <TextInput
            id="user-password"
            type="password"
            autoComplete="new-password"
            value={draft.password}
            onChange={(e) => onFieldChange("password", e.target.value)}
          />
        </Field>
        <InlineError message={error} />
      </div>
    </Modal>
  );
}
