"use client";

import { useState } from "react";
import { useDeliveryPlaces } from "@/features/administration";
import { useCurrentUser } from "@/features/auth";
import { deliverCredential, getLatestCopy, type Participant } from "@/features/participants";
import { formatDateTime, nowIso } from "@/shared/lib/formatDate";

interface DeliveryTarget {
  participant: Participant;
  copyNumber: number;
}

export function useDeliveryForm() {
  const places = useDeliveryPlaces().filter((place) => place.active);
  const user = useCurrentUser();
  const [target, setTarget] = useState<DeliveryTarget | null>(null);
  const [placeId, setPlaceId] = useState("");
  const [observation, setObservation] = useState("");
  const [openedAt, setOpenedAt] = useState("");

  /** Without a copy number, delivers the latest printed copy. */
  function open(participant: Participant, copyNumber = getLatestCopy(participant)?.number ?? 0) {
    setTarget({ participant, copyNumber });
    setPlaceId("");
    setObservation("");
    setOpenedAt(nowIso());
  }

  async function confirm() {
    const place = places.find((item) => item.id === placeId);
    if (!target || !place) return;
    await deliverCredential(target.participant.id, { copyNumber: target.copyNumber, place, observation: observation.trim() });
    setTarget(null);
  }

  return {
    target,
    placeId,
    observation,
    placeOptions: places.map((place) => ({ value: place.id, label: place.name })),
    userName: user.name,
    timestampLabel: openedAt ? `${formatDateTime(openedAt)} (se registra al confirmar)` : "",
    setPlaceId,
    setObservation,
    open,
    confirm,
    close: () => setTarget(null),
  };
}
