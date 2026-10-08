"use client";

import { getCopyLabel, getFullName, getIdentityLabel } from "@/features/participants";
import { DeliveryModal } from "../components/DeliveryModal";
import type { useDeliveryForm } from "../hooks/useDeliveryForm";

interface ConnectedDeliveryModalProps {
  form: ReturnType<typeof useDeliveryForm>;
}

export function ConnectedDeliveryModal({ form }: ConnectedDeliveryModalProps) {
  return (
    <DeliveryModal
      open={form.target !== null}
      participantName={form.target ? `${getCopyLabel({ number: form.target.copyNumber })} · ${getFullName(form.target.participant)} · ${getIdentityLabel(form.target.participant)}` : ""}
      placeOptions={form.placeOptions}
      placeId={form.placeId}
      observation={form.observation}
      userName={form.userName}
      timestampLabel={form.timestampLabel}
      onPlaceChange={form.setPlaceId}
      onObservationChange={form.setObservation}
      onConfirm={form.confirm}
      onClose={form.close}
    />
  );
}
