"use client";

import { useState } from "react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { AddPlaceForm } from "../components/AddPlaceForm";
import { DeliveryPlacesTable } from "../components/DeliveryPlacesTable";
import { useDeliveryPlaces } from "../hooks/useDeliveryPlaces";
import { addDeliveryPlace, toggleDeliveryPlace } from "../services/deliveryPlacesApi";

export function DeliveryPlacesContainer() {
  const places = useDeliveryPlaces();
  const [newName, setNewName] = useState("");

  function handleAdd() {
    if (!newName.trim()) return;
    addDeliveryPlace(newName);
    setNewName("");
  }

  return (
    <>
      <PageHeader
        title="Lugares de entrega"
        description="Catálogo configurable. Los lugares inactivos no aparecen al registrar una entrega."
      />
      <AddPlaceForm value={newName} onChange={setNewName} onSubmit={handleAdd} />
      <DeliveryPlacesTable places={places} onToggleActive={(place) => toggleDeliveryPlace(place.id)} />
    </>
  );
}
