import { IdentityFields, PARTICIPANT_TYPE_LABELS, SPECIAL_TYPES, type SpecialDraft } from "@/features/participants";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { InlineError } from "@/shared/ui/InlineError";
import { Modal } from "@/shared/ui/Modal";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";


interface SpecialFormModalProps {
  open: boolean;
  draft: SpecialDraft;
  accessLabel: string;
  error: string | null;
  submitting: boolean;
  onFieldChange: (key: keyof SpecialDraft, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const TYPE_OPTIONS = SPECIAL_TYPES.map((type) => ({ value: type, label: PARTICIPANT_TYPE_LABELS[type] }));

export function SpecialFormModal({ open, draft, accessLabel, error, submitting, onFieldChange, onSubmit, onClose }: SpecialFormModalProps) {
  return (
    <Modal
      open={open}
      title="Nueva credencial especial"
      description="No requiere documentos: queda lista para generar e imprimir."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit} disabled={submitting}>{submitting ? "Creando…" : "Crear credencial"}</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo de credencial" required>
          <Select value={draft.type} options={TYPE_OPTIONS} onChange={(v) => onFieldChange("type", v)} />
        </Field>
        <Field label="Acceso" hint="Lo define el tipo de credencial.">
          <p className="flex h-10 items-center text-sm text-neutral-900">{accessLabel}</p>
        </Field>
        <IdentityFields values={draft} onChange={onFieldChange} />
        <div className="sm:col-span-2">
          <Field label="Servicio / Institución" htmlFor="special-institution" required>
            <TextInput id="special-institution" value={draft.institution} onChange={(e) => onFieldChange("institution", e.target.value)} />
          </Field>
        </div>
      </div>
      <InlineError message={error} className="mt-4" />
    </Modal>
  );
}
