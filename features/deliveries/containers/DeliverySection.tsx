"use client";

import { isMockParticipantId, type Participant } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { CopyDeliveryList } from "../components/CopyDeliveryList";
import { useDeliveryForm } from "../hooks/useDeliveryForm";
import { ConnectedDeliveryModal } from "./ConnectedDeliveryModal";

interface DeliverySectionProps {
  participant: Participant;
}

export function DeliverySection({ participant }: DeliverySectionProps) {
  const form = useDeliveryForm();
  // TEMP(backend): the API has no deliveries module yet; only the mock flow can register them.
  const canDeliver = isMockParticipantId(participant.id);
  return (
    <>
      <CopyDeliveryList
        copies={participant.credential?.copies ?? []}
        formatDate={formatDateTime}
        canDeliver={canDeliver}
        onDeliver={(copy) => form.open(participant, copy.number)}
      />
      <p className="mt-4 text-xs text-neutral-500">
        {canDeliver
          ? "La fecha, la hora y el responsable se guardan automáticamente al confirmar."
          : "El registro de entregas estará disponible cuando el backend tenga ese módulo."}
      </p>
      <ConnectedDeliveryModal form={form} />
    </>
  );
}
