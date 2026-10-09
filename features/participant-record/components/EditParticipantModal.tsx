import { IdentityFields, PersonFields, type ParticipantEditDraft } from "@/features/participants";
import { Button } from "@/shared/ui/Button";
import { InlineError } from "@/shared/ui/InlineError";
import { Modal } from "@/shared/ui/Modal";
import { TextField } from "@/shared/ui/TextField";

interface EditParticipantModalProps {
  draft: ParticipantEditDraft;
  special: boolean;
  printed: boolean;
  error: string | null;
  submitting: boolean;
  onFieldChange: (key: keyof ParticipantEditDraft, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function EditParticipantModal({ draft, special, printed, error, submitting, onFieldChange, onSubmit, onClose }: EditParticipantModalProps) {
  return (
    <Modal
      open
      title="Editar datos"
      description={printed ? "La credencial ya está impresa: si cambias nombre o documento, imprime un duplicado." : "Los cambios quedan en el historial."}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit} disabled={submitting}>{submitting ? "Guardando…" : "Guardar"}</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <IdentityFields values={draft} onChange={onFieldChange} />
        <PersonFields values={draft} required={!special} onChange={onFieldChange} />
        {special ? (
          <div className="sm:col-span-2">
            <TextField label="Servicio / Institución" id="edit-institution" value={draft.institution} onChange={(v) => onFieldChange("institution", v)} />
          </div>
        ) : (
          <>
            <TextField label="Región" id="edit-region" value={draft.region} onChange={(v) => onFieldChange("region", v)} />
            <TextField label="Institución educativa" id="edit-school" value={draft.school} onChange={(v) => onFieldChange("school", v)} />
          </>
        )}
      </div>
      <InlineError message={error} className="mt-4" />
    </Modal>
  );
}
