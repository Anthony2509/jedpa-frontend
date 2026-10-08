"use client";

import { useState } from "react";
import { useDeliveryPlaces } from "@/features/administration";
import { deliverCredential, getLatestCopy, getParticipantStatus, issueCredential, printCredential } from "@/features/participants";
import type { DelegationSummary } from "../domain/buildDelegations";

/** Group actions: the delegate usually receives the credentials of the whole delegation. */
export function useDelegationBulk(delegation: DelegationSummary | undefined) {
  const places = useDeliveryPlaces().filter((place) => place.active);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [observation, setObservation] = useState("");
  const members = delegation?.members ?? [];

  async function printReady() {
    for (const member of members) {
      const status = getParticipantStatus(member);
      if (status === "ready_to_print") await issueCredential(member.id);
      if (status === "ready_to_print" || status === "issued") await printCredential(member.id);
    }
  }

  async function deliverAll() {
    const place = places.find((item) => item.id === placeId);
    if (!place) return;
    for (const member of members.filter((m) => getParticipantStatus(m) === "printed")) {
      const copyNumber = getLatestCopy(member)?.number ?? 0;
      await deliverCredential(member.id, { copyNumber, place, observation: observation.trim() || "Entrega por delegación" });
    }
    setDeliveryOpen(false);
  }

  function openDelivery() {
    setPlaceId("");
    setObservation("");
    setDeliveryOpen(true);
  }

  return {
    placeOptions: places.map((place) => ({ value: place.id, label: place.name })),
    deliveryOpen,
    placeId,
    observation,
    setPlaceId,
    setObservation,
    openDelivery,
    closeDelivery: () => setDeliveryOpen(false),
    printReady,
    deliverAll,
  };
}
