import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { InlineError } from "@/shared/ui/InlineError";
import { Modal } from "@/shared/ui/Modal";
import { Select, type SelectOption } from "@/shared/ui/Select";
import { DELEGATION_TYPES, PARTICIPANT_TYPE_LABELS } from "../domain/participantTypes";
import type { ParticipantDraft } from "../types";
import { DelegationFields } from "./DelegationFields";
import { IdentityFields } from "./IdentityFields";
import { PersonFields } from "./PersonFields";

interface ParticipantFormModalProps {
  open: boolean;
  draft: ParticipantDraft;
  error: string | null;
  submitting: boolean;
  macroOptions: SelectOption[];
  sportOptions: SelectOption[];
  delegationCode: string | null;
  onFieldChange: (key: keyof ParticipantDraft, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const TYPE_OPTIONS = DELEGATION_TYPES.map((type) => ({ value: type, label: PARTICIPANT_TYPE_LABELS[type] }));

export function ParticipantFormModal(props: ParticipantFormModalProps) {
  const { draft, onFieldChange } = props;
  return (
    <Modal
      open={props.open}
      title="Nuevo integrante de delegación"
      description="Deportistas, entrenadores, delegados y acompañantes. Las credenciales especiales se crean en su propia sección."
      onClose={props.onClose}
      footer={
        <>
          <Button variant="secondary" onClick={props.onClose}>Cancelar</Button>
          <Button onClick={props.onSubmit} disabled={props.submitting}>{props.submitting ? "Registrando…" : "Registrar"}</Button>
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
        <PersonFields values={draft} required onChange={onFieldChange} />
        <DelegationFields
          draft={draft}
          macroOptions={props.macroOptions}
          sportOptions={props.sportOptions}
          delegationCode={props.delegationCode}
          onChange={onFieldChange}
        />
      </div>
      <InlineError message={props.error} className="mt-4" />
    </Modal>
  );
}
