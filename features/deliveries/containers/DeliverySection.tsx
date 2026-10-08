"use client";

import type { Participant } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { CopyDeliveryList } from "../components/CopyDeliveryList";
import { useDeliveryForm } from "../hooks/useDeliveryForm";
import { ConnectedDeliveryModal } from "./ConnectedDeliveryModal";

interface DeliverySectionProps {
  participant: Participant;
}

export function DeliverySection({ participant }: DeliverySectionProps) {
  const form = useDeliveryForm();
  return (
    <>
      <CopyDeliveryList
        copies={participant.credential?.copies ?? []}
        formatDate={formatDateTime}
        onDeliver={(copy) => form.open(participant, copy.number)}
      />
      <p className="mt-4 text-xs text-neutral-500">La fecha, la hora y el responsable se guardan automáticamente al confirmar.</p>
      <ConnectedDeliveryModal form={form} />
    </>
  );
}
