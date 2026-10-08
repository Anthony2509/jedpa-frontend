import { ACCESS_LABELS, IdentityFields, PARTICIPANT_TYPE_LABELS, SPECIAL_TYPES, type SpecialDraft } from "@/features/participants";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Modal } from "@/shared/ui/Modal";
import { Select } from "@/shared/ui/Select";
import { TextInput } from "@/shared/ui/TextInput";

interface SpecialFormModalProps {
  open: boolean;
  draft: SpecialDraft;
  error: string | null;
  onFieldChange: (key: keyof SpecialDraft, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const TYPE_OPTIONS = SPECIAL_TYPES.map((type) => ({ value: type, label: PARTICIPANT_TYPE_LABELS[type] }));
const ACCESS_OPTIONS = (["total", "partial"] as const).map((access) => ({ value: access, label: ACCESS_LABELS[access] }));

export function SpecialFormModal({ open, draft, error, onFieldChange, onSubmit, onClose }: SpecialFormModalProps) {
  return (
    <Modal
      open={open}
      title="Nueva credencial especial"
      description="No requiere documentos: queda lista para generar e imprimir."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit}>Crear credencial</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo de credencial" required>
          <Select value={draft.type} options={TYPE_OPTIONS} onChange={(v) => onFieldChange("type", v)} />
        </Field>
        <Field label="Acceso" required>
          <Select value={draft.access} options={ACCESS_OPTIONS} onChange={(v) => onFieldChange("access", v)} />
        </Field>
        <IdentityFields values={draft} onChange={onFieldChange} />
        <div className="sm:col-span-2">
          <Field label="Servicio / Institución" required>
            <TextInput value={draft.institution} onChange={(e) => onFieldChange("institution", e.target.value)} />
          </Field>
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-brand">{error}</p>}
    </Modal>
  );
}
