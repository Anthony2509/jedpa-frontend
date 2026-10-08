import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Modal } from "@/shared/ui/Modal";
import { Select, type SelectOption } from "@/shared/ui/Select";
import { TextArea } from "@/shared/ui/TextArea";

interface BulkDeliveryModalProps {
  open: boolean;
  count: number;
  delegationCode: string;
  placeOptions: SelectOption[];
  placeId: string;
  observation: string;
  onPlaceChange: (value: string) => void;
  onObservationChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function BulkDeliveryModal(props: BulkDeliveryModalProps) {
  return (
    <Modal
      open={props.open}
      title={`Entregar ${props.count} credenciales`}
      description={`Delegación ${props.delegationCode}. Se registra una entrega por persona, con fecha, hora y responsable automáticos.`}
      onClose={props.onClose}
      footer={
        <>
          <Button variant="secondary" onClick={props.onClose}>Cancelar</Button>
          <Button variant="brand" disabled={!props.placeId} onClick={props.onConfirm}>Registrar {props.count} entregas</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Lugar de entrega" required>
          <Select value={props.placeId} placeholder="Selecciona un lugar" options={props.placeOptions} onChange={props.onPlaceChange} />
        </Field>
        <Field label="Observación" hint="Ej.: recibido por el delegado de la delegación.">
          <TextArea value={props.observation} onChange={(e) => props.onObservationChange(e.target.value)} />
        </Field>
      </div>
    </Modal>
  );
}
