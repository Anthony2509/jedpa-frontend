import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Modal } from "@/shared/ui/Modal";
import { TextArea } from "@/shared/ui/TextArea";

interface ReprintModalProps {
  open: boolean;
  copyLabel: string;
  remaining: number;
  reason: string;
  onReasonChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function ReprintModal({ open, copyLabel, remaining, reason, onReasonChange, onConfirm, onClose }: ReprintModalProps) {
  return (
    <Modal
      open={open}
      title={`Imprimir ${copyLabel.toLowerCase()}`}
      description={`Después de este quedarán ${remaining} duplicado(s) disponibles. El motivo queda registrado.`}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="brand" disabled={!reason.trim()} onClick={onConfirm}>Imprimir {copyLabel.toLowerCase()}</Button>
        </>
      }
    >
      <Field label="Motivo" required>
        <TextArea value={reason} placeholder="Ej.: credencial extraviada" onChange={(e) => onReasonChange(e.target.value)} />
      </Field>
    </Modal>
  );
}
