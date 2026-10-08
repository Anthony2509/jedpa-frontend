import { Button } from "@/shared/ui/Button";
import { DefinitionList } from "@/shared/ui/DefinitionList";
import { Field } from "@/shared/ui/Field";
import { Modal } from "@/shared/ui/Modal";
import { Select, type SelectOption } from "@/shared/ui/Select";
import { TextArea } from "@/shared/ui/TextArea";

interface DeliveryModalProps {
  open: boolean;
  participantName: string;
  placeOptions: SelectOption[];
  placeId: string;
  observation: string;
  userName: string;
  timestampLabel: string;
  onPlaceChange: (value: string) => void;
  onObservationChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeliveryModal(props: DeliveryModalProps) {
  return (
    <Modal
      open={props.open}
      title="Confirmar entrega de credencial"
      description={props.participantName}
      onClose={props.onClose}
      footer={
        <>
          <Button variant="secondary" onClick={props.onClose}>Cancelar</Button>
          <Button variant="brand" disabled={!props.placeId} onClick={props.onConfirm}>Credencial entregada</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Lugar de entrega" required>
          <Select value={props.placeId} placeholder="Selecciona un lugar" options={props.placeOptions} onChange={props.onPlaceChange} />
        </Field>
        <Field label="Observación o comentario">
          <TextArea value={props.observation} onChange={(event) => props.onObservationChange(event.target.value)} />
        </Field>
        <div className="rounded-md bg-neutral-50 p-4">
          <DefinitionList
            items={[
              { label: "Fecha y hora (automática)", value: props.timestampLabel },
              { label: "Responsable (automático)", value: props.userName },
            ]}
          />
        </div>
      </div>
    </Modal>
  );
}
