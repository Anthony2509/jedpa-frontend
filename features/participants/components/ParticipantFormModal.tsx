import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Modal } from "@/shared/ui/Modal";
import { Select } from "@/shared/ui/Select";
import { DELEGATION_TYPES, PARTICIPANT_TYPE_LABELS } from "../domain/participantTypes";
import type { ParticipantDraft } from "../types";
import { DelegationFields } from "./DelegationFields";
import { IdentityFields } from "./IdentityFields";

interface ParticipantFormModalProps {
  open: boolean;
  draft: ParticipantDraft;
  error: string | null;
  onFieldChange: (key: keyof ParticipantDraft, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const TYPE_OPTIONS = DELEGATION_TYPES.map((type) => ({ value: type, label: PARTICIPANT_TYPE_LABELS[type] }));

export function ParticipantFormModal({ open, draft, error, onFieldChange, onSubmit, onClose }: ParticipantFormModalProps) {
  return (
    <Modal
      open={open}
      title="Nuevo integrante de delegación"
      description="Deportistas, entrenadores, delegados y acompañantes. Las credenciales especiales se crean en su propia sección."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit}>Registrar</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Tipo de participante" required>
            <Select value={draft.type} options={TYPE_OPTIONS} onChange={(v) => onFieldChange("type", v)} />
          </Field>
        </div>
        <IdentityFields values={draft} onChange={onFieldChange} />
        <DelegationFields draft={draft} onChange={onFieldChange} />
      </div>
      {error && <p className="mt-4 text-sm text-brand">{error}</p>}
    </Modal>
  );
}
