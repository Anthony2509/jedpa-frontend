import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Modal } from "@/shared/ui/Modal";
import { TextArea } from "@/shared/ui/TextArea";

interface ObserveDocumentModalProps {
  open: boolean;
  documentLabel: string;
  observation: string;
  onObservationChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function ObserveDocumentModal(props: ObserveDocumentModalProps) {
  return (
    <Modal
      open={props.open}
      title={`Observar ${props.documentLabel}`}
      description="El participante quedará con estado «Observada» hasta que se corrija."
      onClose={props.onClose}
      footer={
        <>
          <Button variant="secondary" onClick={props.onClose}>Cancelar</Button>
          <Button variant="brand" disabled={!props.observation.trim()} onClick={props.onConfirm}>
            Registrar observación
          </Button>
        </>
      }
    >
      <Field label="Motivo de la observación" required>
        <TextArea
          value={props.observation}
          placeholder="Ej.: el certificado médico está vencido."
          onChange={(event) => props.onObservationChange(event.target.value)}
        />
      </Field>
    </Modal>
  );
}
