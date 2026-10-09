import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { InlineError } from "@/shared/ui/InlineError";
import { Modal } from "@/shared/ui/Modal";
import { TextArea } from "@/shared/ui/TextArea";

interface ReprintModalProps {
  open: boolean;
  copyLabel: string;
  remaining: number;
  reason: string;
  /** API: the previous copy's QR stops validating. */
  revokesPreviousQr: boolean;
  error: string | null;
  busy: boolean;
  onReasonChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function ReprintModal(props: ReprintModalProps) {
  const { open, copyLabel, remaining, reason, onReasonChange, onConfirm, onClose } = props;
  const note = props.revokesPreviousQr ? " El QR de la copia anterior deja de ser válido." : "";
  return (
    <Modal
      open={open}
      title={`Imprimir ${copyLabel.toLowerCase()}`}
      description={`Después de este quedarán ${remaining} duplicado(s) disponibles. El motivo queda registrado.${note}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="brand" disabled={!reason.trim() || props.busy} onClick={onConfirm}>Imprimir {copyLabel.toLowerCase()}</Button>
        </>
      }
    >
      <Field label="Motivo" required>
        <TextArea value={reason} placeholder="Ej.: credencial extraviada" onChange={(e) => onReasonChange(e.target.value)} />
      </Field>
      <InlineError message={props.error} className="mt-3" />
    </Modal>
  );
}
